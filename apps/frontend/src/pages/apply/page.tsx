import { TabsContent } from "@/components/ui/tabs";
import ApplyHeader from "./component/Header";
import ItemList from "@/features/apply/ItemList";
export default function ApplyPage() {
  return (
    <TabsContent value='applications' className='p-4 space-y-4'>
      <ApplyHeader />
      <ItemList />
    </TabsContent>
  );
}
