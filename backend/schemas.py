from pydantic import BaseModel, EmailStr
from datetime import datetime

# User
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(UserBase):
    id: int
    is_verified: bool

    class Config:
        orm_mode = True

# Document
class DocumentOut(BaseModel):
    id: int
    filename: str
    uploaded_at: datetime

    class Config:
        orm_mode = True

# AI Chat
class ChatRequest(BaseModel):
    question: str
