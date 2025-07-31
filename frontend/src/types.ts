export interface User {
  id: number;
  name?: string;
  language?: string;
  preferences?: string;
}

export interface CellPhone {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  storage?: string;
  battery_life?: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Conversation {
  id: number;
  user_id: number;
  message: string;
  response: string;
  timestamp?: string;
}

export interface ChatRequest {
  user_id: number;
  message: string;
}

export interface ChatResponse {
  response: string;
  recommendations?: CellPhone[];
}

export interface UserCreate {
  name?: string;
  language?: string;
  preferences?: string;
}

export interface CellPhoneCreate {
  brand: string;
  model: string;
  year: number;
  price: number;
  storage?: string;
  battery_life?: string;
} 