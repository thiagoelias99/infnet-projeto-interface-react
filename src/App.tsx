import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/home-page'
import LoginPage from './Pages/login-page'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path="*" element={<div>Not Found</div>} />
            </Routes>
        </BrowserRouter>
    )
}