import Image from 'next/image';
import Link from 'next/link';
import TipoBadge from '@/components/TipoBadge';
import { artwork } from '@/lib/api';
import { formatarNome, numero } from '@/lib/pokemon';

export default function PokemonCard({ pokemon }) {
  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-yellow-400 hover:-translate-y-1 transition-all duration-200 shadow-lg flex flex-col"
    >
      <div className="aspect-square bg-zinc-800/60 relative p-4">
        <span className="absolute top-3 left-3 text-xs font-mono text-zinc-400 z-10">
          {numero(pokemon.id)}
        </span>
        <div className="relative w-full h-full">
          <Image
            src={artwork(pokemon.id)}
            alt={formatarNome(pokemon.name)}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold text-zinc-100 group-hover:text-yellow-400 transition-colors">
          {formatarNome(pokemon.name)}
        </h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {pokemon.types.map((t) => (
            <TipoBadge key={t.type.name} tipo={t.type.name} />
          ))}
        </div>
      </div>
    </Link>
  );
}
