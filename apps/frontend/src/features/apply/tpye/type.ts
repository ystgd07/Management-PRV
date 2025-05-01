export interface ApplicationStatus {
  id: string;
  label: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

export interface ApplicationStatusSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStatus: string;
  applicationId: number;
  onStatusChange: (
    applicationId: number,
    status: string,
    stageDate?: string,
    nextStageDate?: string,
    note?: string
  ) => void;
}
