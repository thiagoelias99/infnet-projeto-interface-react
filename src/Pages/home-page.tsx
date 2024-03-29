import useToken from '@/hooks/useToken'
import useUserProfile from '@/hooks/useUserProfile'
import { useEffect, useState } from 'react'
import { Loader2Icon, PlusIcon, Trash2Icon } from 'lucide-react'
import useTodoList, { Todo, TodoCreate, TodoUpdate } from '@/hooks/useTodoList'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CreateTodoDialog } from '@/components/create-todo-dialog'
import { DeleteTodoDialog } from '@/components/delete-todo-dialog'

export default function HomePage() {
    const [showDialog, setShowDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showCompleted, setShowCompleted] = useState(true)
    const [todo, setTodo] = useState<Todo | null>(null)
    const [todoToShow, setTodoToShow] = useState<Todo[] | null>(null)
    const { token } = useToken()
    // const navigate = useNavigate()
    const { data: userData } = useUserProfile(token)
    const { todoList, updateTodo, createTodo, deleteTodo } = useTodoList(token)

    // useEffect(() => {
    //     if (!token) {
    //         if (token === null) {
    //             navigate('/login')
    //         }
    //     }
    //     if (isError) {
    //         handleLogout()
    //     }
    // }), [token, isError]

    useEffect(() => {
        if (showCompleted) {
            setTodoToShow(todoList?.items || [])
        } else {
            setTodoToShow(todoList?.items.filter(todo => !todo.completed) || [])
        }
    }, [showCompleted, todoList])

    function handleUpdateTodo(todo: TodoUpdate) {
        updateTodo({ ...todo, completed: !todo.completed })
    }

    function handleCreateTodo(todo: TodoCreate) {
        createTodo(todo)
    }

    function handleDeleteButton(todo: Todo) {
        setTodo(todo)
        setShowDeleteDialog(true)
    }

    function handleDeleteTodo(id: string) {
        deleteTodo(id)
    }

    // function handleLogout() {
    //     localStorage.removeItem('token')
    //     sessionStorage.removeItem('token')
    //     setToken(null)
    // }

    return (
        <main className='w-screen h-screen flex flex-col items-start justify-start'>
            {/* <div className='w-full h-[72px] bg-primary px-4'>
                <div className='w-full sm:max-w-[720px] sm:mx-auto h-full bg-primary flex items-center justify-between'>
                    <img src={logo} alt="logo" className='h-[100%]' />
                    <Button size='icon'
                        onClick={handleLogout}
                    >
                        <LogOutIcon className='text-white' />
                    </Button>
                </div>
            </div> */}
            {!userData && (
                <div className='w-full sm:max-w-[720px] sm:mx-auto h-full flex flex-col items-center justify-center'>
                    <Loader2Icon className='w-10 h-10 animate-spin text-primary' />
                    <p className='italic font-semibold mt-2'>Carregando...</p>
                </div>
            )}
            {userData && (
                <div className='w-full sm:max-w-[720px] sm:mx-auto p-4 flex flex-col'>
                    <p className='text-lg font-semibold'
                    >{`Olá ${userData.firstName} ${userData.lastName}`}</p>
                    <div className="flex items-center space-x-2 self-end">
                        <Checkbox
                            id="showCompleted"
                            checked={showCompleted}
                            onCheckedChange={() => setShowCompleted(!showCompleted)}
                        />
                        <label
                            htmlFor="showCompleted"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Mostrar concluídos?
                        </label>
                    </div>
                    <div className='w-full mt-1 border-2 border-primary rounded flex flex-col'>
                        <div className='w-full flex p-2 items-center justify-between bg-primary'>
                            <h2 className='text-primary-foreground font-semibold '>{`Meus To-Dos (${todoToShow?.length || 0})`}</h2>
                            <PlusIcon
                                onClick={() => setShowDialog(true)}
                                className='text-primary-foreground mx-1 cursor-pointer'
                            />
                        </div>
                        {todoList?.count === 0 && (
                            <div className='p-2 w-full flex flex-col items-center justify-start'>
                                <p className='text-sm text-muted'>Hummm... Parece que você não possui nenhum To-Do.</p>
                                <Button
                                    variant='default'
                                    className='mt-4'
                                    onClick={() => setShowDialog(true)}
                                >Que tal cadastrar um</Button>
                            </div>
                        )}
                        <div className='px-2 py-4 w-full flex flex-col gap-4'>
                            {todoToShow?.map(todo => {
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
                                        <Trash2Icon
                                            size={20}
                                            className='text-destructive cursor-pointer'
                                            onClick={() => handleDeleteButton(todo)}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
            <CreateTodoDialog
                open={showDialog}
                onOpenChange={() => setShowDialog(!showDialog)}
                createFunction={handleCreateTodo}
            />
            <DeleteTodoDialog
                open={showDeleteDialog}
                onOpenChange={() => setShowDeleteDialog(!showDeleteDialog)}
                deleteFunction={handleDeleteTodo}
                todo={todo}
            />
        </main>
    )
}
