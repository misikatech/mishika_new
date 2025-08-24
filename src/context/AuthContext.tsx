import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { authService, User, LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm } from '../services/auth';
import { adminAuthService, AdminUser } from '../services/adminAuth';

interface AuthState {
  user: User | AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginForm) => Promise<void>;
  adminLogin: (credentials: LoginForm) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (data: ForgotPasswordForm) => Promise<void>;
  resetPassword: (data: ResetPasswordForm) => Promise<void>;
  clearError: () => void;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User | AdminUser }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'CLEAR_LOADING' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null, isLoading: false };
    case 'CLEAR_LOADING':
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing authentication on mount
  useEffect(() => {
    const user = authService.getCurrentUser();
    const token = authService.getToken();
    
    if (user && token) {
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    }
  }, []);

  const login = async (credentials: LoginForm): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authService.login(credentials);
      
      // Extract user from the response data
      const user = response.data.user;
      
      if (user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } else {
        throw new Error('User data not found in response');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  };

  const adminLogin = async (credentials: LoginForm): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await adminAuthService.login(credentials);
      
      // Extract admin user from the response
      const user = response.user;
      
      if (user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } else {
        throw new Error('Admin user data not found in response');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Admin login failed';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  };

  const register = async (userData: RegisterForm): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      await authService.register(userData);
      dispatch({ type: 'CLEAR_LOADING' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      dispatch({ type: 'AUTH_LOGOUT' });
      toast.success('Logged out successfully');
    } catch (error) {
      dispatch({ type: 'AUTH_LOGOUT' });
      console.error('Logout error:', error);
    }
  };

  const forgotPassword = async (data: ForgotPasswordForm): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      await authService.forgotPassword(data);
      dispatch({ type: 'CLEAR_ERROR' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send reset email';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  };

  const resetPassword = async (data: ResetPasswordForm): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      await authService.resetPassword(data);
      dispatch({ type: 'CLEAR_ERROR' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to reset password';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    adminLogin,
    register,
    logout,
    forgotPassword,
    resetPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
