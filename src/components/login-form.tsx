import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { z } from '../lib/pt-zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { useToast } from './ui/use-toast'
import { Loader2Icon } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
    const formSchema = z.object({
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, 'A senha deve conter no mínimo 6 dígitos sendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'),
        email: z.string().email(),
    })

    const [keepConnected, setKeepConnected] = useState(false)

    const { toast } = useToast()
    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => {
            return axios.post<{ accessToken: string }>(`${import.meta.env.VITE_SERVER_URL}/login`, values)
                .then(response => response.data)
        },
        onSuccess: (data) => {
            const token = data.accessToken

            if (keepConnected) {
                localStorage.setItem('token', token)
            } else {
                sessionStorage.setItem('token', token)
                localStorage.removeItem('token')
            }

            toast({
                variant: 'default',
                title: 'Login realizado com sucesso!',
            })

            navigate('/')
        },
        onError: (error) => {
            localStorage.removeItem('token')
            console.log(error)
            if (error instanceof AxiosError) {
                if (error.response?.data.message === 'Email or password invalid') {
                    toast({
                        variant: 'destructive',
                        title: 'Email ou senha inválidos!',
                    })
                } else if (error.message === 'Network Error') {
                    toast({
                        variant: 'destructive',
                        title: 'Erro ao conectar no servidor!',
                    })
                } else if (error.response?.status === 500) {
                    toast({
                        variant: 'destructive',
                        title: 'Erro interno no servidor!',
                    })
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Erro ao realizar login!',
                    })
                }
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Erro ao realizar login!',
                })
            }
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values)
    }

    return (
        <Card className='mt-8 w-[80%]'>
            <CardContent>
                <CardHeader className='px-0'>
                    <CardTitle className='text-left text-xl w-full'>Entre para utilizar</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite seu email..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Digite sua senha..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-end space-x-2">
                            <Checkbox id="terms" checked={keepConnected} onCheckedChange={(() => setKeepConnected(!keepConnected))} />
                            <label
                                htmlFor="terms"
                                className="text-xs font-medium cursor-pointer text-gray-500 hover:text-gray-700"
                            >
                                Permanecer conectado?
                            </label>
                        </div>
                        <div className="pt-4"></div>
                        <Button
                            type="submit"
                            variant='default'
                            className='w-full mt-6 flex justify-center items-center gap-4'
                            disabled={isLoading}
                        >
                            <Loader2Icon className={`w-6 h-6 animate-spin ${isLoading ? 'block' : 'hidden'}`} />
                            Entrar</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
