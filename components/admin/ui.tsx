"use client";

import { cn } from "@/lib/utils";

export function AdminPageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-text-2">{subtitle}</p>}
    </div>
  );
}

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("glass rounded-l p-6", className)}>{children}</div>;
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <AdminCard>
      <div className="text-xs text-text-3">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-accent-bright">{value}</div>
    </AdminCard>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3"
    >
      {label && <span className="text-sm text-text-2">{label}</span>}
      <span
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          checked ? "bg-accent" : "bg-white/10"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </span>
    </button>
  );
}

export function Stepper({
  value,
  onChange,
  min = 0,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="glass flex h-8 w-8 items-center justify-center rounded-full text-sm hover:bg-surface-hover"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-medium">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className="glass flex h-8 w-8 items-center justify-center rounded-full text-sm hover:bg-surface-hover"
      >
        +
      </button>
    </div>
  );
}
