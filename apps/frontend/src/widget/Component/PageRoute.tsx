import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PageRoute() {
  return (
    <>
      <TabsList className='grid grid-cols-3 w-full'>
        <TabsTrigger value='search'>검색</TabsTrigger>
        <TabsTrigger value='saved'>관심</TabsTrigger>
        <TabsTrigger value='applications'>지원</TabsTrigger>
      </TabsList>
    </>
  );
}
