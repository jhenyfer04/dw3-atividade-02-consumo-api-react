'use client';

export default function Error({ error, reset }) {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-center">
      <h1 className="text-2xl font-bold text-zinc-200 mb-3">Algo deu errado</h1>
      <p className="text-zinc-400 mb-8 text-sm">
        {error?.message || 'Não foi possível carregar os dados da API.'}
      </p>
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 bg-yellow-400 text-zinc-950 font-semibold rounded-lg hover:bg-yellow-300 transition"
      >
        Tentar novamente
      </button>
    </main>
  );
}
