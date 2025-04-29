/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "360px", // 추가된 작은 모바일 스크린
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"], // 한글 최적화 폰트
      },
      colors: {
        stage1: "#E0F2FE", // 서류 검토중 – sky-100
        stage2: "#FEF3C7", // 과제전형   – amber-100
        stage3: "#ECFDF5", // 코딩테스트 – teal-50
        stage4: "#FCE7F3", // 1차 면접   – pink-100
        stage5: "#E9D5FF", // 2차 면접   – violet-100
        stage6: "#F0F9FF", // 기술 면접   – sky-50
        stage7: "#FEF2F2", // 인성 면접   – rose-50
        stage8: "#DCFCE7", // 최종 합격   – green-50
        stage9: "#FEE2E2", // 불합격     – red-100
      },
    },
  },
  plugins: [],
}; 