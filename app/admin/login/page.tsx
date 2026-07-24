"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { Chrome, ShieldAlert, Moon } from "lucide-react";
import { auth, googleProvider } from "@/firebase/client";
import { isAdminEmail } from "@/lib/adminEmails";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  async function handleSignIn() {
    setError(null);
    setSigningIn(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!isAdminEmail(result.user.email)) {
        await signOut(auth);
        setError("Akun ini tidak memiliki akses admin.");
        setSigningIn(false);
        return;
      }
      router.push("/admin");
    } catch (err) {
      setError("Gagal login. Coba lagi.");
      setSigningIn(false);
    }
  }

  if (!loading && user && isAdminEmail(user.email)) {
    router.push("/admin");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-6">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="aurora-blob top-[-360px] left-1/2 h-[700px] w-[700px] -translate-x-1/2"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,.18), transparent 70%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass relative z-10 w-full max-w-sm rounded-l p-8 text-center"
      >
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
          <Moon className="h-5 w-5 text-accent" strokeWidth={1.5} />
        </div>
        <h1 className="mb-1 text-xl font-semibold">Admin Login</h1>
        <p className="mb-7 text-sm text-text-2">Potato Tarot Reading — Dashboard</p>

        <button
          onClick={handleSignIn}
          disabled={signingIn}
          className="glass flex h-12 w-full items-center justify-center gap-3 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          <Chrome className="h-4 w-4" strokeWidth={1.5} />
          {signingIn ? "Memproses..." : "Masuk dengan Google"}
        </button>

        {error && (
          <div className="mt-5 flex items-center gap-2 rounded-s border border-red-400/30 bg-red-400/10 px-4 py-3 text-left text-xs text-red-300">
            <ShieldAlert className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            {error}
          </div>
        )}
      </motion.div>
    </main>
  );
}
