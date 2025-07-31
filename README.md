# CellPhone Chat Assistant

A smart chat application that helps users find and purchase cellphones through an AI-powered conversation interface.

## Features

- **AI-Powered Chat**: Intelligent conversation with users to understand their cellphone preferences
- **Smart Recommendations**: Suggests phones based on budget, brand preferences, and specifications
- **Contact Collection**: When users select a phone, they can provide their contact information for follow-up
- **Database Storage**: All conversations and contact information are stored securely
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## New Feature: Contact Form

When a user selects a phone from the recommendations, they are prompted to provide:
- **Full Name**: Required for personalization
- **Email Address**: For confirmation emails
- **Phone Number**: For sales team to call and confirm the purchase

The system will:
1. Store the contact information in the database
2. Send a confirmation message in the chat
3. Promise to call within 24 hours to confirm the sale

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Axios for API calls

### Backend
- FastAPI (Python)
- SQLAlchemy for database operations
- Google Gemini AI for intelligent responses
- SQLite database

## Setup

### Backend Setup
1. Navigate to the backend directory
2. Install dependencies: `pip install -r requirements.txt`
3. Set your Google API key: `export GOOGLE_API_KEY=your_key_here`
4. Run the server: `uvicorn main:app --reload`

### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## API Endpoints

- `POST /chat` - Send messages and get AI responses with recommendations
- `POST /contact-info` - Submit contact information for selected phones
- `POST /users` - Create new users
- `POST /cellphones` - Add new cellphones to the database

## Database Schema

The application includes tables for:
- Users and their preferences
- Cellphone inventory
- Conversation history
- Contact information submissions

## Usage Flow

1. User starts a conversation about cellphones
2. AI asks questions about preferences and budget
3. System recommends relevant phones
4. User selects a phone they're interested in
5. Contact form appears to collect user details
6. Information is stored and confirmation is sent
7. Sales team can follow up within 24 hours 