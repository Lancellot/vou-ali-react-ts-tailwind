import { FEATURES, type Feature } from "../../../src/data/homeData";

export default function Features() {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="container mx-auto max-w-6xl">

        <div className="text-center mb-14">
          <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-4 py-1.5 rounded-full">
            Funcionalidades
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight">
            Uma plataforma completa<br />para cada etapa da viagem
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
            Do planejamento ao retorno, cada detalhe organizado para que você
            foque no que importa: a experiência.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f: Feature, i: number) => (
            <div key={i} className="feature-card">
              <div className={`w-12 h-12 ${f.bgClass} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}