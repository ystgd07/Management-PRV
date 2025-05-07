import ItemTimeLine from "./tab1/ItemTimeLine";
import ItemDetail from "./tab2/ItemDetail";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { GetApplicationsResponse } from "@/entities/apply/model";

export default function ItemInfo({
  applications,
}: {
  applications: GetApplicationsResponse | undefined;
}) {
  const [activeTab, setActiveTab] = useState<string>("timeline");

  return (
    <Tabs defaultValue='timeline' className='w-full'>
      <TabsList className='grid grid-cols-2 w-full gap-2'>
        <TabsTrigger
          value='timeline'
          className={`bg-muted rounded-xl p-1 cursor-pointer hover:bg-muted-foreground hover:text-white transition-all duration-300 ${
            activeTab === "timeline" ? "bg-muted-foreground text-white" : ""
          }`}
          onClick={() => setActiveTab("timeline")}
        >
          타임라인
        </TabsTrigger>
        <TabsTrigger
          value='detail'
          className={`bg-muted rounded-xl p-1 cursor-pointer hover:bg-muted-foreground hover:text-white transition-all duration-300 ${
            activeTab === "detail" ? "bg-muted-foreground text-white" : ""
          }`}
          onClick={() => setActiveTab("detail")}
        >
          상세 정보
        </TabsTrigger>
      </TabsList>
      <TabsContent value='timeline' className='mt-4 space-y-6'>
        <ItemTimeLine applications={applications}></ItemTimeLine>
      </TabsContent>
      <TabsContent value='detail' className='mt-4 space-y-6'>
        <ItemDetail applications={applications}></ItemDetail>
      </TabsContent>
    </Tabs>
  );
}
