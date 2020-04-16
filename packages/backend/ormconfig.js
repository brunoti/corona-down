/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const { SnakeNamingStrategy } = require('typeorm-naming-strategies');
require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  seeds: [resolve(__dirname, 'src/database/seeds/**/*.ts')],
  migrations: [resolve(__dirname, 'src/database/migrations/**/*.ts')],
  entities: [resolve(__dirname, 'src/entities/*.ts')],
  cli: {
    seedsDir: resolve(__dirname, 'src/database/seeds'),
    migrationsDir: resolve(__dirname, 'src/database/migrations'),
    entitiesDir: resolve(__dirname, 'src/entities'),
  }
};
