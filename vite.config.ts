import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        // Bare aliases (`components/*`, `store/*`, ...) are declared once in tsconfig.app.json
        tsconfigPaths: true,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test_utils/setupTests.ts'],
        css: false,
        passWithNoTests: true,
        testTimeout: 20000,
        include: ['src/**/*.test.{ts,tsx}'],
        env: { TZ: 'UTC' },
    },
});
