import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');
  const isProduction = env('NODE_ENV') === 'production';
  const useSSL = env.bool('DATABASE_SSL', false);

  // For production with DATABASE_URL (Render, Railway, etc.)
  if (client === 'postgres' && env('DATABASE_URL')) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: useSSL ? { rejectUnauthorized: false } : false,
        },
        pool: { min: 0, max: 10 },
        acquireConnectionTimeout: 60000,
      },
    };
  }

  // For local development
  const connections = {
    postgres: {
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: false,
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: 2, max: 10 },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: 60000,
    },
  };
};
