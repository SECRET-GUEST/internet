import React, { useState, useEffect, ReactNode } from 'react';

interface APIKeyProviderProps {
  children: (apiKey: string) => ReactNode;
}

const APIKeyProvider: React.FC<APIKeyProviderProps> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const key = import.meta.env.VITE_API_KEY as string;
    setApiKey(key);
  }, []);

  return <>{children(apiKey)}</>;
};

export default APIKeyProvider;
