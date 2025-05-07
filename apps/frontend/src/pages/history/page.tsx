import HistoryContainer from "@/features/history/HistoryContainer";
import Header from "./component/Header";

export default function HistoryPage() {
  return (
    <div className='flex flex-col gap-5'>
      <Header />
      <HistoryContainer />
    </div>
  );
}
