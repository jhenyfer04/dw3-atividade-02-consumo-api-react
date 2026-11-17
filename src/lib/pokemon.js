export const tiposPtBr = {
  normal: 'Normal', fire: 'Fogo', water: 'Água', electric: 'Elétrico',
  grass: 'Planta', ice: 'Gelo', fighting: 'Lutador', poison: 'Veneno',
  ground: 'Terra', flying: 'Voador', psychic: 'Psíquico', bug: 'Inseto',
  rock: 'Pedra', ghost: 'Fantasma', dragon: 'Dragão', dark: 'Sombrio',
  steel: 'Aço', fairy: 'Fada',
};

// Classes completas (o Tailwind precisa enxergá-las no código).
export const coresTipo = {
  normal: 'bg-zinc-500', fire: 'bg-orange-500', water: 'bg-blue-500',
  electric: 'bg-yellow-400 !text-zinc-900', grass: 'bg-green-500',
  ice: 'bg-cyan-400 !text-zinc-900', fighting: 'bg-red-700',
  poison: 'bg-purple-500', ground: 'bg-amber-600', flying: 'bg-indigo-400',
  psychic: 'bg-pink-500', bug: 'bg-lime-500 !text-zinc-900',
  rock: 'bg-stone-500', ghost: 'bg-violet-700', dragon: 'bg-indigo-600',
  dark: 'bg-neutral-700', steel: 'bg-slate-400 !text-zinc-900',
  fairy: 'bg-pink-300 !text-zinc-900',
};

export const statsPtBr = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Ataque Esp.',
  'special-defense': 'Defesa Esp.',
  speed: 'Velocidade',
};

export function formatarNome(nome = '') {
  return nome
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

export const numero = (id) => `#${String(id).padStart(4, '0')}`;
