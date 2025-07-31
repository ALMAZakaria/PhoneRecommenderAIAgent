import React, { useState } from 'react';
import { UserCreate } from '../types';
import { userAPI } from '../api';
import { User, Globe, Settings } from 'lucide-react';

interface UserSetupProps {
  onUserCreated: (userId: number) => void;
}

const UserSetup: React.FC<UserSetupProps> = ({ onUserCreated }) => {
  const [formData, setFormData] = useState<UserCreate>({
    name: '',
    language: 'en',
    preferences: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await userAPI.createUser(formData);
      onUserCreated(user.id);
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserCreate, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to CellPhone Assistant
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Let's get to know you better to provide personalized recommendations
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Name Input */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Your Name (Optional)
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Enter your name"
              />
            </div>

            {/* Language Selection */}
            <div className="mb-4">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="inline w-4 h-4 mr-1" />
                Preferred Language
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
                <option value="pt">Português</option>
              </select>
            </div>

            {/* Preferences */}
            <div className="mb-4">
              <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 mb-2">
                <Settings className="inline w-4 h-4 mr-1" />
                CellPhone Preferences (Optional)
              </label>
              <textarea
                id="preferences"
                name="preferences"
                value={formData.preferences}
                onChange={(e) => handleInputChange('preferences', e.target.value)}
                rows={3}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="e.g., I prefer Apple phones, budget around $500, need good camera"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Start Chatting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSetup; 