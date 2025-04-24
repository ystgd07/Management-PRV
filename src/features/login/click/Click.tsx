import { Button } from "@/components/ui/button";
import GoogleIcon from "@/shared/ui/GoogleIcon";
import { useGoogleLogin } from "../hook/HandleGoogleLogin";
import { useEffect } from "react";

export default function Click() {
  const { isLoading, error, handleGoogleLogin } = useGoogleLogin();

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <Button
      variant='outline'
      className='w-full flex items-center gap-2 justify-center h-12 text-base cursor-pointer'
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      <GoogleIcon className='h-5 w-5' />
      <span>{isLoading ? "처리 중..." : "Google로 계속하기"}</span>
    </Button>
  );
}
