import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import JobSyncLogo from "@/assets/JobSync_logo.png";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='flex flex-col min-h-screen bg-background'>
      {/* Header */}
      <header className='sticky top-0 z-10 border-b bg-background p-4 flex items-center justify-center'>
        <div className='flex items-center gap-2'>
          <h1 className='text-lg font-bold'>JobSync</h1>
        </div>
      </header>

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
          {/* Feature 구현 후, 클릭 메서드 추가 */}
          <div className='space-y-4'>
            <Button
              variant='outline'
              className='w-full flex items-center gap-2 justify-center h-12 text-base cursor-pointer'
              //   onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <GoogleIcon className='h-5 w-5' />
              <span>Google로 계속하기</span>
            </Button>
          </div>

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
      <footer className='p-6 text-center text-sm text-muted-foreground'>
        <p>© 2025 JobSync. All rights reserved.</p>
      </footer>
    </div>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <path
        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
        fill='#4285F4'
      />
      <path
        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
        fill='#34A853'
      />
      <path
        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
        fill='#FBBC05'
      />
      <path
        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
        fill='#EA4335'
      />
      <path d='M1 1h22v22H1z' fill='none' />
    </svg>
  );
}
