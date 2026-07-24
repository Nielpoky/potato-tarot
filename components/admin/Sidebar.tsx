"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  LayoutDashboard,
  ListOrdered,
  CalendarClock,
  Crown,
  Settings,
  LogOut,
  Moon,
} from "lucide-react";
import { auth } from "@/firebase/client";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/queue", label: "Antrean", icon: ListOrdered },
  { href: "/admin/sessions", label: "Sesi", icon: CalendarClock },
  { href: "/admin/premium", label: "Premium", icon: Crown },
  { href: "/admin/settings", label: "Pengaturan", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.push("/admin/login");
  }

  return (
    <aside className="glass fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-border p-5 md:flex">
      <div className="mb-8 flex items-center gap-2.5 px-2 text-sm font-semibold">
        <Moon className="h-5 w-5 text-accent" strokeWidth={1.5} />
        Potato Tarot
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-s px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-accent/10 text-accent-bright"
                  : "text-text-2 hover:bg-surface hover:text-text"
              )}
            >
              <item.icon className="h-4 w-4" strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-s px-3 py-2.5 text-sm text-text-3 transition-colors hover:bg-surface hover:text-text"
      >
        <LogOut className="h-4 w-4" strokeWidth={1.5} />
        Keluar
      </button>
    </aside>
  );
}
