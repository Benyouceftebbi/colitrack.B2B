"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Link, useRouter } from "@/i18n/routing"
import { useAuth } from "../../../context/AuthContext"
import { useTranslations } from "next-intl"
import { LoadingButton } from "@/components/ui/LoadingButton"
import { toast } from "@/hooks/use-toast"
import { useEffect } from "react"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/firebase/firebase"

export default function SignIn() {
  const t = useTranslations("signin")
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isRemembered, setIsRemembered] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const logged = await login(email, password, isRemembered)

      if (logged === true) {
        router.push("/Dashboard")
      } else {
        setError(true)
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login Error:", error)
      setError(true)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth,email)
      setIsModalOpen(true)
    } catch (error) {
      console.error("Password Reset Error:", error)
      toast({
        title: "Error",
        description: "An error occurred while sending the password reset email.",
        variant: "destructive",
      })
    }
  }

  const inputClassName = (hasError: boolean) => `
    w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border rounded-xl
    focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400
    text-gray-900 dark:text-white
    ${hasError ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-700"}
  `

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50/30 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
            {t("backToHome")}
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Colitrack</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t("welcomeBack")}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{t("signInToContinue")}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("emailAddress")}
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${error ? "text-red-500 dark:text-red-400" : "text-gray-400"}`}
                  />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    className={inputClassName(error)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("password")}
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${error ? "text-red-500 dark:text-red-400" : "text-gray-400"}`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClassName(error)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-700 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    checked={isRemembered}
                    onChange={() => setIsRemembered(!isRemembered)}
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    {t("rememberMe")}
                  </label>
                </div>
                <button
                type='button'
                  onClick={handleForgotPassword}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  {t("forgotPassword")}
                </button>
              </div>

              <LoadingButton
                loading={loading}
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t("signIn")}
              </LoadingButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                {t("dontHaveAccount")}{" "}
                <Link
                  href="/Auth/SignUp"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                >
                  {t("signUp")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-bold">{t("checkYourEmail")}</h2>
            <p>{t("checkSpam")}</p>
            <button onClick={() => setIsModalOpen(false)} className="mt-4 bg-indigo-600 text-white rounded px-4 py-2">
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
