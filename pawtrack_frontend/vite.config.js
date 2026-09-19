import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'PawTrackLogin.html'),
        dashboard: resolve(__dirname, 'Dashboard.html'),
        createAccount: resolve(__dirname, 'CreateAccount.html'),
      },
    },
  },
});
