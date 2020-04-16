import { Context } from 'koa';
import { logger } from '@backend/helpers/logger';

const handler = async (ctx: Context, next: () => Promise<void>) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.status = 404;
      ctx.body = {
        status: 404,
        data: ctx.url,
        message: `The url "${ctx.originalUrl} does not exist"`,
      };
    }
  } catch (error) {
    if (error.name.toLowerCase().includes('notfound')) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        status: error.statusCode,
        type: error.name,
        message: error.toString(),
      };
      return;
    }
    logger.error(error);
    ctx.status = error.status || 500;
    ctx.body = {
      success: false,
      status: error.statusCode,
      type: error.name,
      message: error.toString(),
    };
  }
};

export { handler as error };
