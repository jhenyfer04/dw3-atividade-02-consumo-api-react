import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Pokédex — Catálogo de Pokémon',
  description: 'Atividade DW3 - Consumo de API Pública com React e Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
        <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-extrabold tracking-tight text-yellow-400 hover:text-yellow-300 transition">
              ⚡ Pokédex <span className="text-zinc-400 font-normal text-sm hidden sm:inline">| Catálogo</span>
            </Link>
            <span className="text-xs text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full">
              DW3 • PokéAPI
            </span>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-500">
          Fatec Registro • Desenvolvimento Web III • Dados fornecidos pela PokéAPI
        </footer>
      </body>
    </html>
  );
}
