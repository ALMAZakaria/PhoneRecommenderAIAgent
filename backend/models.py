from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    language = Column(String, default='en')
    preferences = Column(Text, nullable=True)
    conversations = relationship('Conversation', back_populates='user')
    contact_info = relationship('ContactInfo', back_populates='user')

class CellPhone(Base):
    __tablename__ = 'cellphones'
    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String, nullable=False)
    model = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    storage = Column(String, nullable=True)
    battery_life = Column(String, nullable=True)

class ContactInfo(Base):
    __tablename__ = 'contact_info'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    cellphone_id = Column(Integer, ForeignKey('cellphones.id'))
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    user = relationship('User', back_populates='contact_info')
    cellphone = relationship('CellPhone')

class Conversation(Base):
    __tablename__ = 'conversations'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    message = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    user = relationship('User', back_populates='conversations') 