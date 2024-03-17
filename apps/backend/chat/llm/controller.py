from langchain_community.llms import Ollama
from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate

async def get_llm_response(user_query):
    llm = Ollama(
        base_url="http://ollama:11434", 
        model="llama2"
    )

    system_message_prompt = SystemMessagePromptTemplate.from_template(
        "Act as an intelligent assistant, providing helpful responses to user inquiries. If you're unsure about, politely indicate that you don't have the information and offer to assist with something else. Let's ensure a friendly and informative interaction!"
    )

    human_message_prompt = HumanMessagePromptTemplate.from_template(
        "{question}"
    )

    chat_template = ChatPromptTemplate.from_messages([
        system_message_prompt,
        human_message_prompt
    ])

    chain = chat_template | llm  

    async for chunk in chain.astream({
        "question": user_query
    }):
        yield chunk

