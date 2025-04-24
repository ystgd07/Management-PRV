import { Button } from "@/components/ui/button";
import { Calendar, Heart, Search, Briefcase } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottonNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <nav className='sticky bottom-0 border-t bg-background p-2'>
      <div className='grid grid-cols-4 gap-1'>
        <Button
          variant={activeTab === "search" ? "default" : "ghost"}
          className='flex flex-col h-16 rounded-md'
          onClick={() => setActiveTab("search")}
        >
          <Search className='h-5 w-5' />
          <span className='text-xs mt-1'>검색</span>
        </Button>
        <Button
          variant={activeTab === "saved" ? "default" : "ghost"}
          className='flex flex-col h-16 rounded-md'
          onClick={() => setActiveTab("saved")}
        >
          <Heart className='h-5 w-5' />
          <span className='text-xs mt-1'>관심</span>
        </Button>
        <Button
          variant={activeTab === "applications" ? "default" : "ghost"}
          className='flex flex-col h-16 rounded-md'
          onClick={() => setActiveTab("applications")}
        >
          <Briefcase className='h-5 w-5' />
          <span className='text-xs mt-1'>지원</span>
        </Button>
        <Button
          variant={activeTab === "interviews" ? "default" : "ghost"}
          className='flex flex-col h-16 rounded-md'
          onClick={() => setActiveTab("interviews")}
        >
          <Calendar className='h-5 w-5' />
          <span className='text-xs mt-1'>면접</span>
        </Button>
      </div>
    </nav>
  );
}
