export function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="aurora-blob top-[-360px] h-[820px] w-[820px] -translate-x-1/2 animate-aurora1"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,.07), transparent 72%)" }}
      />
      <div
        className="aurora-blob top-[-140px] h-[600px] w-[600px] -translate-x-1/2 animate-aurora2"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,.32), transparent 70%)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, transparent 35%, rgba(0,0,0,.55) 100%)",
        }}
      />
    </div>
  );
}
