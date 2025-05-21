import { useEffect, useState } from "react";
import { useGoogleLogin } from "@/features/login/hook/HandleGoogleLogin";
import { Spinner } from "@/components/ui/spinner";

export default function AuthCallback() {
  const { handleOAuthCallback, isLoading, error } = useGoogleLogin();
  const [localError, setLocalError] = useState<string | null>(null);
  const [callbackState, setCallbackState] = useState<string | null>("pending");

  useEffect(() => {
    const processAuth = async () => {
      setCallbackState("pending");
      try {
        const result = await handleOAuthCallback();
        setCallbackState("success");
      } catch (err: unknown) {
        setLocalError(
          err instanceof Error
            ? err.message
            : "인증 과정에서 오류가 발생했습니다."
        );
        setCallbackState("error");
      }
    };
    processAuth();
  }, [handleOAuthCallback]);

  if (callbackState === "pending") {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen p-4'>
        <Spinner size='lg' />
        <p className='mt-4 text-muted-foreground'>로그인 처리 중입니다...</p>
      </div>
    );
  }

  if (callbackState === "error") {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen p-4'>
        <div className='mb-4 text-destructive'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <h1 className='text-xl font-bold mb-2'>인증 오류</h1>
        <p className='text-center text-muted-foreground'>
          {error || localError}
        </p>
        <button
          className='mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md'
          onClick={() => (window.location.href = "/")}
        >
          로그인 페이지로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Spinner size='lg' />
      <p className='mt-4 text-muted-foreground'>로그인 처리 중입니다...</p>
    </div>
  );
}
