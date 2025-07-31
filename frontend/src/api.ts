import axios from 'axios';
import { User, CellPhone, ChatRequest, ChatResponse, UserCreate, CellPhoneCreate, ContactInfo } from './types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatAPI = {
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await api.post('/chat', request);
    return response.data;
  },
};

export const userAPI = {
  createUser: async (user: UserCreate): Promise<User> => {
    const response = await api.post('/users', user);
    return response.data;
  },
};

export const cellphoneAPI = {
  createCellPhone: async (cellphone: CellPhoneCreate): Promise<CellPhone> => {
    const response = await api.post('/cellphones', cellphone);
    return response.data;
  },
};

export const contactAPI = {
  submitContactInfo: async (contactInfo: ContactInfo): Promise<{ message: string; contact_info: ContactInfo }> => {
    const response = await api.post('/contact-info', contactInfo);
    return response.data;
  },
}; 