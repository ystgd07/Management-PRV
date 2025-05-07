import Title from "./Title";
import { GetApplicationsResponse } from "@/entities/apply/model";
import ItemInfo from "./ItemInfo";

export default function RightContainer({
  applications,
}: {
  applications: GetApplicationsResponse | undefined;
}) {
  return (
    <div className='space-y-6'>
      <Title applications={applications} />
      <ItemInfo applications={applications} />
    </div>
  );
}
