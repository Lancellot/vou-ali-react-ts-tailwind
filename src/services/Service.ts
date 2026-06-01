import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export const authHeader = (token: string) => ({
	headers: { Authorization: token },
});

export const cadastrarUsuario = async (
	url: string,
	dados: object,
	setDados: Function,
) => {
	const resposta = await api.post(url, dados);
	setDados(resposta.data);
};

export const login = async (url: string, dados: object, setDados: Function) => {
	const resposta = await api.post(url, dados);

	if (resposta.data.token) {
		localStorage.setItem('token', resposta.data.token);
	}

	setDados(resposta.data);
};

export const cadastrar = async (
	url: string,
	dados: object,
	setDados: Function,
	header: object,
) => {
	const resposta = await api.post(url, dados, header);
	setDados(resposta.data);
};

export const atualizar = async (
	url: string,
	dados: object,
	setDados: Function,
	header: object,
) => {
	const resposta = await api.put(url, dados, header);
	setDados(resposta.data);
};

export const buscar = async (
	url: string,
	setDados?: Function,
	header?: object,
) => {
    try {
		const resposta = await api.get(url, header);

		if (setDados) {
			setDados(resposta.data);
		}

		return resposta.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const deletar = async (url: string, header: object) => {
    try {
		await api.delete(url, header);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export default api;