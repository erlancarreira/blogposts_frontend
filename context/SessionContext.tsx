import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Credentials, User } from '@/types';

type SessionContextType = {
    session: User | null;
    isLoading: boolean;
    signIn: (credentials: Credentials) => Promise<void>;
    signOut: () => Promise<void>;
    register: (credentials: Credentials) => Promise<void>;
    error: Error | null;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const {
        signIn,
        signOut,
        register,
        session,
        isLoading,
        error
    } = useAuth();

    const value = useMemo(() => ({
        session,
        isLoading,
        signIn,
        signOut,
        register,
        error
    }), [session, isLoading, signIn, signOut, register, error]);

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);

    if (context === undefined) {
        throw new Error('useSession deve ser usado dentro de um SessionProvider');
    }

    return context;
}
