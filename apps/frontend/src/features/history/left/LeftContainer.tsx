import Search from "./Search";
import Category from "./Category";
import { Separator } from "@/components/ui/separator";
import ItemList from "./ItemList";
import { GetApplicationsResponse } from "@/entities/apply/model";

export default function LeftContainer({
  applications,
}: {
  applications: GetApplicationsResponse | undefined;
}) {
  return (
    <div className='flex flex-col gap-4'>
      <Search />
      <Category />
      <Separator />
      <ItemList applications={applications} />
    </div>
  );
}
