from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
# label_router, document_router, annotation_router
from .routers import auth_router, user_router, proj_router, document_router, label_router, annotation_router
from . import db_models

db_models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router.router)
app.include_router(user_router.router)
app.include_router(proj_router.router)
app.include_router(document_router.router)
app.include_router(label_router.router)
app.include_router(annotation_router.router)
