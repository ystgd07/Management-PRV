import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StageId } from "@/entities/apply/model";
import { useApplyQuery } from "@/entities/apply/queries";
import { StageBadge } from "@/shared/ui/StageBadge";
import { Briefcase } from "lucide-react";
import { useState } from "react";

export default function ItemList() {
  const { data } = useApplyQuery();
  const [activeTab, setActiveTab] = useState("applications");
  console.log("applications", data);

  return (
    <>
      {data && data.applications.length > 0 ? (
        <div className='space-y-3'>
          {data?.applications.map((application) => (
            <Card key={application.id} className='overflow-hidden'>
              <CardContent className='p-4'>
                <div>
                  <h3 className='font-bold'>{application.companyName}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {application.companyName}
                  </p>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <Badge className=' flex items-center justify-center'>
                    {application.status === "active" ? "진행중" : "완료"}
                  </Badge>
                  <span className='text-xs text-muted-foreground'>
                    지원일: {application.appliedDate}
                  </span>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <StageBadge
                    stage={application.currentStage}
                    id={application.currentStage.id as StageId}
                  />
                </div>
                {/* 추후 추가 검토 필요: 다음 단계 데이터 필요 */}
                {/* {application.nextStep && (
                  <div className='mt-3 p-2 bg-muted rounded-md'>
                    <p className='text-sm font-medium'>
                      다음 단계: {application.nextStep}
                    </p>
                    {application.nextDate && (
                      <p className='text-xs text-muted-foreground'>
                        일정: {application.nextDate}
                      </p>
                    )}
                  </div> */}
                {/* )} */}
                <div className='flex justify-end mt-3'>
                  <Button size='sm' variant='outline'>
                    상세보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-10 text-center'>
          <Briefcase className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='font-medium text-lg'>지원 내역이 없습니다</h3>
          <p className='text-muted-foreground mt-1'>
            관심있는 공고에 지원해보세요
          </p>
          <Button
            variant='outline'
            className='mt-4'
            onClick={() => setActiveTab("search")}
          >
            공고 검색하기
          </Button>
        </div>
      )}
    </>
  );
}
