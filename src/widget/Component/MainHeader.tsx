import { User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/JobSync_logo.png";

export default function MainHeader() {
  return (
    <header className='flex sticky top-0 z-10 border-b bg-background px-4 py-3 items-center justify-center'>
      <div className='flex items-center'>
        <img src={logo} alt='JobSync Logo' className='h-17 w-auto mr-2' />
      </div>

      {/* <div className='flex items-center space-x-1'>
          <Button variant='ghost' size='icon' className='h-9 w-9'>
            <Search className='h-5 w-5 text-foreground' />
          </Button>
          <Button variant='ghost' size='icon' className='h-9 w-9'>
            <User className='h-5 w-5 text-foreground' />
          </Button>
        </div> */}
    </header>
  );
}
