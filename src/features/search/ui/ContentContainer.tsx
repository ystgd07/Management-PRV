import { TabsContent } from "@/components/ui/tabs";
import ActiveFilters from "../Filter/ActiveFilters";
import SearchBar from "../Filter/SearchBar";
import ListItems from "../List/ListItems";

export default function ContentContainer() {
  return (
    <>
      {/* Search Tab */}
      <TabsContent value='search' className='p-4 space-y-4'>
        {/* Search Bar */}
        <SearchBar />
        {/* Active Filters */}
        <ActiveFilters />
        {/* List Items */}
        <ListItems />
      </TabsContent>
    </>
  );
}
