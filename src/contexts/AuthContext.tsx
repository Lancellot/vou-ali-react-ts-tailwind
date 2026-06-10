import {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import type { UsuarioLogin } from '../models/UsuarioLogin';
import { login } from '../services/Service';
import { ToastAlerta } from '../utils/ToastAlerta';

interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    handleLoginGoogle(token: string): Promise<void>;
    handleLogout(): void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const usuarioInicial: UsuarioLogin = {
    id: 0,
    nome: '',
    email: '',
    senha: '',
    token: '',
};

export const AuthContext = createContext<AuthContextProps>(
    {} as AuthContextProps
);

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>(() => {
        const storageToken = localStorage.getItem('token');
        const storageNome = localStorage.getItem('nome');
        const storageEmail = localStorage.getItem('email');

        if (storageToken) {
            return {
                ...usuarioInicial,
                token: storageToken,
                nome: storageNome ?? '',
                email: storageEmail ?? '',
            };
        }

        return usuarioInicial;
    });

    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = Boolean(usuario.token);

    useEffect(() => {
        if (usuario.token) {
            localStorage.setItem('token', usuario.token);
            localStorage.setItem('nome', usuario.nome || '');
            localStorage.setItem('email', usuario.email || '');
        }
    }, [usuario]);

    const handleLogin = useCallback(async (usuarioLogin: UsuarioLogin) => {
        setIsLoading(true);
        try {
            await login(
                '/usuarios/logar',
                usuarioLogin,
                (data: UsuarioLogin) => {
                    setUsuario(data);
                }
            );
            ToastAlerta('Login realizado com sucesso!', 'sucesso');
        } catch {
            ToastAlerta('Email ou senha inválidos!', 'erro');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleLoginGoogle = useCallback(async (credential: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/usuarios/google`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ credential }),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erro na resposta do servidor:', errorText);
                throw new Error(`Erro ${response.status}: ${errorText}`);
            }

            const data: UsuarioLogin = await response.json();
            setUsuario(data);
            ToastAlerta('Login com Google realizado com sucesso!', 'sucesso');
        } catch (error) {
            console.error('Erro ao autenticar com Google:', error);
            ToastAlerta('Erro ao autenticar com Google', 'erro');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.clear();
        setUsuario(usuarioInicial);
        ToastAlerta('Usuário deslogado com sucesso', 'sucesso');
    }, []);

    return (
        <AuthContext.Provider
            value={{
                usuario,
                handleLogin,
                handleLoginGoogle,
                handleLogout,
                isLoading,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}