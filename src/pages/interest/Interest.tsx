import { TabsContent } from "@/components/ui/tabs";
import InterestList from "@/features/interest/List";

export default function Interest({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <TabsContent value='saved' className='p-4 space-y-4'>
      <h2 className='text-lg font-semibold'>관심 공고</h2>
      <InterestList activeTab={activeTab} setActiveTab={setActiveTab} />
    </TabsContent>
  );
}
