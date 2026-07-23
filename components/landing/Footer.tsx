export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="container flex flex-col items-center gap-2 text-center text-sm text-text-3">
        <div className="font-semibold text-text-2">Potato Tarot Reading</div>
        <p>© {new Date().getFullYear()} Potato Tarot Reading. Papan informasi realtime.</p>
      </div>
    </footer>
  );
}
