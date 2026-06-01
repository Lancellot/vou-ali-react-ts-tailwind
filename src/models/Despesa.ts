import type { Viagem } from './Viagem';

export interface Despesa {
	id?: number;
	descricao: string;
	valor: number;
	categoria: string;
	data?: string;
	viagemId?: number;
	viagem?: Viagem;
}
