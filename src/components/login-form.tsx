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

export default function LoginForm() {
    const formSchema = z.object({
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, 'A senha deve conter no mínimo 6 dígitos sendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'),
        email: z.string().email(),
    })

    const mutation = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => {
            return axios.post<{ accessToken: string }>('http://localhost:3000/login', values)
                .then(response => response.data)
        },
        onSuccess: (data) => {
            const token = data.accessToken
            localStorage.setItem('token', token)
            alert('Logado com sucesso')
        },
        onError: (error) => {
            localStorage.removeItem('token')
            console.log(error)
            if (error instanceof AxiosError) {
                if (error.response?.data.message === 'Email or password invalid') {
                    alert('Email ou senha inválidos')
                }
            }
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate(values)
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
                        <div className="mt-8"></div>
                        <Button
                            type="submit"
                            variant='default'
                            className='w-full mt-4'
                        >Entrar</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
