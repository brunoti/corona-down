import 'reflect-metadata';
import * as Koa from 'koa'; import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as helmet from 'koa-helmet';
import * as Notifier from 'node-notifier';

import { createConnection } from 'typeorm';


import { MainRouter } from '@backend/router';
import { error } from '@backend/middlewares/error';
import { authorization } from '@backend/middlewares/authorization';
import { logger as koaLogger } from '@backend/middlewares/logger';

import { env } from '@backend/helpers/env';
import { logger } from '@backend/helpers/logger';

const APPLICATION_TOKEN = env('APPLICATION_TOKEN');
const isProduction = env('NODE_ENV', 'development') === 'production';

const app = new Koa();
app.use(helmet());
app.use(bodyParser());
app.use(cors());
app.use(koaLogger);
app.use(error);
app.use(authorization(APPLICATION_TOKEN));
app.use(MainRouter.routes());
app.use(MainRouter.allowedMethods({ throw: true }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const listen = (port: any): Promise<void> => new Promise((success, reject) => {
  try {
    app.listen(port, success);
  } catch (error_) {
    reject(error_);
  }
});

async function start() {
  if (!APPLICATION_TOKEN) {
    throw new Error('No APPLICATION_TOKEN found on .env, please set before run.');
  }

  if (!isProduction) {
    logger.info(`[APPLICATION_TOKEN] ${APPLICATION_TOKEN}`);
  }

  await createConnection();

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
