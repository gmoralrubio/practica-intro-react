import { authRepository } from '@features/Auth/services/authRepository'
import type { User } from '@features/Auth/types/user.type'
import { useState } from 'react'

interface UseAuthReturn {
	user: User | null
	isLoading: boolean
	error: Error | null
	login: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	const login = async (email: string, password: string) => {
		setIsLoading(true)
		setError(null)

		try {
			const token = await authRepository.loginUser(email, password)
			localStorage.setItem('accessToken', token.accessToken)

			const userPayload = await authRepository.getUserInfo(
				token.accessToken
			)

			setUser({
				id: userPayload.id,
				username: userPayload.username,
			})
		} catch (err) {
			const error = err instanceof Error ? err : new Error('Login failed')

			setError(error)
			setUser(null)
			localStorage.removeItem('accessToken')
		}
		setIsLoading(false)
	}

	const logout = async () => {
		setIsLoading(true)
		setUser(null)
		localStorage.removeItem('accessToken')
		setIsLoading(false)
		setError(null)
	}

	return {
		user,
		isLoading,
		error,
		login,
		logout,
	}
}
