module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASS || ''}@${process.env.DB_HOST || 'localhost'}:5432/${ process.env.DB_NAME || 'euko-api'}`,
  synchronize: true,
  logging: true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
}
