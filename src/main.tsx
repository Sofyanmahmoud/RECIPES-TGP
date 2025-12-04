import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 
import { AuthProvider } from './context/AuthContext' 
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

createRoot(rootElement).render(
    <BrowserRouter> 
      <AuthProvider> 
        <App />
      </AuthProvider>
    </BrowserRouter>
)