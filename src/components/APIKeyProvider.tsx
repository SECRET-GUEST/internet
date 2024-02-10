import React, { useState, useEffect, ReactNode } from 'react';

interface APIKeyProviderProps {
  children: (apiKey: string) => ReactNode;
}

const APIKeyProvider: React.FC<APIKeyProviderProps> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY || '';
    setApiKey(apiKey);
  }, []);

  return <>{children(apiKey)}</>;
};

export default APIKeyProvider;
