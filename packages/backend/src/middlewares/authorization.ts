import { Context } from 'koa';

const handler = (token: string) => async (ctx: Context, next: () => Promise<void>) => {
  if(ctx.request.headers['application-token'] === token) {
    return next();
  }
  ctx.status = 403;
  ctx.body = {
    success: false,
    message: 'The Application Token is missing or invalid',
  };
  return;
};

export { handler as authorization };
