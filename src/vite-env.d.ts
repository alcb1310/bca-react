/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_SERVER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
