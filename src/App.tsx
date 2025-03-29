import OfflineAlert from "./shared/ui/OfflineAlert";
import UpdatePrompt from "./shared/ui/UpdatePrompt";
import Main from "./pages/main/Main";

function App() {
  return (
    <div className='mx-auto max-w-[420px] flex flex-col min-h-screen bg-background'>
      <OfflineAlert />
      <Main />
      <UpdatePrompt />
    </div>
  );
}

export default App;
