import { STEPS, type Step } from "../../../src/data/homeData";

export default function HowItWorks() {
    return (
        <section className="bg-white py-20 px-6">
            <div className="container mx-auto max-w-3xl">

                <div className="text-center mb-14">
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full">
                        Como funciona
                    </span>
                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight">
                        Pronto para decolar em 4 passos
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {STEPS.map((s: Step, i: number) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100"
                        >
                            <div className="step-dot">{s.num}</div>
                            <div>
                                <p className="font-bold text-gray-900">{s.label}</p>
                                <p className="text-sm text-gray-500 mt-0.5">{s.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}