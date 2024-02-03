import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { z } from '../lib/pt-zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DateInput } from '@/components/ui/date-input'
import { ComboboxForm } from '@/components/ui/combobox-form'
import brasilStates from '@/data/estados-brasil'
import { PasswordInput } from '@/components/ui/password-input'
import { useEffect } from 'react'
import useBrazilState from '@/hooks/useCity.ts'
import { isBefore } from 'date-fns'

export default function SignUpForm() {
    const statesOptions = brasilStates.map((state) => ({
        label: state.nome,
        value: state.sigla,
    })).sort((a, b) => a.label.localeCompare(b.label))

    const formSchema = z.object({
        email: z.string().email(),
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(50),
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, 'A senha deve conter no mínimo 6 dígitos sendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'),
        confirmPassword: z.string(),
        birthDate: z.string().transform((data) => new Date(data)).refine((data) => {
            return data instanceof Date && isBefore(data, new Date())
        }, 'Data deve ser anterior a data atual').transform((data) => data.toISOString()),
        country: z.string().min(2).max(50).default('Brasil'),
        state: z.string().min(2).max(50),
        city: z.string().min(2).max(50),
        language: z.string().min(2).max(50).default('pt-br'),
        theme: z.string().min(2).max(50).default('default')
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        alert(JSON.stringify(values, null, 2))
    }

    const { data: cities, refetch } = useBrazilState(form.getValues().state)

    useEffect(() => {
        refetch()
    }, [form.watch().state])

    useEffect(() => {
        if (form.getValues().password === form.getValues().confirmPassword) {
            form.clearErrors('confirmPassword')
        } else {
            form.setError('confirmPassword', {
                type: 'manual',
                message: 'As senhas não coincidem',
            })
        }
    }, [form.watch().password, form.watch().confirmPassword])

    return (
        <Card className='mt-8 w-[80%]'>
            <CardContent>
                <CardHeader className='px-0'>
                    <CardTitle className='text-left text-xl w-full'>Cadastre para utilizar</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sobrenome</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='col-span-2'>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
                                        <PasswordInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Repita a senha</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem className='col-span-2'>
                                    <FormLabel>Data Nascimento</FormLabel>
                                    <FormControl>
                                        <DateInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <ComboboxForm
                            form={form}
                            label='Estado'
                            fieldName='state'
                            options={statesOptions}
                        />
                        <ComboboxForm
                            form={form}
                            label='Cidade'
                            fieldName='city'
                            options={cities?.map(city => ({ label: city.nome, value: city.id.toString() })) || []}
                        />
                        <Button
                            type="submit"
                            variant='default'
                            className='w-full mt-4 col-span-2'
                        >Cadastrar</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
