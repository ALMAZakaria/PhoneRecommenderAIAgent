from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
import models, schemas, crud, database
import google.generativeai as genai
import os
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

# Configure Gemini API
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://192.168.244.1:3000"],
    allow_credentials=True,
    allow_methods=["POST","GET"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    # Create database tables
    async with database.engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

@app.get("/")
async def root():
    return {"message": "Cellphone Chat API is running!"}

@app.post('/chat', response_model=schemas.ChatResponse)
async def chat(request: schemas.ChatRequest, db: AsyncSession = Depends(database.get_db)):
    user = await crud.get_user(db, request.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Get all available cellphones from database
    cellphones = await crud.get_cellphones(db)
    
    # Create a list of available brands and models for context
    available_products = []
    for phone in cellphones:
        available_products.append(f"{phone.brand} {phone.model} (${phone.price})")
    
    products_context = "\n".join(available_products)

    # Compose smart prompt for LLM
    prompt = f"""You are a smart cellphone recommendation assistant. 

Available products in our database:
{products_context}

User preferences: {user.preferences or 'None specified'}
User message: {request.message}

Instructions:
1. Be concise and friendly
2. Ask specific questions about: budget, brand preference, storage needs, camera quality, battery life
3. Only recommend products from the database above
4. If user hasn't provided enough info, ask 1-2 specific questions
5. Keep responses under 100 words
6. Respond in {user.language or 'English'}

Current conversation: {request.message}"""

    # Call Google Gemini API
    try:
        response = model.generate_content(prompt)
        reply = response.text
    except Exception as e:
        reply = f"Sorry, I'm having trouble right now. Please try again. (Error: {str(e)})"

    # Smart recommendation logic based on message content
    recommendations = []
    message_lower = request.message.lower()
    
    # Check for specific brand mentions
    for cellphone in cellphones:
        if cellphone.brand.lower() in message_lower or cellphone.model.lower() in message_lower:
            recommendations.append(cellphone)
    
    # If no specific matches, check for budget mentions
    if not recommendations:
        # Extract budget from message (simple pattern matching)
        import re
        budget_match = re.search(r'\$(\d+)', request.message)
        if budget_match:
            budget = int(budget_match.group(1))
            recommendations = [phone for phone in cellphones if phone.price <= budget][:3]
    
    # If still no recommendations, show top 3 by price
    if not recommendations:
        recommendations = sorted(cellphones, key=lambda x: x.price)[:3]

    # Store conversation
    await crud.create_conversation(db, schemas.ConversationCreate(
        user_id=request.user_id,
        message=request.message,
        response=reply,
        timestamp=datetime.utcnow()
    ))

    return schemas.ChatResponse(response=reply, recommendations=recommendations)

@app.post('/contact-info', response_model=schemas.ContactInfoResponse)
async def submit_contact_info(contact_info: schemas.ContactInfo, db: AsyncSession = Depends(database.get_db)):
    # Verify user exists
    user = await crud.get_user(db, contact_info.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Verify cellphone exists
    cellphone = await crud.get_cellphone(db, contact_info.cellphone_id)
    if not cellphone:
        raise HTTPException(status_code=404, detail="Cellphone not found")
    
    # Store contact information
    db_contact_info = await crud.create_contact_info(db, contact_info)
    
    return schemas.ContactInfoResponse(
        message=f"Thank you {contact_info.name}! We've received your contact information for the {cellphone.brand} {cellphone.model}. We'll call you at {contact_info.phone} within 24 hours to confirm your purchase.",
        contact_info=contact_info
    )

@app.post('/cellphones', response_model=schemas.CellPhone)
async def add_cellphone(cellphone: schemas.CellPhoneCreate, db: AsyncSession = Depends(database.get_db)):
    return await crud.create_cellphone(db, cellphone)

@app.post('/users', response_model=schemas.User)
async def add_user(user: schemas.UserCreate, db: AsyncSession = Depends(database.get_db)):
    return await crud.create_user(db, user)
