from fastapi import FastAPI
from app.routes import router
from app.database.mongo import init as init_db
from fastapi.middleware.cors import CORSMiddleware
from app.models import document_models

app = FastAPI()

# app.root_path = "/api"

# Дозволені джерела (орігіни) - React-додаток на порту 3000
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Додаємо CORS-мідлвар для дозволу запитів з фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Дозволяємо запити з цих доменів
    allow_credentials=True,
    allow_methods=["*"],  # Дозволяємо всі методи (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Дозволяємо всі заголовки
)


# Ініціалізація бази даних
@app.on_event("startup")
async def on_startup():
    await init_db(document_models)

# Підключення роутів
app.include_router(router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to the EmberMate API"}