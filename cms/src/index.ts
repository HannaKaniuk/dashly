import type { Core } from '@strapi/strapi';
import { bootstrapCms } from './seed';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await bootstrapCms(strapi);
  },
};
