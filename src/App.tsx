import { ThemeToggle } from './components/theme-toggle'

function App() {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <ThemeToggle />
      <h1 className="font-medium">Hello world</h1>
      <p className="">this is admin panel</p>
    </div>
  )
}

export default App
