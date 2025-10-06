"use client"

import { useState } from "react"
import { apiRequest } from "./api"
import { endpoints } from "./endpoints"

// ----- Login Hook -----
export function useLogin() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = async (email: string, password: string) => {
        setLoading(true)
        setError(null)
        try {
            const data = await apiRequest<{ user: any; token: string }>(endpoints.auth.login, {
                method: "POST",
                body: { email, password },
            })
            return data
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { login, loading, error }
}

// ----- Signup Hook -----
export function useSignup() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const signup = async (name: string, email: string, password: string, role: string) => {
        setLoading(true)
        setError(null)
        try {
            const data = await apiRequest<{
                token: any, user: any
            }>(endpoints.auth.signup, {
                method: "POST",
                body: { name, email, password, role },
            })
            return data
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { signup, loading, error }
}

// ----- Get Profile Hook -----
export function useProfile() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getProfile = async (token: string) => {
        setLoading(true)
        setError(null)
        try {
            const data = await apiRequest<{ user: any }>(endpoints.user.profile, { token })
            return data
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async (token: string, body: any) => {
        setLoading(true)
        setError(null)
        try {
            const data = await apiRequest<{ user: any }>(endpoints.user.updateProfile, {
                method: "PUT",
                token,
                body,
            })
            return data
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { getProfile, updateProfile, loading, error }
}
