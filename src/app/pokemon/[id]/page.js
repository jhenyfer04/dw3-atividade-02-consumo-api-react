import Image from 'next/image';
import Link from 'next/link';
import TipoBadge from '@/components/TipoBadge';
import {
  artwork,
  categoriaEmIngles,
  descricaoEmIngles,
  getEspecie,
  getPokemon,
} from '@/lib/api';
import { formatarNome, numero, statsPtBr } from '@/lib/pokemon';

function NaoEncontrado() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-center">
      <h1 className="text-2xl font-bold text-zinc-200 mb-4">Pokémon não encontrado</h1>
      <p className="text-zinc-400 mb-8">
        Não foi possível localizar os dados para o identificador informado.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400 text-zinc-950 font-semibold rounded-lg hover:bg-yellow-300 transition"
      >
        ← Voltar ao catálogo
      </Link>
    </main>
  );
}

export default async function PokemonDetalhes({ params }) {
  const { id } = await params;

  if (!/^[a-z0-9-]+$/i.test(id)) return <NaoEncontrado />;

  const pokemon = await getPokemon(id.toLowerCase());
  if (!pokemon) return <NaoEncontrado />;

  const especie = await getEspecie(pokemon.species?.name ?? pokemon.id);
  const descricao = descricaoEmIngles(especie);
  const categoria = categoriaEmIngles(especie);

  const habilidades = pokemon.abilities ?? [];
  const totalStats = pokemon.stats.reduce((soma, s) => soma + s.base_stat, 0);

  const anterior = pokemon.id > 1 ? pokemon.id - 1 : null;
  const proximo = pokemon.id < 1025 ? pokemon.id + 1 : null;
  const navBtn =
    'px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-medium text-yellow-400 hover:bg-zinc-800 hover:border-yellow-400/50 transition';

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8 gap-3">
        <Link href="/" className={navBtn}>← Voltar ao catálogo</Link>
        <div className="flex gap-2">
          {anterior && <Link href={`/pokemon/${anterior}`} className={navBtn}>‹ {numero(anterior)}</Link>}
          {proximo && <Link href={`/pokemon/${proximo}`} className={navBtn}>{numero(proximo)} ›</Link>}
        </div>
      </div>

      <article className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 shadow-xl">
        <div className="w-full md:w-72 shrink-0">
          <div className="relative aspect-square bg-zinc-800/60 rounded-xl border border-zinc-700">
            <Image
              src={artwork(pokemon.id)}
              alt={formatarNome(pokemon.name)}
              fill
              sizes="(max-width: 768px) 100vw, 288px"
              className="object-contain p-4"
              priority
            />
          </div>

          <div className="mt-4 bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Altura:</span>
              <span className="text-zinc-200">{(pokemon.height / 10).toLocaleString('pt-BR')} m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Peso:</span>
              <span className="text-zinc-200">{(pokemon.weight / 10).toLocaleString('pt-BR')} kg</span>
            </div>
            {pokemon.base_experience != null && (
              <div className="flex justify-between">
                <span className="text-zinc-400">XP base:</span>
                <span className="text-zinc-200">{pokemon.base_experience}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <span className="font-mono text-sm text-zinc-400">{numero(pokemon.id)}</span>
          <h1 className="text-3xl font-extrabold text-zinc-100">
            {formatarNome(pokemon.name)}
          </h1>
          {categoria && <p className="text-zinc-400 text-sm mt-1">{categoria}</p>}

          <div className="mt-3 flex flex-wrap gap-2">
            {pokemon.types.map((t) => (
              <TipoBadge key={t.type.name} tipo={t.type.name} />
            ))}
          </div>

          {descricao && (
            <p className="mt-5 text-zinc-300 text-sm leading-relaxed italic">
              “{descricao}”
              <span className="not-italic text-zinc-500"> (texto da Pokédex, em inglês)</span>
            </p>
          )}

          <div className="mt-6">
            <h2 className="text-lg font-bold text-zinc-100 mb-3">Status base</h2>
            <ul className="space-y-2">
              {pokemon.stats.map((s) => (
                <li key={s.stat.name} className="flex items-center gap-3 text-sm">
                  <span className="w-28 text-zinc-400 shrink-0">
                    {statsPtBr[s.stat.name] ?? s.stat.name}
                  </span>
                  <span className="w-8 text-right font-mono text-zinc-200">{s.base_stat}</span>
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${Math.min(100, (s.base_stat / 200) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
              <li className="flex items-center gap-3 text-sm pt-2 border-t border-zinc-800">
                <span className="w-28 text-zinc-300 font-semibold shrink-0">Total</span>
                <span className="w-8 text-right font-mono text-yellow-400 font-bold">{totalStats}</span>
              </li>
            </ul>
          </div>

          {habilidades.length > 0 && (
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <h2 className="text-lg font-bold text-zinc-100 mb-3">Habilidades</h2>
              <div className="flex flex-wrap gap-2">
                {habilidades.map((h) => (
                  <span
                    key={h.ability.name}
                    className="text-xs bg-zinc-800 text-zinc-200 px-2.5 py-1 rounded-md border border-zinc-700"
                  >
                    {formatarNome(h.ability.name)}
                    {h.is_hidden && <span className="text-yellow-400"> • oculta</span>}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
