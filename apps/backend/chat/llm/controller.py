from langchain_community.llms import Ollama
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.runnables import RunnablePassthrough 
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import (
    MongoDBChatMessageHistory
)
from decouple import config
CHROMA_DB_DIRECTORY = config("CHROMA_DB_DIRECTORY", cast=str)
MONGO_DB = config("MONGO_DB", cast=str)
MONGO_COLLECTION = config("MONGO_COLLECTION", cast=str)

class GenerateLlamaResponse:
    def __init__(self, chat_id):
        self.llm = Ollama(
            base_url="http://ollama:11434", 
            # base_url="http://localhost:11434", 
            model="llama2",
        ) 
        self.embedding_function = OllamaEmbeddings(model="llama2")    
        self.db = Chroma(
            embedding_function=self.embedding_function, 
            persist_directory=CHROMA_DB_DIRECTORY,
            collection_name="nutrition",
        ) 
        self.chat_id = chat_id
        self.chat_message_history = MongoDBChatMessageHistory(
            session_id=self.chat_id,
            connection_string="mongodb://localhost:27017",
            database_name=MONGO_DB,
            collection_name=MONGO_COLLECTION,
        )

    
    async def chat_with_memory(self, user_query):  
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are a helpful assistant. Answer all questions to the best of your ability. The provided chat history includes facts about the user you are speaking with.",
                ),
                MessagesPlaceholder(variable_name="chat_history"),
                ("user", "{input}"),
            ]
        )

        chain = prompt | self.llm

        chain_with_message_history  = RunnableWithMessageHistory(
            chain,
            lambda session_id: self.chat_message_history,
            input_messages_key="input",
            history_messages_key="chat_history",        
        )

        chain_with_summarization = (
            RunnablePassthrough.assign(messages_summarized=self.summarize_messages)
            | chain_with_message_history 
        )

        async for chunk in chain_with_summarization.astream(
            {"input": user_query},
            config={
                "configurable": {"session_id": self.chat_id}
            },
        ): 
                print(chunk) 
                yield chunk
    
    async def rag_with_memory(self, user_query):
        retriever = self.db.as_retriever(
            search_type = "similarity",
            search_kwargs={"k":1}
        )

        contextualize_q_system_prompt = """Given a chat history and the latest user question \
            which might reference context in the chat history, formulate a standalone question \
            which can be understood without the chat history. Do NOT answer the question, \
            just reformulate it if needed and otherwise return it as is."""
    
        contextualize_q_prompt = ChatPromptTemplate.from_messages(
            [
                ("system", contextualize_q_system_prompt),
                MessagesPlaceholder("chat_history"),
                ("human", "{input}"),
            ]
        )

        history_aware_retriever = create_history_aware_retriever(
            self.llm, retriever, contextualize_q_prompt
        )

        qa_system_prompt = """You are an assistant for question-answering tasks. \
        Use the following pieces of retrieved context to answer the question. \
        If you don't know the answer, just say that you don't know. \
        Use three sentences maximum and keep the answer concise.\

        {context}"""
        qa_prompt = ChatPromptTemplate.from_messages(
            [
                ("system", qa_system_prompt),
                MessagesPlaceholder("chat_history"),
                ("human", "{input}"),
            ]
        )

        question_answer_chain = create_stuff_documents_chain(self.llm, qa_prompt)

        rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

        conversational_rag_chain = RunnableWithMessageHistory(
            rag_chain,
            lambda session_id: self.chat_message_history,
            input_messages_key="input",
            history_messages_key="chat_history",
            output_messages_key="answer",
        )

        chain_with_summarization = (
            RunnablePassthrough.assign(messages_summarized=self.summarize_messages)
            | conversational_rag_chain
        )

        async for chunk in chain_with_summarization.astream(
            {"input": user_query},
            config={
                "configurable": {"session_id": self.chat_id}
            },
        ): 
                print(chunk)        
                if 'answer' in chunk:
                    yield chunk['answer']          
        
    def summarize_messages(self, chain_input): 
        stored_messages = self.chat_message_history.messages
        print("Stored Messages:", stored_messages)

        if len(stored_messages) == 0:
            return False

        summarization_prompt = ChatPromptTemplate.from_messages(
            [
                MessagesPlaceholder(variable_name="chat_history"),
                (
                    "user",
                    "Distill the above chat messages into a single summary message. Include necessary details.",
                ),
            ]
        )

        summarization_chain = summarization_prompt | self.llm

        summary_message = summarization_chain.invoke({"chat_history": stored_messages})       

        self.chat_message_history.clear()

        self.chat_message_history.add_ai_message(summary_message)
        print("Summary:", self.chat_message_history.messages)

        return True    
    
    def trim_messages(self, chain_input):    
        stored_messages = self.chat_message_history.messages

        if len(stored_messages) <= 2:
            return False

        self.chat_message_history.clear()

        for message in stored_messages[-2:]:
            self.chat_message_history.add_message(message)

        return True