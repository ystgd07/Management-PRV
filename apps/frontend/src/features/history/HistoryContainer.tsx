import { useEffect } from "react";
import LeftContainer from "./left/LeftContainer";
import RightContainer from "./right/RightContainer";
import { useApplyQuery } from "@/entities/apply/queries";
import { useHistoryStore } from "@/store/history/store";

export default function HistoryContainer() {
  const { data: applications, isLoading, error } = useApplyQuery();
  const { selectedApplication, setSelectedApplication } = useHistoryStore();

  useEffect(() => {
    if (
      applications &&
      applications?.applications.length > 0 &&
      !selectedApplication
    ) {
      setSelectedApplication(applications.applications[0].id);
    }
  }, [applications, selectedApplication]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full space-y-6'>
      <LeftContainer applications={applications} />

      <RightContainer applications={applications} />
    </div>
  );
}
