export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  description: string;
  tags: string[];
  posted: string;
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "시니어 프론트엔드 개발자",
    company: "테크 스타트업",
    location: "서울",
    experience: "3년 이상",
    description:
      "React, TypeScript를 활용한 웹 애플리케이션 개발 경험이 있는 시니어 개발자를 찾습니다.",
    tags: ["React", "TypeScript", "Next.js"],
    posted: "3일 전",
  },
  {
    id: "2",
    title: "백엔드 개발자",
    company: "성장형 스타트업",
    location: "부산",
    experience: "2년 이상",
    description:
      "Node.js, Express, MongoDB를 활용한 백엔드 개발자를 모집합니다.",
    tags: ["Node.js", "Express", "MongoDB"],
    posted: "1주일 전",
  },
  {
    id: "3",
    title: "풀스택 개발자",
    company: "프리랜서 프로젝트",
    location: "대전",
    experience: "1년 이상",
    description:
      "React, Node.js, Express, MongoDB를 활용한 풀스택 개발자를 모집합니다.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    posted: "2일 전",
  },
  {
    id: "4",
    title: "프론트엔드 개발자",
    company: "웹 서비스 회사",
    location: "서울",
    experience: "2년 이상",
    description:
      "React, TypeScript를 활용한 웹 애플리케이션 개발 경험이 있는 프론트엔드 개발자를 찾습니다.",
    tags: ["React", "TypeScript", "Next.js"],
    posted: "1주일 전",
  },
];

// Sample application data
const applications = [
  {
    id: 101,
    jobTitle: "프론트엔드 개발자",
    company: "테크 스타트업",
    status: "서류 합격",
    appliedDate: "2023-05-15",
    nextStep: "기술 면접",
    nextDate: "2023-05-25",
  },
  {
    id: 102,
    jobTitle: "백엔드 개발자",
    company: "글로벌 IT 기업",
    status: "서류 검토중",
    appliedDate: "2023-05-18",
    nextStep: "대기중",
    nextDate: null,
  },
];

// Sample interview data
const interviews = [
  {
    id: 201,
    jobTitle: "프론트엔드 개발자",
    company: "테크 스타트업",
    date: "2023-05-25",
    time: "14:00",
    type: "기술 면접",
    location: "온라인 (Zoom)",
  },
];

export { applications, interviews };
