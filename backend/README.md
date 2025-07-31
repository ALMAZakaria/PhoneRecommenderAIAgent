# CellPhone Chat Backend

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Environment Variables
Create a `.env` file in the backend directory with the following variables:

```
DATABASE_URL=postgresql+asyncpg://username:password@localhost:5432/cellphone_chat
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Database Setup
- Install PostgreSQL
- Create a database named `cellphone_chat`
- Update the DATABASE_URL in your .env file with your database credentials

### 4. Run the Server
```bash
python run.py
```

The server will start on http://localhost:8000

### 5. API Documentation
Once running, visit http://localhost:8000/docs for interactive API documentation. 