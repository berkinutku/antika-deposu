import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { login, signUp, AuthPayload, AuthResponse } from '../api/auth';
import { setClientToken } from '../api/client';
import {
  clearAuth,
  getAuthToken,
  getStoredUser,
  storeAuthToken,
  storeUser,
  StoredUser,
} from '../utils/storage';

interface AuthContextValue {
  user: StoredUser | null;
  token: string | null;
  isInitializing: boolean;
  isAuthenticating: boolean;
  signIn: (payload: AuthPayload) => Promise<StoredUser>;
  register: (payload: AuthPayload) => Promise<StoredUser>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function formatAuthResponse({ token, user }: AuthResponse): {
  token: string;
  user: StoredUser;
} {
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      try {
        const [storedToken, storedUser] = await Promise.all([
          getAuthToken(),
          getStoredUser(),
        ]);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
          setClientToken(storedToken);
        }
      } catch (error) {
        console.warn('Failed to bootstrap auth state', error);
      } finally {
        setIsInitializing(false);
      }
    }

    bootstrap();
  }, []);

  const handleAuthSuccess = useCallback(async (auth: AuthResponse) => {
    const formatted = formatAuthResponse(auth);
    setToken(formatted.token);
    setUser(formatted.user);
    setClientToken(formatted.token);
    await Promise.all([
      storeAuthToken(formatted.token),
      storeUser(formatted.user),
    ]);
    return formatted.user;
  }, []);

  const signIn = useCallback(
    async (payload: AuthPayload) => {
      setIsAuthenticating(true);
      try {
        const response = await login(payload);
        return await handleAuthSuccess(response);
      } finally {
        setIsAuthenticating(false);
      }
    },
    [handleAuthSuccess],
  );

  const register = useCallback(
    async (payload: AuthPayload) => {
      setIsAuthenticating(true);
      try {
        const response = await signUp(payload);
        return await handleAuthSuccess(response);
      } finally {
        setIsAuthenticating(false);
      }
    },
    [handleAuthSuccess],
  );

  const signOut = useCallback(async () => {
    setToken(null);
    setUser(null);
    setClientToken(undefined);
    await clearAuth();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isInitializing,
      isAuthenticating,
      signIn,
      register,
      signOut,
    }),
    [isAuthenticating, isInitializing, register, signIn, signOut, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

