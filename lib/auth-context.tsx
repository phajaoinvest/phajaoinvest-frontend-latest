"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { ActionLogin, ActionSignUp } from "@/app/api/auth"
import { IRegisterCredentials } from "@/interfaces/auth"
import { queryData } from "@/app/api/api"
import { useCustomerStore } from "@/app/store/useCustomerStore"

interface User {
  id: string
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (data: IRegisterCredentials) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const setCustomer = useCustomerStore((state) => state.setCustomer);
  const clearCustomer = useCustomerStore((state) => state.clearCustomer);


  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (!email || !password) return false;
      const result = await ActionLogin({ email, password })
      if (result && result.status_code === 200) {
        // Set cookie for middleware with proper flags
        document.cookie = `accessToken=${result.data.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`; // 7 days
        localStorage.setItem("accessToken", result.data.access_token);
        const response = await queryData({
          url: `/customers/profile/me`,
        });
        if (response.status_code === 200) {
          const data = await response.data;
          console.log("Customer DATA::", data);
          setCustomer(data)
        }
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (data: IRegisterCredentials): Promise<boolean> => {
    try {
      const result = await ActionSignUp(data)
      if (result && result.status_code === 200) {
        return true
      }
      return false
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("customer")
    localStorage.removeItem("accessToken")
    // Clear the cookie with proper flags
    document.cookie = "accessToken=; path=/; max-age=0; SameSite=Lax";
    clearCustomer()
    // Use window.location for full page reload to ensure middleware picks up the change
    window.location.href = "/"
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
