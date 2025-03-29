import { useState } from "react";
import { Briefcase, MapPin, Heart, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Toaster } from "sonner";
import MainHeader from "@/widget/Component/MainHeader";
import PageRoute from "@/widget/Component/PageRoute";
// 샘플 데이터 (API 연동 시 삭제! ⚠️)
import { jobs, applications, interviews } from "@/lib/sample";
import BottonNav from "@/widget/Component/BottonNav";
import { useJobStore } from "@/store/Job/store";
import ContentContainer from "@/features/search/ui/ContentContainer";

export default function JobSearchApp() {
  const [activeTab, setActiveTab] = useState("search");
  const { savedJobs, toggleSaveJob } = useJobStore();

  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <Toaster />
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
          {/* Widget: Page Route */}
          <PageRoute />
          {/* Feature UI: Content Container */}
          <ContentContainer />

          {/* Saved Jobs Tab */}
          <TabsContent value='saved' className='p-4 space-y-4'>
            <h2 className='text-lg font-semibold'>관심 공고</h2>
            {savedJobs.length > 0 ? (
              <div className='space-y-3'>
                {jobs
                  .filter((job) => savedJobs.includes(job.id))
                  .map((job) => (
                    <Card key={job.id} className='overflow-hidden'>
                      <CardContent className='p-4'>
                        <div className='flex justify-between items-start'>
                          <div>
                            <h3 className='font-bold'>{job.title}</h3>
                            <p className='text-sm text-muted-foreground'>
                              {job.company}
                            </p>
                          </div>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => toggleSaveJob(job.id)}
                            className='h-8 w-8'
                          >
                            <Heart className='h-5 w-5 fill-primary text-primary' />
                          </Button>
                        </div>
                        <div className='flex items-center gap-2 mt-2 text-sm text-muted-foreground'>
                          <MapPin className='h-3.5 w-3.5' />
                          <span>{job.location}</span>
                          <span className='text-xs'>•</span>
                          <Briefcase className='h-3.5 w-3.5' />
                          <span>{job.experience}</span>
                        </div>
                        <div className='flex justify-between items-center mt-3'>
                          <span className='text-xs text-muted-foreground'>
                            {job.posted}
                          </span>
                          <Button size='sm'>지원하기</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-10 text-center'>
                <Heart className='h-12 w-12 text-muted-foreground mb-4' />
                <h3 className='font-medium text-lg'>관심 공고가 없습니다</h3>
                <p className='text-muted-foreground mt-1'>
                  관심있는 공고를 하트 아이콘을 눌러 저장해보세요
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

          {/* Applications Tab */}
          <TabsContent value='applications' className='p-4 space-y-4'>
            <h2 className='text-lg font-semibold'>지원 현황</h2>
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

          {/* Interviews Tab */}
          <TabsContent value='interviews' className='p-4 space-y-4'>
            <h2 className='text-lg font-semibold'>면접 일정</h2>
            {interviews.length > 0 ? (
              <div className='space-y-3'>
                {interviews.map((interview) => (
                  <Card key={interview.id} className='overflow-hidden'>
                    <CardContent className='p-4'>
                      <div>
                        <h3 className='font-bold'>{interview.jobTitle}</h3>
                        <p className='text-sm text-muted-foreground'>
                          {interview.company}
                        </p>
                      </div>
                      <div className='mt-3 space-y-2'>
                        <div className='flex items-center gap-2'>
                          <Calendar className='h-4 w-4 text-muted-foreground' />
                          <span className='text-sm'>
                            {interview.date} {interview.time}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <User className='h-4 w-4 text-muted-foreground' />
                          <span className='text-sm'>{interview.type}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <MapPin className='h-4 w-4 text-muted-foreground' />
                          <span className='text-sm'>{interview.location}</span>
                        </div>
                      </div>
                      <div className='flex justify-between mt-3'>
                        <Button size='sm' variant='outline'>
                          캘린더에 추가
                        </Button>
                        <Button size='sm'>준비하기</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-10 text-center'>
                <Calendar className='h-12 w-12 text-muted-foreground mb-4' />
                <h3 className='font-medium text-lg'>예정된 면접이 없습니다</h3>
                <p className='text-muted-foreground mt-1'>
                  지원한 공고의 면접 일정이 잡히면 이곳에 표시됩니다
                </p>
                <Button
                  variant='outline'
                  className='mt-4'
                  onClick={() => setActiveTab("applications")}
                >
                  지원 현황 보기
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Widget: Bottom Navigation */}
      <BottonNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
