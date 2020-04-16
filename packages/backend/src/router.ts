import { ClientRouter } from '@backend/domains/client/router';
import * as Router from '@koa/router';

const MainRouter = new Router();

MainRouter.use('/clients', ClientRouter.routes(), ClientRouter.allowedMethods());

export { MainRouter };
