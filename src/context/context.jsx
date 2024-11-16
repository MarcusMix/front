import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado do usuário logado

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decodificar o token ou buscar dados do usuário
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar payload do JWT
        setUser({ email: decodedToken.sub }); // Exemplo: extrair email do token
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    setUser({ email: decodedToken.sub });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
