"use client"
import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';
import { useAuth } from '../../../context/AuthContext';
export default function SignIn() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router=useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login() 
    router.push('/Dashboard')
    // Handle sign in logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50/30 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <Link
        href='/'
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        {/* Sign In Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Colitrack</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-white"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-white"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-700 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Dont have an account?{' '}
              <Link href="/Auth/SignUp" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}