import JobSyncLogo from "@/assets/JobSync_logo.png";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Login from "@/features/login";

export default function LoginPage() {
  return (
    <div className='flex flex-col min-h-screen bg-background'>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className='flex-1 p-6 flex items-center justify-center'>
        <div className='max-w-md w-full mx-auto space-y-8'>
          <div className='text-center space-y-6'>
            <img
              src={JobSyncLogo}
              alt='JobSync Logo'
              className='h-20 mx-auto'
            />
            <h1 className='text-2xl font-bold'>
              JobSync에 오신 것을 환영합니다
            </h1>
            <p className='text-muted-foreground'>
              소셜 계정으로 간편하게 로그인하세요
            </p>
          </div>
          <Login />
          <div className='text-center text-sm text-muted-foreground'>
            <p>
              계속 진행하면 JobSync의{" "}
              <a href='/terms' className='text-primary hover:underline'>
                이용약관
              </a>{" "}
              및{" "}
              <a href='/privacy' className='text-primary hover:underline'>
                개인정보 처리방침
              </a>
              에 동의하게 됩니다.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
