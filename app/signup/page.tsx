'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>

        {error && (
          <p className="text-red-500 text-sm bg-red-950 border border-red-800 rounded p-2">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white"
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-white text-black rounded font-medium hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        <p className="text-sm text-gray-400 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-white underline">
            Log in
          </a>
        </p>
      </form>
    </main>
  );
}
