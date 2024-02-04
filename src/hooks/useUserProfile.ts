import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'

interface ProfileResponse {
    id: string
    firstName: string
    lastName: string
    email: string
    birthDate: string
    address: {
        country: string
        state: string
        city: string
    }
    preferences: {
        theme: string
        language: string
    }
}

const useUserProfile = (token: string | null | undefined) => {
    const config = {
        headers: { Authorization: 'Bearer ' + token }
    }

    const query = useQuery<ProfileResponse, AxiosError>([`user_${token}`, token], async () => {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/profile`, config)
        return response.data
    }, {
        enabled: !!token,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000 * 24
    })

    return query
}

export default useUserProfile