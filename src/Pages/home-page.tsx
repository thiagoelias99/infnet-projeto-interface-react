import useToken from '@/hooks/useToken'
import useUserProfile from '@/hooks/useUserProfile'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2Icon } from 'lucide-react'
import logo from '../assets/logo.jpeg'
import useTodoList from '@/hooks/useTodoList'

export default function HomePage() {
    const { token } = useToken()
    const navigate = useNavigate()
    const { data: userData } = useUserProfile(token)
    const { todoList } = useTodoList(token)

    useEffect(() => {
        console.log('Token:', token)
        if (!token) {
            if (token === null) {
                navigate('/login')
            }
        }
    }), [token]

    return (
        <main className='w-screen h-screen flex flex-col items-start justify-start'>
            <div className='w-full h-[72px] bg-primary flex items-center justify-start px-2'>
                <img src={logo} alt="logo" className='h-[100%]' />
            </div>
            {!userData && (
                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <Loader2Icon className='w-10 h-10 animate-spin text-primary' />
                    <p className='italic font-semibold mt-2'>Carregando...</p>
                </div>
            )}
            {userData && (
                <div>
                    
                </div>
            )}
        </main>
    )
}
