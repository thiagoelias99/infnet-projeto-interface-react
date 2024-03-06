import { Outlet, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { LogOutIcon } from 'lucide-react'
import useToken from '@/hooks/useToken'
import { useEffect } from 'react'
import useUserProfile from '@/hooks/useUserProfile'
import logo from '../assets/logo.jpeg'

export default function Layout() {
    const { token, setToken } = useToken()
    const { isError } = useUserProfile(token)
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            if (token === null) {
                navigate('/login')
            }
        }
        if (isError) {
            handleLogout()
        }
    }), [token, isError]

    function handleLogout() {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        setToken(null)
    }

    return (
        <main>
            <div className='w-full h-[72px] bg-primary px-4'>
                <div className='w-full sm:max-w-[720px] sm:mx-auto h-full bg-primary flex items-center justify-between'>
                    <img src={logo} alt="logo" className='h-[100%]' />
                    <Button size='icon'
                        onClick={handleLogout}
                    >
                        <LogOutIcon className='text-white' />
                    </Button>
                </div>
            </div>
            <Outlet />
        </main>
    )
}
