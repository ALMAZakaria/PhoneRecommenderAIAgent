from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
import models, schemas

async def get_user(db: AsyncSession, user_id: int):
    result = await db.execute(select(models.User).where(models.User.id == user_id))
    return result.scalars().first()

async def create_user(db: AsyncSession, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def get_cellphones(db: AsyncSession):
    result = await db.execute(select(models.CellPhone))
    return result.scalars().all()

async def get_cellphone(db: AsyncSession, cellphone_id: int):
    result = await db.execute(select(models.CellPhone).where(models.CellPhone.id == cellphone_id))
    return result.scalars().first()

async def create_cellphone(db: AsyncSession, cellphone: schemas.CellPhoneCreate):
    db_cellphone = models.CellPhone(**cellphone.dict())
    db.add(db_cellphone)
    await db.commit()
    await db.refresh(db_cellphone)
    return db_cellphone

async def create_contact_info(db: AsyncSession, contact_info: schemas.ContactInfo):
    db_contact = models.ContactInfo(**contact_info.dict())
    db.add(db_contact)
    await db.commit()
    await db.refresh(db_contact)
    return db_contact

async def create_conversation(db: AsyncSession, conversation: schemas.ConversationCreate):
    db_conv = models.Conversation(**conversation.dict())
    db.add(db_conv)
    await db.commit()
    await db.refresh(db_conv)
    return db_conv 