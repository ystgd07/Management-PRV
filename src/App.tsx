import './App.css'
import OfflineAlert from './shared/ui/OfflineAlert'
import UpdatePrompt from './shared/ui/UpdatePrompt'

function App() {
  return (
    <>
      <OfflineAlert />
      <div className="bg-red-500">
        <h1 className="text-3xl font-bold underline">Hello World</h1>
      </div>
      <UpdatePrompt />
    </>
  )
}

export default App
