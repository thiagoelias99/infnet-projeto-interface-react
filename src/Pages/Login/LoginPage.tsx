import { useState } from 'react'
import logo from '../../assets/Logo.jpeg'
import LoginForm from '../../components/login-form'
import SignUpForm from '../../components/signup-form'

export default function LoginPage() {
    const [showSignUp, setShowSignUp] = useState(false)

    return (
        <main className='w-screen h-screen flex flex-col'>
            <div className={`w-full ${showSignUp ? 'h-[64px]' : 'h-[30%]'} bg-primary flex items-center justify-center`}>
                <img src={logo} alt="logo" className={showSignUp ? 'h-[100%]' : 'h-[80%]'} />
            </div>
            <div className='w-full flex-1 bg-background flex flex-col items-center justify-start'>
                {showSignUp ? <SignUpForm /> : <LoginForm />}
                <p className='text-base my-4'>{showSignUp ? 'Já possui conta?' : 'Não possui conta?'} <span
                    className='text-lg font-bold text-primary underline cursor-pointer'
                    onClick={() => setShowSignUp(!showSignUp)}
                >{showSignUp ? 'Entre' : 'Cadastre'}</span>
                </p>
            </div>
        </main>
    )
}
