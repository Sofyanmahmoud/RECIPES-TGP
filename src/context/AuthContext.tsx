import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosClient from '../api/axiosClient';
import { User, LoginResponse } from '../types/index';

interface AuthContextType {
  user: User | null;
  login: (u: string, p: string) => Promise<LoginResponse>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axiosClient.post('/auth/login', {
        username,
        password,
      });

      const { accessToken, ...userData } = response.data;

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData as User);
      return { success: true };
    } catch (error: any) {
      console.error("Login failed:", error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};