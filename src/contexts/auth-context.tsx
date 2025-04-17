import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  signup: async () => false,
  logout: () => { },
  checkAuthenticated: () => false,
});

export interface User {
  email: string;
  id: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, accept any email/password
      const user = { email, id: '1' };
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }
  
  const signup = async (email: string, password: string) => {
    try {
      // For demo purposes, accept any email/password
      const user = { email, id: '1' };
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  }

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }

  const checkAuthenticated = () => isAuthenticated;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, checkAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
