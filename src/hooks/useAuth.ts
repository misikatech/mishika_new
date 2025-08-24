import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LoginForm } from '../services/auth';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const login = async (credentials: LoginForm): Promise<void> => {
  try {
    dispatch({ type: 'AUTH_START' });
    console.log('Attempting login with:', { email: credentials.email });
    
    const response = await authService.login(credentials);
    console.log('Login response:', response);
    
    dispatch({ type: 'AUTH_SUCCESS', payload: response.data.user });
  } catch (error: any) {
    console.error('Login error in useAuth:', error);
    const message = error.message || 'Login failed';
    dispatch({ type: 'AUTH_ERROR', payload: message });
    throw error;
  }
};
