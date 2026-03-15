"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError("Unable to sign in with Google. Please try again.");
      setGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-0">
        <div className="w-full max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded-lg border border-[#0A0A0A] bg-[#0A0A0A] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight text-[#0A0A0A]">DocQuiz AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#0A0A0A] mb-1 tracking-tight">Welcome back</h1>
          <p className="text-sm text-[#525252] mb-8">Sign in to your account to continue</p>

          {error && (
            <div className="border border-red-200 text-red-600 px-4 py-2.5 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Google OAuth */}
          <button
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-[#E5E5E5] rounded-lg py-2.5 text-sm font-medium text-[#0A0A0A] hover:bg-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E5E5]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-[#A3A3A3]">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-[#0A0A0A] mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] text-sm placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-[#0A0A0A] mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2.5 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] text-sm placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A0A0A] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#171717] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#737373]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#0A0A0A] font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right — Brand panel */}
      <div className="hidden lg:flex flex-1 bg-[#FAFAFA] border-l border-[#E5E5E5] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative max-w-md">
          <div className="w-12 h-12 border-2 border-[#0A0A0A] rounded-xl bg-[#0A0A0A] flex items-center justify-center mb-8">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#0A0A0A] mb-3 tracking-tight">Study smarter, not harder</h3>
          <p className="text-sm text-[#525252] leading-relaxed mb-8">Join thousands of students who use AI to transform their documents into interactive study materials.</p>
          <ul className="space-y-4 mb-10">
            {[{icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />, text: "AI-powered quiz generation"}, {icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />, text: "Interactive flashcards"}, {icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />, text: "Structured study guides"}].map((f, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 border border-[#E5E5E5] rounded-lg flex items-center justify-center bg-white shrink-0">
                  <svg className="w-4 h-4 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>{f.icon}</svg>
                </div>
                <span className="text-sm text-[#0A0A0A] font-medium">{f.text}</span>
              </li>
            ))}
          </ul>
          <div className="border border-[#E5E5E5] rounded-xl p-5 bg-white">
            <div className="text-2xl text-[#E5E5E5] font-serif leading-none mb-2">&ldquo;</div>
            <p className="text-sm text-[#0A0A0A] leading-relaxed mb-4">Turned my 200-page textbook into a study guide I actually want to use. Passed my exam on the first try.</p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">SC</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0A0A0A]">Sarah Chen</p>
                <p className="text-[11px] text-[#737373]">Medical Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
