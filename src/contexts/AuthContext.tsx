import React, { createContext, useContext, useState, useCallback } from 'react';
import { UserRole } from '@/constants/theme';
import { User, mockUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string) => boolean;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((phone: string) => {
    const found = mockUsers.find(u => u.phone === phone);
    if (found) { setUser(found); return true; }
    return false;
  }, []);

  const loginAsRole = useCallback((role: UserRole) => {
    const found = mockUsers.find(u => u.role === role);
    if (found) setUser(found);
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const switchRole = useCallback((role: UserRole) => {
    const found = mockUsers.find(u => u.role === role);
    if (found) setUser(found);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginAsRole, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
