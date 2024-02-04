import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './services/web-client/query-client.ts'
import { Toaster } from './components/ui/toaster.tsx'
import App from './app.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            <Toaster />
        </QueryClientProvider>
    </React.StrictMode>,
)
