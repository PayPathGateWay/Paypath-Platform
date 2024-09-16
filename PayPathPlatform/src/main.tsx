import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { AuthProvider } from './Context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <App />
    </AuthProvider>
)
