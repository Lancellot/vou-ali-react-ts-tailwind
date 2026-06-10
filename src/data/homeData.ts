export interface Feature {
    icon: string;
    title: string;
    desc: string;
    bgClass: string;
}

export interface Step {
    num: string;
    label: string;
    sub: string;
}

export interface Stat {
    target: number;
    suffix: string;
    label: string;
}

export interface TripActivity {
    day: string;
    act: string;
    icon: string;
    cat: string;
}

export const FEATURES: Feature[] = [
    {
        icon: "🗺️",
        title: "Roteiros Personalizados",
        desc: "Monte seu itinerário dia a dia com atividades organizadas por categoria: hospedagem, transporte e lazer.",
        bgClass: "bg-emerald-50",
    },
    {
        icon: "💰",
        title: "Controle Financeiro",
        desc: "Monitore custos previstos e realizados em tempo real. Nunca mais extrapole o orçamento da viagem.",
        bgClass: "bg-blue-50",
    },
    {
        icon: "📊",
        title: "Dashboard Estratégico",
        desc: "Visualize métricas da sua viagem de forma clara e tome decisões com base em dados concretos.",
        bgClass: "bg-violet-50",
    },
    {
        icon: "✈️",
        title: "Tudo em Um Só Lugar",
        desc: "Chega de reservas espalhadas em e-mails. Centralize tudo: passagens, hotéis e atrações em um único sistema.",
        bgClass: "bg-orange-50",
    },
];

export const STEPS: Step[] = [
    { num: "01", label: "Crie sua conta", sub: "Cadastro rápido e seguro" },
    { num: "02", label: "Monte seu roteiro", sub: "Adicione destinos e atividades" },
    { num: "03", label: "Controle os custos", sub: "Orçamento sempre atualizado" },
    { num: "04", label: "Viaje tranquilo", sub: "Tudo organizado pra você" },
];

export const STATS: Stat[] = [
    { target: 1200, suffix: "+", label: "Viagens planejadas" },
    { target: 98, suffix: "%", label: "Satisfação dos usuários" },
    { target: 4, suffix: " módulos", label: "Integrados na plataforma" },
    { target: 30, suffix: "s", label: "Para criar sua conta" },
];

export const TRIP_ACTIVITIES: TripActivity[] = [
    { day: "Dia 1", act: "Voo GRU → PUQ", icon: "✈️", cat: "Transporte" },
    { day: "Dia 2", act: "Torres del Paine", icon: "🥾", cat: "Lazer" },
    { day: "Dia 3", act: "Hotel Los Cuernos", icon: "🏨", cat: "Hospedagem" },
];