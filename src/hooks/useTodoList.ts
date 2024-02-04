import { useMutation, useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'

interface TodoListResponse {
    count: number
    items: Todo[]
}

export interface Todo {
    id: string
    title: string
    completed: boolean
    description: string
}

export interface TodoCreate extends Omit<Todo, 'id'> { }

export interface TodoUpdate extends Partial<Todo> {
    id: string
}

const useTodoList = (token: string | null | undefined) => {
    const config = {
        headers: { Authorization: 'Bearer ' + token }
    }

    const { data: todoList, refetch } = useQuery<TodoListResponse, AxiosError>([`todos_${token}`, token], async () => {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/todos`, config)
        return response.data
    }, {
        enabled: !!token,
        refetchOnWindowFocus: true,
        refetchInterval: 5000
    })

    const { mutate: createTodo } = useMutation({
        mutationFn: async (todo: TodoCreate) => {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/todos`, todo, config)
            return response.data
        },
        onError: (error: AxiosError) => {
            console.error(error)
        },
        onSuccess: () => {
            refetch()
        }

    })

    const { mutate: updateTodo } = useMutation({
        mutationFn: async (todo: TodoUpdate) => {

            const normalizedTodo: TodoUpdate = {
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                description: todo.description
            }

            const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/todos`, normalizedTodo, config)
            return response.data
        },
        onError: (error: AxiosError) => {
            console.error(error)
        },
        onSuccess: () => {
            refetch()
        }
    })

    const { mutate: deleteTodo } = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/todos`, { ...config, data: { id } })
            return response.data
        },
        onError: (error: AxiosError) => {
            console.error(error)
        },
        onSuccess: () => {
            refetch()
        }
    })

    return { todoList, createTodo, updateTodo, deleteTodo }
}

export default useTodoList