import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Sign In — Kingsprem Digital" },
      { name: "description", content: "Sign in to manage Kingsprem Digital website content." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Sign In — Kingsprem Digital" },
      { property: "og:description", content: "Content management access for the Kingsprem Digital team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setMsg("Account created. If email confirmation is required, check your inbox.");
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setMsg(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setMsg("Google sign-in failed. Try email and password.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin" });
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-24">
      <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-accent">
        Content Admin
      </span>
      <h1 className="mb-8 font-display text-5xl uppercase leading-none">
        {mode === "signin" ? "Sign in" : "Create account"}
      </h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-foreground/20 bg-background px-4 py-3"
        />
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-foreground/20 bg-background px-4 py-3"
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-foreground px-6 py-3 font-bold uppercase tracking-tighter text-background disabled:opacity-50"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
        </button>
      </form>

      <button
        onClick={google}
        className="mt-3 w-full border border-foreground/20 px-6 py-3 font-medium uppercase tracking-tighter hover:bg-secondary"
      >
        Continue with Google
      </button>

      {msg && <p className="mt-4 text-sm text-muted-foreground">{msg}</p>}

      <button
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="mt-6 font-mono text-xs uppercase tracking-widest text-accent"
      >
        {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
      </button>
    </div>
  );
}
