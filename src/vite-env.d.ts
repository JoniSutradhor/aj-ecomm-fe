/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
    readonly VITE_API_TIMEOUT?: string;
    readonly VITE_DEFAULT_LANGUAGE?: string;
    readonly VITE_CURRENCY?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
