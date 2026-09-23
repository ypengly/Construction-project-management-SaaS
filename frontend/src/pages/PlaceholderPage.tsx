export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-dashed border-ink-300/40 bg-white p-12 text-center">
      <h1 className="text-lg font-semibold text-ink-900">{title}</h1>
      <p className="mt-2 text-sm text-ink-500">This module is scaffolded and ready to build out next.</p>
    </div>
  );
}
