"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Fyll i både e-post och lösenord");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Fel login");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-card-foreground">Logga in</h1>
          <p className="mt-2 text-sm text-muted">
            Logga in för att hantera projekt och bilder på hemsidan.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              E-post
            </label>
            <input
              type="email"
              placeholder="din@email.se"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-border bg-background px-3 py-2 text-foreground"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Lösenord
            </label>
            <input
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-border bg-background px-3 py-2 text-foreground"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </div>
      </div>
    </div>
  );
}
