import { api } from '@/lib/api'

const getToken = async ({ code }: { code: string }) => {
    const response = await api.post('/auth/token', { code })
    return response.data.token
}

export const AuthService = {
    getToken
}