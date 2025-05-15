import { ThemeProvider } from './components/theme-provider'
import appRouter from './router/AppRouter'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  )
}

export default App
