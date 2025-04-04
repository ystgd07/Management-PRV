import OfflineAlert from "./shared/ui/OfflineAlert";
import UpdatePrompt from "./shared/ui/UpdatePrompt";
import LoginPage from "./pages/login/page";

function App() {
  return (
    <div className='mx-auto max-w-[420px] flex flex-col min-h-screen bg-background'>
      <OfflineAlert />
      <LoginPage />
      <UpdatePrompt />
    </div>
  );
}

export default App;
