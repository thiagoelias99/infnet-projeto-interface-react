import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginPage from './Pages/Login/LoginPage.tsx'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './services/web-client/query-client.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <LoginPage />
        </QueryClientProvider>
    </React.StrictMode>,
)
