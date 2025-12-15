from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

app = FastAPI(title="AI Research Paper Reviewer")

# ✅ CORS configuration
origins = [
    "http://localhost:3000",   # Next.js frontend
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],      # GET, POST, etc.
    allow_headers=["*"],
)

app.include_router(router)
