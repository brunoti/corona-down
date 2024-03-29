import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as helmet from 'koa-helmet';
import * as Notifier from 'node-notifier';
import { createConnection } from 'typeorm';

import { error } from 'middlewares/error';
import { logger as koaLogger } from 'middlewares/logger';

import { env } from 'helpers/env';
import { logger } from 'helpers/logger';

const app = new Koa();
app.use(helmet());
app.use(bodyParser());
app.use(cors());
app.use(koaLogger);
app.use(error);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const listen = (port: any): Promise<void> => new Promise((success, reject) => {
  try {
    app.listen(port, success);
  } catch (error_) {
    reject(error_);
  }
});

async function start() {
  await createConnection({
    type: 'postgres',
    host: env('DB_HOST'),
    port: env('DB_PORT'),
    username: env('DB_USER'),
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE'),
  });

  logger.info('TYPEORM: configured');

  const PORT = env('PORT', '3000');
  const URL = env('URL', `http://127.0.0.1:${PORT}`);
  const ENV = env('NODE_ENV');

  await listen(PORT);

  logger.info('SERVER STARTED');
  logger.info(`PORT: ${PORT}`);
  logger.info(`URL: ${URL}`);
  logger.info(`ENV: ${ENV}`);
  Notifier.notify({
    title: 'Corona Down',
    message: `Server listening on: ${URL}`,
  });
}

start().catch(logger.error);

export default app;
