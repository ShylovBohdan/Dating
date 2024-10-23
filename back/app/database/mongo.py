from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from pydantic import BaseModel

class Settings(BaseModel):
    mongo_uri: str = "mongodb://localhost:27017"
    db_name: str = "EmberMate"

settings = Settings()

client = AsyncIOMotorClient(settings.mongo_uri)
database = client[settings.db_name]

async def init(document_models):
    await init_beanie(database,document_models = document_models)