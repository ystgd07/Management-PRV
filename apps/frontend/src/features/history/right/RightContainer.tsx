import Title from "./Title";
import ItemInfo from "./ItemInfo";
import { SetStateAction } from "react";
import { Dispatch } from "react";
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

export default function RightContainer({
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
  return (
    <div className='space-y-6'>
      <Title selectedApp={selectedApp} />
      <ItemInfo
        selectedApp={selectedApp}
        expandedStatus={expandedStatus}
        editingNote={editingNote}
        setEditingNote={setEditingNote}
        noteText={noteText}
        setNoteText={setNoteText}
        saveNote={saveNote}
        cancelEditing={cancelEditing}
        setExpandedStatus={setExpandedStatus}
      />
    </div>
  );
}
