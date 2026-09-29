import type { Core } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';

const TEST_ADMIN = {
  email: 'test@lumea.dev',
  password: 'LumeaTest123!',
  firstname: 'Lumea',
  lastname: 'Tester',
};

async function ensureAdmin(strapi: Core.Strapi) {
  const existing = await strapi.db.query('admin::user').findOne({
    where: { email: TEST_ADMIN.email },
  });
  if (existing) return;

  const hasAny = await strapi.db.query('admin::user').count();
  if (hasAny > 0) {
    strapi.log.info('Admin users already exist — skipping test admin seed');
    return;
  }

  try {
    const superAdminRole = await strapi.db.query('admin::role').findOne({
      where: { code: 'strapi-super-admin' },
    });

    await strapi.admin.services.user.create({
      ...TEST_ADMIN,
      registrationToken: null,
      isActive: true,
      roles: superAdminRole ? [superAdminRole.id] : [],
    });
    strapi.log.info(`Test admin created: ${TEST_ADMIN.email}`);
  } catch (error) {
    strapi.log.warn('Could not create test admin automatically');
    strapi.log.warn(error);
  }
}

async function setPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (!publicRole) return;

  const permissions = [
    'api::announcement-message.announcement-message.find',
    'api::announcement-message.announcement-message.findOne',
    'api::product-category.product-category.find',
    'api::product-category.product-category.findOne',
    'api::product.product.find',
    'api::product.product.findOne',
  ];

  for (const action of permissions) {
    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: { action, role: publicRole.id },
    });

    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action,
          role: publicRole.id,
        },
      });
    }
  }
}

async function uploadImage(strapi: Core.Strapi, filename: string) {
  const filePath = path.join(process.cwd(), 'data', 'seed-images', filename);
  if (!fs.existsSync(filePath)) {
    strapi.log.warn(`Seed image missing: ${filePath}`);
    return null;
  }

  const stats = fs.statSync(filePath);
  const uploadService = strapi.plugin('upload').service('upload');

  const uploaded = await uploadService.upload({
    data: {},
    files: {
      filepath: filePath,
      originalFilename: filename,
      mimetype: 'image/jpeg',
      size: stats.size,
    },
  });

  const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
  return file ?? null;
}

async function seedContent(strapi: Core.Strapi) {
  const existing = await strapi.db.query('api::product.product').count();
  if (existing > 0) {
    strapi.log.info('Seed skipped: products already exist');
    return;
  }

  strapi.log.info('Seeding LUMEA CMS content...');

  const announcements = [
    { text: 'Get 15% off with code LUMEAFIRST15', order: 1 },
    { text: 'Free shipping on orders over £50', order: 2 },
    { text: 'New: Dermatologist-inspired care sets', order: 3 },
  ];

  for (const item of announcements) {
    await strapi.documents('api::announcement-message.announcement-message').create({
      data: { ...item },
      status: 'published',
    });
  }

  const categoryDefs = [
    { name: 'Cleansers', order: 1 },
    { name: 'Face Wash', order: 2 },
    { name: 'Makeup Removers', order: 3 },
  ];

  const categories: { documentId: string }[] = [];
  for (const cat of categoryDefs) {
    const created = await strapi.documents('api::product-category.product-category').create({
      data: { ...cat },
      status: 'published',
    });
    categories.push(created);
  }

  const serumImg = await uploadImage(strapi, 'serum.jpg');
  const moistImg = await uploadImage(strapi, 'moisturiser.jpg');
  const cleanImg = await uploadImage(strapi, 'cleanser.jpg');
  const setImg = await uploadImage(strapi, 'set.jpg');
  const setOptImg = await uploadImage(strapi, 'set-opt.jpg');
  const spfImg = await uploadImage(strapi, 'spf.jpg');
  const spfOptImg = await uploadImage(strapi, 'spf-opt.jpg');

  const products = [
    {
      title: 'Hyaluronic Acid Serum',
      volume: '30 ml',
      badges: ['Sale'],
      pricingMode: 'percent_off' as const,
      price: 28,
      discountPercent: 15,
      order: 1,
      imageId: serumImg?.id,
      categoryIds: [categories[0].documentId, categories[1].documentId],
      variations: [
        {
          label: 'Choose formula:',
          displayStyle: 'list' as const,
          options: [{ label: 'Hyaluronic Acid 2%' }, { label: 'Hyaluronic + B5' }],
        },
      ],
    },
    {
      title: 'Daily Moisturiser',
      volume: '50 ml',
      badges: ['New', 'Bestseller'],
      pricingMode: 'percent_off' as const,
      price: 32,
      discountPercent: 15,
      order: 2,
      imageId: moistImg?.id,
      categoryIds: [categories[0].documentId, categories[2].documentId],
      variations: [
        {
          label: 'Skin type:',
          displayStyle: 'pills' as const,
          options: [{ label: 'Dry' }, { label: 'Normal' }, { label: 'Sensitive' }],
        },
        {
          label: 'Size:',
          displayStyle: 'pills' as const,
          options: [
            { label: '30 ml' },
            { label: '50 ml', optionDiscountPercent: 10 },
            { label: '100 ml', optionDiscountPercent: 20 },
          ],
        },
      ],
    },
    {
      title: 'Daily Face Cleanser',
      volume: '150 ml',
      badges: ['Bestseller'],
      pricingMode: 'sale_price' as const,
      compareAtPrice: 20,
      salePrice: 17,
      order: 3,
      imageId: cleanImg?.id,
      categoryIds: [categories[0].documentId, categories[1].documentId],
      variations: [
        {
          label: 'Choose formula:',
          displayStyle: 'list' as const,
          options: [{ label: 'Gentle Hydrating' }, { label: 'Deep Cleansing' }],
        },
      ],
    },
    {
      title: 'Cleanse + Treat + Hydrate',
      volume: '3 products',
      badges: ['New', 'Sale'],
      pricingMode: 'sale_price' as const,
      compareAtPrice: 65,
      salePrice: 52,
      order: 4,
      imageId: setImg?.id,
      categoryIds: [
        categories[0].documentId,
        categories[1].documentId,
        categories[2].documentId,
      ],
      variations: [
        {
          label: 'Set includes:',
          displayStyle: 'list' as const,
          options: [
            { label: 'Cleanser + Serum + Cream', image: setOptImg?.id },
            { label: 'Cleanser + Serum + SPF', image: setImg?.id },
          ],
        },
      ],
    },
    {
      title: 'Daily Sun Protection',
      volume: '50 ml',
      badges: ['Bestseller'],
      pricingMode: 'sale_price' as const,
      compareAtPrice: 26,
      salePrice: 22,
      order: 5,
      imageId: spfImg?.id,
      categoryIds: [categories[2].documentId],
      variations: [
        {
          label: 'Choose finish:',
          displayStyle: 'list' as const,
          options: [
            { label: 'Invisible Finish', image: spfOptImg?.id },
            { label: 'Tinted Finish', image: spfImg?.id },
          ],
        },
      ],
    },
  ];

  for (const product of products) {
    const { imageId, categoryIds, ...rest } = product;
    await strapi.documents('api::product.product').create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: {
        ...rest,
        image: imageId,
        categories: categoryIds,
      } as any,
      status: 'published',
    });
  }

  strapi.log.info('Seed complete');
}

export async function bootstrapCms(strapi: Core.Strapi) {
  await setPublicPermissions(strapi);
  await ensureAdmin(strapi);
  try {
    await seedContent(strapi);
  } catch (error) {
    strapi.log.error('Seed failed');
    strapi.log.error(error);
  }
}
