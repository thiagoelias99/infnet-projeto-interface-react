import { useMutation, useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'

interface TodoListResponse {
    count: number
    items: Todo[]
}

interface Todo {
    id: string
    title: string
    completed: boolean
    description: string
}

interface TodoCreate extends Omit<Todo, 'id'> { }

interface TodoUpdate extends Partial<Todo> {
    id: string
}

const useTodoList = (token: string | null | undefined) => {
    const config = {
        headers: { Authorization: 'Bearer ' + token }
    }

    const { data: todoList } = useQuery<TodoListResponse, AxiosError>([`user_${token}`, token], async () => {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/todos`, config)
        return response.data
    }, {
        enabled: !!token,
        refetchOnWindowFocus: true,
        staleTime: 60 * 1000
    })

    const { mutate: createTodo } = useMutation({
        mutationFn: async (todo: TodoCreate) => {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/todos`, todo, config)
            return response.data
        },
        onError: (error: AxiosError) => {
            console.error(error)
        }

    })

    const { mutate: updateTodo } = useMutation({
        mutationFn: async (todo: TodoUpdate) => {
            const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/todos`, todo, config)
            return response.data
        },
        onError: (error: AxiosError) => {
            console.error(error)
        }
    })

    const { mutate: deleteTodo } = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/todos`, { ...config, data: { id } })
            return response.data
        },
        onError: (error: AxiosError) => {
            console.error(error)
        }
    })

    return { todoList, createTodo, updateTodo, deleteTodo }
}

export default useTodoList