import type { AccessToken } from '@features/Auth/types/auth.type'
import type { User } from '@features/Auth/types/user.type'

const API_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL
export const authRepository = {
	loginUser: async (
		email: string,
		password: string
	): Promise<AccessToken> => {
		const API_URL = `${API_BASE_URL}/login`

		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				username: email,
				password,
			}),
		})

		if (!response.ok) {
			throw new Error('Login failed. Please check your credentials.')
		}

		const token: AccessToken = await response.json()
		return token
	},

	getUserInfo: async (token: string): Promise<User> => {
		const API_URL = `${API_BASE_URL}/me`

		if (!token) {
			throw new Error('Invalid token or not found')
		}

		const response = await fetch(API_URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error('Error getting user info')
		}
		const user = await response.json()
		return user
	},
}
