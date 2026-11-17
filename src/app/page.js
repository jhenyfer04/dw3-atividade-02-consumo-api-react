import Link from 'next/link';
import PokemonCard from '@/components/PokemonCard';
import { POR_PAGINA, getPagina } from '@/lib/api';

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const pagina = Math.max(1, Number.parseInt(params?.page, 10) || 1);

  const { pokemons, total } = await getPagina(pagina);
  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));

  const btn = 'px-4 py-2 rounded-lg text-sm font-medium border transition';
  const ativo = `${btn} bg-zinc-900 border-zinc-800 text-yellow-400 hover:border-yellow-400/50`;
  const inativo = `${btn} border-zinc-900 text-zinc-600`;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">
          Catálogo de <span className="text-yellow-400">Pokémon</span>
        </h1>
        <p className="text-zinc-400 mt-3 text-sm sm:text-base">
          Navegue pela Pokédex e clique em qualquer Pokémon para ver status, habilidades e mais detalhes.
        </p>
      </div>

      {pokemons.length === 0 ? (
        <p className="text-center text-zinc-400">Nenhum Pokémon encontrado nesta página.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {pokemons.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}

      <nav className="mt-12 flex items-center justify-center gap-4">
        {pagina > 1 ? (
          <Link href={`/?page=${pagina - 1}`} className={ativo}>← Anterior</Link>
        ) : (
          <span className={inativo}>← Anterior</span>
        )}

        <span className="text-sm text-zinc-400">
          Página {pagina} de {totalPaginas}
        </span>

        {pagina < totalPaginas ? (
          <Link href={`/?page=${pagina + 1}`} className={ativo}>Próxima →</Link>
        ) : (
          <span className={inativo}>Próxima →</span>
        )}
      </nav>
    </main>
  );
}
