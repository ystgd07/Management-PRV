import { useState } from "react";
import { useEffect } from "react";
import LeftContainer from "./left/LeftContainer";
import RightContainer from "./right/RightContainer";
import {
  FileText,
  Clock,
  CheckCircle,
  Calendar,
  XCircle,
  AlertCircle,
} from "lucide-react";

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

export default function HistoryContainer() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<number | null>(
    null
  );
  const [editingNote, setEditingNote] = useState<{
    appId: number;
    index: number;
  } | null>(null);
  const [noteText, setNoteText] = useState("");
  const [expandedStatus, setExpandedStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateSort, setDateSort] = useState<string>("newest");

  // 샘플 데이터 로드
  useEffect(() => {
    // 실제 구현에서는 API 호출로 대체
    const sampleApplications = [
      {
        id: 101,
        jobTitle: "프론트엔드 개발자",
        company: "테크 스타트업",
        status: "document_passed",
        appliedDate: "2023-05-15",
        nextStep: "기술 면접",
        nextDate: "2023-05-25",
        statusHistory: [
          { status: "submitted", date: "2023-05-15", note: "지원서 제출 완료" },
          {
            status: "reviewing",
            date: "2023-05-17",
            note: "서류 검토 중 안내 메일 수신",
          },
          {
            status: "document_passed",
            date: "2023-05-20",
            note: "서류 합격 메일 수신. 기술 면접 일정 조율 예정.",
          },
        ],
      },
      {
        id: 102,
        jobTitle: "백엔드 개발자",
        company: "글로벌 IT 기업",
        status: "reviewing",
        appliedDate: "2023-05-18",
        nextStep: "대기중",
        nextDate: null,
        statusHistory: [
          { status: "submitted", date: "2023-05-18", note: "지원서 제출 완료" },
          {
            status: "reviewing",
            date: "2023-05-19",
            note: "서류 검토 중 안내 메일 수신",
          },
        ],
      },
      {
        id: 103,
        jobTitle: "풀스택 개발자",
        company: "핀테크 기업",
        status: "final_passed",
        appliedDate: "2023-04-10",
        nextStep: "입사 준비",
        nextDate: "2023-06-01",
        statusHistory: [
          { status: "submitted", date: "2023-04-10", note: "지원서 제출 완료" },
          {
            status: "reviewing",
            date: "2023-04-12",
            note: "서류 검토 중 안내 메일 수신",
          },
          {
            status: "document_passed",
            date: "2023-04-18",
            note: "서류 합격 메일 수신",
          },
          {
            status: "interview_scheduled",
            date: "2023-04-25",
            note: "기술 면접 일정 확정 (온라인)",
          },
          {
            status: "interview_passed",
            date: "2023-05-02",
            note: "기술 면접 합격. 임원 면접 일정 조율 예정.",
          },
          {
            status: "final_passed",
            date: "2023-05-10",
            note: "최종 합격. 입사 일정 및 처우 협의 중.",
          },
        ],
      },
      {
        id: 104,
        jobTitle: "모바일 앱 개발자",
        company: "모빌리티 기업",
        status: "rejected",
        appliedDate: "2023-04-05",
        nextStep: null,
        nextDate: null,
        statusHistory: [
          { status: "submitted", date: "2023-04-05", note: "지원서 제출 완료" },
          {
            status: "reviewing",
            date: "2023-04-07",
            note: "서류 검토 중 안내 메일 수신",
          },
          {
            status: "rejected",
            date: "2023-04-15",
            note: "서류 전형 불합격. 경력 요건 불충족.",
          },
        ],
      },
      {
        id: 105,
        jobTitle: "데이터 엔지니어",
        company: "데이터 분석 기업",
        status: "interview_scheduled",
        appliedDate: "2023-05-05",
        nextStep: "기술 면접",
        nextDate: "2023-05-20",
        statusHistory: [
          { status: "submitted", date: "2023-05-05", note: "지원서 제출 완료" },
          {
            status: "reviewing",
            date: "2023-05-08",
            note: "서류 검토 중 안내 메일 수신",
          },
          {
            status: "document_passed",
            date: "2023-05-12",
            note: "서류 합격 메일 수신",
          },
          {
            status: "interview_scheduled",
            date: "2023-05-15",
            note: "기술 면접 일정 확정 (온라인)",
          },
        ],
      },
    ];

    setApplications(sampleApplications);
    if (sampleApplications.length > 0) {
      setSelectedApplication(sampleApplications[0].id);
    }
  }, []);

  // 필터링된 지원 목록
  const filteredApplications = applications.filter((app) => {
    // 검색어 필터링
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());

    // 상태 필터링
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 정렬된 지원 목록
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    const dateA = new Date(a.appliedDate).getTime();
    const dateB = new Date(b.appliedDate).getTime();

    return dateSort === "newest" ? dateB - dateA : dateA - dateB;
  });

  const selectedApp = applications.find(
    (app) => app.id === selectedApplication
  );

  // 상태 ID에 따른 표시 텍스트 반환 함수
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "submitted":
        return "서류 제출";
      case "reviewing":
        return "서류 검토중";
      case "document_passed":
        return "서류 합격";
      case "interview_scheduled":
        return "면접 예정";
      case "interview_passed":
        return "면접 합격";
      case "final_passed":
        return "최종 합격";
      case "rejected":
        return "불합격";
      case "cancelled":
        return "지원 취소";
      default:
        return "상태 정보 없음";
    }
  };

  // 상태에 따른 아이콘 및 색상 정보
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "submitted":
        return {
          icon: <FileText className='h-4 w-4' />,
          color: "bg-blue-100 text-blue-700 border-blue-200",
        };
      case "reviewing":
        return {
          icon: <Clock className='h-4 w-4' />,
          color: "bg-amber-100 text-amber-700 border-amber-200",
        };
      case "document_passed":
        return {
          icon: <CheckCircle className='h-4 w-4' />,
          color: "bg-green-100 text-green-700 border-green-200",
        };
      case "interview_scheduled":
        return {
          icon: <Calendar className='h-4 w-4' />,
          color: "bg-purple-100 text-purple-700 border-purple-200",
        };
      case "interview_passed":
        return {
          icon: <CheckCircle className='h-4 w-4' />,
          color: "bg-green-100 text-green-700 border-green-200",
        };
      case "final_passed":
        return {
          icon: <CheckCircle className='h-4 w-4' />,
          color: "bg-green-100 text-green-700 border-green-200",
        };
      case "rejected":
        return {
          icon: <XCircle className='h-4 w-4' />,
          color: "bg-red-100 text-red-700 border-red-200",
        };
      case "cancelled":
        return {
          icon: <AlertCircle className='h-4 w-4' />,
          color: "bg-gray-100 text-gray-700 border-gray-200",
        };
      default:
        return {
          icon: <Clock className='h-4 w-4' />,
          color: "bg-gray-100 text-gray-700 border-gray-200",
        };
    }
  };

  // 상태에 따른 배지 색상 결정 함수
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "document_passed":
      case "interview_passed":
      case "final_passed":
        return "success";
      case "reviewing":
      case "interview_scheduled":
        return "outline";
      case "rejected":
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const toggleExpand = (status: string) => {
    if (expandedStatus === status) {
      setExpandedStatus(null);
    } else {
      setExpandedStatus(status);
    }
  };

  const startEditingNote = (
    appId: number,
    index: number,
    currentNote: string
  ) => {
    setEditingNote({ appId, index });
    setNoteText(currentNote);
  };

  const saveNote = () => {
    if (editingNote) {
      const updatedApplications = applications.map((app) => {
        if (app.id === editingNote.appId) {
          const updatedHistory = [...app.statusHistory];
          updatedHistory[editingNote.index] = {
            ...updatedHistory[editingNote.index],
            note: noteText,
          };

          return {
            ...app,
            statusHistory: updatedHistory,
          };
        }
        return app;
      });

      setApplications(updatedApplications);
      setEditingNote(null);

      toast({
        title: "메모가 업데이트되었습니다.",
        duration: 2000,
      });
    }
  };

  const cancelEditing = () => {
    setEditingNote(null);
  };

  return (
    <div className='flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full space-y-6'>
      <LeftContainer
        applications={applications}
        selectedApplication={selectedApplication}
        setSelectedApplication={setSelectedApplication}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {selectedApp && (
        <RightContainer
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
      )}
    </div>
  );
}
