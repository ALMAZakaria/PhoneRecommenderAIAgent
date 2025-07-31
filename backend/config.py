from typing import List, Optional
from pydantic_settings import BaseSettings

#It defines the configuration settings for the application.
class Settings(BaseSettings):
    ALLOWED_ORIGINS: List[str] = [""]
    OPENAI_API_KEY: Optional[str] = None  # Made optional
    DATABASE_URL: str

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings() 