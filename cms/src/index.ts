import type { Core } from '@strapi/strapi';
import { bootstrapCms } from './seed';

export default {
  register() {
    console.log('[LUMEA] Strapi register phase started');
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('[LUMEA] Strapi bootstrap phase started');
    try {
      await bootstrapCms(strapi);
      console.log('[LUMEA] Bootstrap completed successfully');
    } catch (error) {
      console.error('[LUMEA] Bootstrap error (non-fatal):', error);
      // Don't throw - allow Strapi to start even if seed fails
    }
  },
};
