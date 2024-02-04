import useToken from '@/hooks/useToken'
import useUserProfile from '@/hooks/useUserProfile'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2Icon } from 'lucide-react'
import logo from '../assets/logo.jpeg'
import useTodoList, { TodoUpdate } from '@/hooks/useTodoList'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export default function HomePage() {
    const { token } = useToken()
    const navigate = useNavigate()
    const { data: userData } = useUserProfile(token)
    const { todoList, updateTodo } = useTodoList(token)

    useEffect(() => {
        console.log('Token:', token)
        if (!token) {
            if (token === null) {
                navigate('/login')
            }
        }
    }), [token]

    function handleUpdateTodo(todo: TodoUpdate) {
        updateTodo({ ...todo, completed: !todo.completed })
    }

    return (
        <main className='w-screen h-screen flex flex-col items-start justify-start'>
            <div className='w-full h-[72px] bg-primary flex items-center justify-start px-4'>
                <img src={logo} alt="logo" className='h-[100%]' />
            </div>
            {!userData && (
                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <Loader2Icon className='w-10 h-10 animate-spin text-primary' />
                    <p className='italic font-semibold mt-2'>Carregando...</p>
                </div>
            )}
            {userData && (
                <div className='w-full p-4 flex flex-col'>
                    <p className='text-lg font-semibold'
                    >{`Olá ${userData.firstName} ${userData.lastName}`}</p>
                    <div className='w-full mt-4 border-2 border-primary rounded flex flex-col'>
                        <div className='w-full flex p-2 items-center justify-between bg-primary'>
                            <h2 className='text-primary-foreground font-semibold '>Meus To-Dos</h2>
                            <p className='text-primary-foreground font-semibold mr-4'>{todoList?.count || 0}</p>
                        </div>
                        {todoList?.count === 0 && (
                            <div className='p-2 w-full flex flex-col items-center justify-start'>
                                <p className='text-sm text-muted'>Hummm... Parece que você não possui nenhum To-Do.</p>
                                <Button
                                    variant='default'
                                    className='mt-4'
                                >Que tal cadastrar um</Button>
                            </div>
                        )}
                        <div className='p-2'>
                            {todoList?.items.map(todo => {
                                return (
                                    <div key={todo.id} className='w-full flex items-center justify-start gap-4'>
                                        <Checkbox
                                            checked={todo.completed}
                                            onCheckedChange={() => { handleUpdateTodo(todo) }}
                                            className='w-8 h-8' />
                                        <div className="w-full flex-1">
                                            <h3 className='font-semibold'>{todo.title}</h3>
                                            <p className='text-xs text-muted-foreground text-ellipsis'>{todo.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
