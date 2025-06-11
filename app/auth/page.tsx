'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function AuthPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect to dashboard if already authenticated
        router.replace('/dashboard');
      } else {
        // Redirect to sign-in page by default
        router.replace('/auth/signin');
      }
    }
  }, [router, user, loading]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">
          {user ? 'Redirecting to dashboard...' : 'Redirecting...'}
        </p>
      </div>
    </div>
  );
} 