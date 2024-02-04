import { useEffect, useState } from 'react'

const useToken = () => {
    const [token, setToken] = useState<string | null | undefined>()

    useEffect(() => {
        setToken(localStorage.getItem('token') || sessionStorage.getItem('token') || null)
    }, [])

    return { token, setToken }
}

export default useToken