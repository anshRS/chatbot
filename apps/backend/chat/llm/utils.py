from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import WebBaseLoader
from decouple import config

def build_vector_store():

    # Load Document
    loader = WebBaseLoader("your_webpage_url_to_be_scraped")
    documents = loader.load()
    
    splitter = RecursiveCharacterTextSplitter(
        chunk_size = 1000,
        chunk_overlap = 0,
        add_start_index = True,
    )    
    # Split the documents into chunks
    splits = splitter.split_documents(documents)
    
    # Embbed Model Object
    embeddings = OllamaEmbeddings(model="llama2")   

    # Build the Chroma database with the document splits and embeddings
    db = Chroma.from_documents(
        splits,
        embeddings,
        collection_name="your_collection_name",
        persist_directory=config('CHROMA_DB_DIRECTORY', cast=str),
    )
    # Persist the database
    db.persist()

# build_vector_store()