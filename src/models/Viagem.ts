import type { Despesa } from './Despesa';
import type { Parada } from './Parada';
import type { Usuario } from './Usuario';

export interface Viagem {
	id?: number;
	titulo: string;
	destino: string;
	dataInicio: string;
	dataFim: string;
	descricao?: string;
	usuario?: Usuario;
	usuarioId?: number;
	paradas?: Parada[];
	despesas?: Despesa[];
}
