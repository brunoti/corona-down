import * as koaLogger from 'koa-logger';
import { logger } from 'helpers/logger';
import stripAnsi = require('strip-ansi');

const handler = koaLogger(txt => logger.info(stripAnsi(txt)));

export { handler as logger };



