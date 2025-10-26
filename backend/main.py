from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend import models
from backend.database import engine, Base
from fastapi.staticfiles import StaticFiles
import os

# Create all tables
Base.metadata.create_all(bind=engine)

# Import routers
from backend.auth import router as auth_router
from backend.documents import router as documents_router
from backend.ai_chat import router as ai_router

app = FastAPI(
    title="Document AI Platform",
    description="Backend API for Document Uploading and AI-powered Q&A",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory=os.path.join(os.getcwd(), "uploads")), name="uploads")

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(documents_router, prefix="/documents", tags=["Documents"])
app.include_router(ai_router, prefix="/ai", tags=["AI Chat"])

@app.get("/")
def root():
    return {"message": "✅ Document AI Platform is running"}
