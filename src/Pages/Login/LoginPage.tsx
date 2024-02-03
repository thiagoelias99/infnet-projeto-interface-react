import logo from '../../assets/Logo.jpeg'
import LoginForm from './login-form'

export default function LoginPage() {
    return (
        <main className='w-screen h-screen flex flex-col'>
            <div className='w-full h-[30%] bg-primary flex items-center justify-center'>
                <img src={logo} alt="logo" className='h-[80%]' />
            </div>
            <div className='w-full flex-1 bg-background flex flex-col items-center justify-start'>
                <LoginForm />
                <p className='text-base mt-4'>Não possui conta? <span className='text-lg font-bold text-primary underline'>Cadastre!</span>
                </p>
            </div>
        </main>
    )
}
