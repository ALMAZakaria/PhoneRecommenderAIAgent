from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    name: Optional[str]
    language: Optional[str] = 'en'
    preferences: Optional[str]

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    class Config:
        from_attributes = True

class CellPhoneBase(BaseModel):
    brand: str
    model: str
    year: int
    price: float
    storage: Optional[str]
    battery_life: Optional[str]

class CellPhoneCreate(CellPhoneBase):
    pass

class CellPhone(CellPhoneBase):
    id: int
    class Config:
        from_attributes = True

class ContactInfo(BaseModel):
    name: str
    email: str
    phone: str
    cellphone_id: int
    user_id: int

class ContactInfoResponse(BaseModel):
    message: str
    contact_info: ContactInfo
    class Config:
        from_attributes = True

class ConversationBase(BaseModel):
    message: str
    response: str
    timestamp: Optional[datetime]

class ConversationCreate(ConversationBase):
    user_id: int

class Conversation(ConversationBase):
    id: int
    user_id: int
    class Config:
        from_attributes = True

class ChatRequest(BaseModel):
    user_id: int
    message: str

class ChatResponse(BaseModel):
    response: str
    recommendations: Optional[List[CellPhone]] 