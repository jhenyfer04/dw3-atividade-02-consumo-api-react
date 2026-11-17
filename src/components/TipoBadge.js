import { coresTipo, tiposPtBr } from '@/lib/pokemon';

export default function TipoBadge({ tipo }) {
  return (
    <span
      className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full text-white ${
        coresTipo[tipo] ?? 'bg-zinc-600'
      }`}
    >
      {tiposPtBr[tipo] ?? tipo}
    </span>
  );
}
