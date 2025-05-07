import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className='sticky top-0 z-10 border-b bg-background p-4 flex items-center'>
      <Link to='/' className='mr-2'>
        <Button variant='ghost' size='icon'>
          <ArrowLeft className='h-5 w-5' />
          <span className='sr-only'>뒤로 가기</span>
        </Button>
      </Link>
      <h1 className='text-lg font-bold'>지원 히스토리</h1>
    </header>
  );
}
