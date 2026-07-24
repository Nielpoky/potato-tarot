"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { isAdminEmail } from "@/lib/adminEmails";
import { AdminSidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const isLoginPage = pathname === "/admin/login";

  const authorized = !!user && isAdminEmail(user.email);

  useEffect(() => {
    if (loading) return;
    if (!authorized && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [loading, authorized, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-sm text-text-3">
        Memeriksa akses...
      </div>
    );
  }

  if (!authorized) {
    // useEffect above will redirect; render nothing meanwhile.
    return null;
  }

  return (
    <div className="min-h-screen bg-bg">
      <AdminSidebar />
      <main className="min-h-screen p-6 md:ml-60 md:p-10">{children}</main>
    </div>
  );
}
