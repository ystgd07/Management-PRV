export const APPLICATION_STATUS = {
  DOCUMENT_REVIEW: { id: 1, label: "서류 검토중" },
  ASSIGNMENT: { id: 2, label: "과제전형" },
  CODING_TEST: { id: 3, label: "코딩테스트" },
  FIRST_INTERVIEW: { id: 4, label: "1차 면접" },
  SECOND_INTERVIEW: { id: 5, label: "2차 면접" },
  TECHNICAL_INTERVIEW: { id: 6, label: "기술 면접" },
  PERSONALITY_INTERVIEW: { id: 7, label: "인성 면접" },
  FINAL_PASS: { id: 8, label: "최종 합격" },
  REJECTED: { id: 9, label: "불합격 " },
} as const;

export type ApplicationStatusId =
  (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS]["id"];
export type ApplicationStatusLabel =
  (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS]["label"];

export const getStatusById = (id: ApplicationStatusId) => {
  return Object.values(APPLICATION_STATUS).find((status) => status.id === id);
};

export const getStatusByLabel = (label: ApplicationStatusLabel) => {
  return Object.values(APPLICATION_STATUS).find(
    (status) => status.label === label
  );
};

export const getAllStatueses = () => Object.values(APPLICATION_STATUS);
