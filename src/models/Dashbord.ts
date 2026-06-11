export interface Dashboard {
    totalViagens: number;
    totalParadas: number;
    totalAtividades: number;
    totalDespesas: number;
    valorTotalDespesas: number;

    viagensRecentes: {
        id: number;
        titulo: string;
        dataInicio?: string;
        dataFim?: string;
        despesas: { 
            valor: number,
            descricao: string,
        }[];
    }[];
}