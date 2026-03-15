"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError("Unable to create account. Please check your details and try again.");
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          email,
          full_name: fullName,
        },
        { onConflict: "id" }
      );
    }

    router.push("/check-email");
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
          <h1 className="text-2xl font-bold text-[#0A0A0A] mb-1 tracking-tight">Create your account</h1>
          <p className="text-sm text-[#525252] mb-8">Get started with 3 free quiz generations</p>

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

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm text-[#0A0A0A] mb-1.5">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] text-sm placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                placeholder="John Doe"
              />
            </div>

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
                placeholder="Min. 6 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A0A0A] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#171717] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#737373]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#0A0A0A] font-medium hover:underline">
              Sign in
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#0A0A0A] mb-3 tracking-tight">Everything you need to ace your exams</h3>
          <p className="text-sm text-[#525252] leading-relaxed mb-8">Upload any document and get AI-generated study materials in seconds.</p>
          <div className="grid grid-cols-2 gap-3 mb-10">
            {[{num: "10K+", label: "Documents processed"}, {num: "50K+", label: "Quizzes created"}, {num: "98%", label: "Satisfaction rate"}, {num: "<15s", label: "Generation time"}].map((s, i) => (
              <div key={i} className="border border-[#E5E5E5] rounded-lg p-3 bg-white">
                <p className="text-lg font-bold text-[#0A0A0A] tracking-tight">{s.num}</p>
                <p className="text-[11px] text-[#737373]">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="border border-[#E5E5E5] rounded-xl p-5 bg-white">
            <div className="text-2xl text-[#E5E5E5] font-serif leading-none mb-2">&ldquo;</div>
            <p className="text-sm text-[#0A0A0A] leading-relaxed mb-4">I uploaded my entire semester&apos;s worth of notes and had study materials ready in minutes. This is a game changer.</p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">JR</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0A0A0A]">James Rodriguez</p>
                <p className="text-[11px] text-[#737373]">Computer Science Major</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
