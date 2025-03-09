import { useCallback, useEffect, useState } from 'react';
import { login, logout, getSession, register } from '@/services/authService';
import { Credentials, User } from '@/types';

export function useAuth() {
    const [ session  , setSession   ] = useState<User | null>(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error    , setError     ] = useState<Error | null>(null);

    const loadSession = useCallback(async () => {
        try {
            const user = await getSession();
            setSession(user);
            setError(null);
        } catch (error) {
            setError(error instanceof Error ? error : new Error('Erro ao carregar sessão'));
        } finally {
            setIsLoading(false);
        }
    }, []); 

    useEffect(() => {
        loadSession();
    }, []);

    const signIn = useCallback(async (credentials: Credentials) => {
        setIsLoading(true);
        setError(null);
        try {
            const user = await login(credentials);
            setSession(user);
        } catch (error) {
            console.log('Erro no login:', error);
            setError(error instanceof Error ? error : new Error('Erro ao fazer login'));
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            await logout();
            setSession(null);
        } catch (error) {
            setError(error instanceof Error ? error : new Error('Erro ao fazer logout'));
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleRegister = useCallback(async (credentials: Credentials) => {
        setIsLoading(true);
        setError(null);
        try {
            const user = await register(credentials);
            setSession(user);
        } catch (error) {
            setError(error instanceof Error ? error : new Error('Erro ao fazer cadastro'));
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        session,
        isLoading,
        error,
        signIn,
        signOut,
        register: handleRegister,
    };
}
