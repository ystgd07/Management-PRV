import ItemTimeLine from "./tab1/ItemTimeLine";
import ItemDetail from "./tab2/ItemDetail";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@radix-ui/react-tabs";
import { Dispatch, SetStateAction, useState } from "react";

// 샘플 데이터 타입 정의
interface StatusHistoryItem {
  status: string;
  date: string;
  note: string;
}

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  status: string;
  appliedDate: string;
  nextStep?: string;
  nextDate?: string | null;
  statusHistory: StatusHistoryItem[];
}

export default function ItemInfo({
  selectedApp,
  expandedStatus,
  editingNote,
  setEditingNote,
  noteText,
  setNoteText,
  saveNote,
  cancelEditing,
  setExpandedStatus,
}: {
  selectedApp: Application;
  expandedStatus: string | null;
  editingNote: { appId: number; index: number } | null;
  setEditingNote: Dispatch<
    SetStateAction<{ appId: number; index: number } | null>
  >;
  noteText: string;
  setNoteText: Dispatch<SetStateAction<string>>;
  saveNote: () => void;
  cancelEditing: () => void;
  setExpandedStatus: Dispatch<SetStateAction<string | null>>;
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
        <ItemTimeLine
          selectedApp={selectedApp}
          expandedStatus={expandedStatus}
          editingNote={editingNote}
          setEditingNote={setEditingNote}
          noteText={noteText}
          setNoteText={setNoteText}
          saveNote={saveNote}
          cancelEditing={cancelEditing}
          setExpandedStatus={setExpandedStatus}
        ></ItemTimeLine>
      </TabsContent>
      <TabsContent value='detail' className='mt-4 space-y-6'>
        <ItemDetail selectedApp={selectedApp}></ItemDetail>
      </TabsContent>
    </Tabs>
  );
}
