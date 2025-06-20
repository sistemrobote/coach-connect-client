interface ImportMetaEnv {
  readonly VITE_STRAVA_CLIENT_ID: string
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
declare module 'virtual:pwa-register' {
  export function registerSW(options?: any): void;
}