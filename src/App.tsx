import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'
import appRouter from './router/AppRouter'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <RouterProvider router={appRouter} />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
