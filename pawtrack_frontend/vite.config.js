import { resolve } from 'path';
import { defineConfig } from 'vite';

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
