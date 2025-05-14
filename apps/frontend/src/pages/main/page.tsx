import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Toaster } from "sonner";
import MainHeader from "@/widget/Component/MainHeader";
import PageRoute from "@/widget/Component/PageRoute";
import BottonNav from "@/widget/Component/BottonNav";
import ContentContainer from "@/features/search/ui/ContentContainer";
import Interest from "@/pages/interest/page";
import ApplyPage from "@/pages/apply/page";

export default function JobSearchApp() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className='flex flex-col min-h-screen bg-background'>
      {/* Widget: Header */}
      <MainHeader />
      {/* Main Content */}
      <main className='flex-1'>
        <Tabs
          defaultValue='search'
          value={activeTab}
          onValueChange={setActiveTab}
          className='w-full'
        >
          {/* Widget: Top NAV */}
          {/* <PageRoute /> */}
          {/* Feature UI: SearchContent Container */}
          <ContentContainer />
          {/* Page UI:Interest Tab */}
          <Interest activeTab={activeTab} setActiveTab={setActiveTab} />
          {/* 지원 현황 탭 */}
          <ApplyPage />
        </Tabs>
      </main>

      {/* Widget: Bottom NAV  */}
      <BottonNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
