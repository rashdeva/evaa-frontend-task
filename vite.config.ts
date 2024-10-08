import { sentryVitePlugin } from '@sentry/vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 2200,

    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      }
    },

    sourcemap: 'hidden'
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2022'
    }
  },
  plugins: [
    react(),
    tsconfigPaths(),
    sentryVitePlugin({
      org: 'evaa',
      project: 'javascript-react',
      telemetry: false
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: ((process.env.GITHUB_REPOSITORY ?? '') + '/').match(/(\/.*)/)?.[1]
});
