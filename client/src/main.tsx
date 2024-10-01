import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter as Router } from 'react-router-dom';
import { dark } from '@clerk/themes'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
    <Router>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" appearance={{
        baseTheme: dark,
      }}>
      <App />
      </ClerkProvider>
    </Router>
  </React.StrictMode>,
)