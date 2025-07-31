import React, { useState } from 'react';
import UserSetup from './components/UserSetup';
import ChatInterface from './components/ChatInterface';

function App() {
  const [userId, setUserId] = useState<number | null>(null);

  const handleUserCreated = (newUserId: number) => {
    setUserId(newUserId);
  };

  return (
    <div className="App h-screen">
      {userId ? (
        <ChatInterface userId={userId} />
      ) : (
        <UserSetup onUserCreated={handleUserCreated} />
      )}
    </div>
  );
}

export default App; 