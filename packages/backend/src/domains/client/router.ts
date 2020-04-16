import * as Router from '@koa/router';
import * as Controller from './controller';

const ClientRouter = new Router();

ClientRouter.post('/get', Controller.get);
ClientRouter.post('/create', Controller.create);
ClientRouter.post('/add-locations', Controller.addLocation);
ClientRouter.post('/get-locations', Controller.getLocations);

export { ClientRouter };
