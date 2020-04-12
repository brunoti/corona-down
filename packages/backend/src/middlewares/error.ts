import { Context } from 'koa';

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
    ctx.status = error.status || 500;
    ctx.body = {
      success: false,
      status: error.statusCode,
      type: error.name,
      message: error.toString(),
    };

    ctx.app.emit('error', error, ctx);
  }
};

export { handler as error };
