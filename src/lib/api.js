const BASE_URL = 'https://pokeapi.co/api/v2';
const REVALIDATE = 86400; // os dados dos Pokémon quase nunca mudam

export const POR_PAGINA = 24;

export function artwork(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: REVALIDATE },
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`Falha ao consultar a PokéAPI (status ${res.status})`);
  }

  return res.json();
}

export async function getPokemon(idOuNome) {
  return request(`/pokemon/${idOuNome}`);
}

export async function getEspecie(idOuNome) {
  return request(`/pokemon-species/${idOuNome}`);
}

// Lista uma página e busca o detalhe de cada um (precisamos dos tipos).
export async function getPagina(pagina = 1) {
  const offset = (pagina - 1) * POR_PAGINA;
  const lista = await request(`/pokemon?limit=${POR_PAGINA}&offset=${offset}`);

  if (!lista) return { pokemons: [], total: 0 };

  const pokemons = await Promise.all(
    lista.results.map((p) => getPokemon(p.name)),
  );

  return { pokemons: pokemons.filter(Boolean), total: lista.count };
}

export function descricaoEmIngles(especie) {
  const entrada = especie?.flavor_text_entries?.find(
    (e) => e.language.name === 'en',
  );
  return entrada?.flavor_text.replace(/[\n\f\r]+/g, ' ').trim() ?? '';
}

export function categoriaEmIngles(especie) {
  return especie?.genera?.find((g) => g.language.name === 'en')?.genus ?? '';
}
