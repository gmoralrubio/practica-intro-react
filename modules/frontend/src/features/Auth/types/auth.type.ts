import type { User } from '@features/Auth/types/user.type'

export interface AuthState {
	user: User | null
	isLoading: boolean
	error: string | null
}

export interface AuthContextType {
	user: User | null
	isAuthenticated: boolean
	isLoading: boolean
	error: string | null
	login: (email: string, password: string) => Promise<void>
	logout: () => void
	checkAuth: () => Promise<void>
}

export interface AccessToken {
	accessToken: string
}
