export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 rounded-xl bg-zinc-900 border border-zinc-800 animate-pulse" />
        ))}
      </div>
    </main>
  );
}
