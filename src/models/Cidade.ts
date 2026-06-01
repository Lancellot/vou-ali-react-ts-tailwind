import type { Parada } from './Parada';

export interface Cidade {
	id?: number;
	nome: string;
	estado?: string;
	pais?: string;
	paradas?: Parada[];
}
