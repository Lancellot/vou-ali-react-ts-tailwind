import { createContext, useState, type ReactNode } from 'react';

import type { UsuarioLogin } from '../models/UsuarioLogin';
import { login } from '../services/Service';
import { ToastAlerta } from '../utils/ToastAlerta';

interface AuthContextProps {
	usuario: UsuarioLogin;
	handleLogout(): void;
	handleLogin(usuario: UsuarioLogin): Promise<void>;
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
	token: localStorage.getItem('token') ?? '',
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
	const [usuario, setUsuario] = useState<UsuarioLogin>(usuarioInicial);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function handleLogin(usuarioLogin: UsuarioLogin) {
		setIsLoading(true);

		try {
			await login('/usuarios/logar', usuarioLogin, setUsuario);
			ToastAlerta('Usuário foi autenticado com sucesso!', 'sucesso');
		} catch {
			ToastAlerta('Os dados do Usuário estão inconsistentes!', 'erro');
		}

		setIsLoading(false);
	}

	function handleLogout() {
		localStorage.removeItem('token');
		setUsuario({
			id: 0,
			nome: '',
			email: '',
			senha: '',
			token: '',
		});
		ToastAlerta('Usuário deslogado com sucesso!', 'sucesso');
	}

	const isAuthenticated = usuario.token !== '';

	return (
		<AuthContext.Provider
			value={{ usuario, handleLogout, handleLogin, isAuthenticated, isLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
}
