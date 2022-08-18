import { defineConfig } from 'cypress';
import { addMatchImageSnapshotPlugin, } from 'cypress-image-snapshot/plugin';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config);
    },
    baseUrl: 'http://localhost:3000',
    viewportHeight: 1024,
    viewportWidth: 1280,
  },
});
