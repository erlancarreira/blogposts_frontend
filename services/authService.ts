import { DATABASE_KEY, SESSION_KEY } from "@/constants";
import { getData, storeData, removeData } from "@/utils/storage";
import { User, Credentials } from "@/types";
import { checkPassword } from "@/utils";

class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}

function validateCredentials(credentials: Credentials): void {
    if (!credentials.email || !credentials.email.includes('@')) {
        throw new AuthError('E-mail inválido');
    }
    if (!credentials.password || credentials.password.length < 6) {
        throw new AuthError('Senha deve ter pelo menos 6 caracteres');
    }
}

export async function login(credentials: Credentials): Promise<User> {
    try {

        validateCredentials(credentials);
        
        const data = (await getData(DATABASE_KEY)) as User[] || [];
        
        const user = data.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());

        if (!user || !user.password || !checkPassword(credentials.password, user.password)) {
            throw new AuthError('E-mail ou senha inválidos');
        }

        const sessionUser = { ...user };
        delete sessionUser.password; 
        
        await storeData(SESSION_KEY, sessionUser);
        return sessionUser;
    } catch (error) {
        if (error instanceof AuthError) {
            throw error;
        }
        throw new AuthError('Erro ao realizar login');
    }
}

export async function logout(): Promise<void> {
    try {
        await removeData(SESSION_KEY);
    } catch (error) {
        throw new AuthError('Erro ao realizar logout');
    }
}

export async function register(credentials: Credentials): Promise<User> {
    try {
        validateCredentials(credentials);
        
        const data = (await getData(DATABASE_KEY)) as User[] || [];

        if (data.some(user => user.email.toLowerCase() === credentials.email.toLowerCase())) {
            throw new AuthError('Este e-mail já está cadastrado');
        }

        const newUser: User = {
            id: Date.now(),
            name: credentials.name || credentials.email.split('@')[0],
            email: credentials.email.toLowerCase(),
            username: credentials.name || credentials.email.split('@')[0],
            password: credentials.password,
        };

        const updatedUsers = [...data, newUser];
        await storeData(DATABASE_KEY, updatedUsers);

        const sessionUser = { ...newUser };
        delete sessionUser.password;
        
        
        await storeData(SESSION_KEY, sessionUser);
        return sessionUser;
    } catch (error) {
        console.log(error, 'error')
        if (error instanceof AuthError) {
            throw error;
        }
        throw new AuthError('Erro ao realizar cadastro');
    }
}

export async function getSession(): Promise<User | null> {
    try {
        const user = await getData(SESSION_KEY) as User | null;
        return user;
    } catch (error) {
        console.error('Erro ao recuperar sessão:', error);
        return null;
    }
}
