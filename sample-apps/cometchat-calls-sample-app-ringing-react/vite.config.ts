import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);

/** The installed version of a package, for the profile screen. */
function versionOf(name: string): string {
  const entry = require.resolve(name);
  let dir = dirname(entry);
  while (dir !== dirname(dir)) {
    try {
      const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
      if (pkg.name === name) return pkg.version;
    } catch {
      // keep walking up
    }
    dir = dirname(dir);
  }
  return 'unknown';
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version ?? '1.0.0'),
    __CALLS_SDK_VERSION__: JSON.stringify(
      versionOf('@cometchat/calls-sdk-javascript'),
    ),
    __CHAT_SDK_VERSION__: JSON.stringify(
      versionOf('@cometchat/chat-sdk-javascript'),
    ),
  },
});
