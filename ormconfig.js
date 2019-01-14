module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASS || ''}@${process.env.DB_HOST || 'localhost'}:5432/${ process.env.DB_NAME || 'euko-api'}`,
  synchronize: true,
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers'
  }
}
