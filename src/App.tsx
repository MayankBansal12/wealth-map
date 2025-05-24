import { ThemeProvider } from './components/theme-provider'
import appRouter from './router/AppRouter'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from 'sonner'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={appRouter} />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
