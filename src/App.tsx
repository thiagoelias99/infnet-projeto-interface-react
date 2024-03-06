import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/home-page'
import LoginPage from './Pages/login-page'
import Layout from './components/layout'

export default function App() {
    fetch(import.meta.env.VITE_SERVER_URL)

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                </Route>
                <Route path="*" element={<div>Not Found</div>} />
            </Routes>
        </BrowserRouter>
    )
}