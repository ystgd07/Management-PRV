import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // 개발 환경에서도 PWA 활성화
      },
      manifest: {
        name: '프로젝트 이름',
        short_name: '약칭',
        description: '앱 설명',
        theme_color: '#3b82f6',
        icons: [
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // 빌드 시점에 캐시할 파일 패턴 정의
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}'],
        // 런타임 캐시 정책 정의
        runtimeCaching: [
          // API 요청 캐시 정책
          {
            urlPattern: /^https:\/\/api\./i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                // 캐시 항목 최대 개수
                maxEntries: 100,
                // 캐시 항목 최대 유지 시간
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          },
          // 이미지 캐시 정책
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache'
            }
          }
        ]
      }
    })
  ],
  // HTTPS 개발 서버 설정 (필요시 인증서 생성 후 활성화)
  // server: {
  //   https: {
  //     key: fs.readFileSync('localhost-key.pem'),
  //     cert: fs.readFileSync('localhost.pem')
  //   }
  // }
})
