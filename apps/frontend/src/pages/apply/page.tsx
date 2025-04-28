import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { applications } from "@/shared/lib/sample";
import { useState } from "react";
import ApplyHeader from "./component/Header";
export default function ApplyPage() {
  const [activeTab, setActiveTab] = useState("applications");

  return (
    <TabsContent value='applications' className='p-4 space-y-4'>
      <ApplyHeader />
      {applications.length > 0 ? (
        <div className='space-y-3'>
          {applications.map((application) => (
            <Card key={application.id} className='overflow-hidden'>
              <CardContent className='p-4'>
                <div>
                  <h3 className='font-bold'>{application.jobTitle}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {application.company}
                  </p>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <Badge
                    variant={
                      application.status === "서류 합격"
                        ? "secondary"
                        : application.status === "서류 검토중"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {application.status}
                  </Badge>
                  <span className='text-xs text-muted-foreground'>
                    지원일: {application.appliedDate}
                  </span>
                </div>
                {application.nextStep && (
                  <div className='mt-3 p-2 bg-muted rounded-md'>
                    <p className='text-sm font-medium'>
                      다음 단계: {application.nextStep}
                    </p>
                    {application.nextDate && (
                      <p className='text-xs text-muted-foreground'>
                        일정: {application.nextDate}
                      </p>
                    )}
                  </div>
                )}
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
    </TabsContent>
  );
}
