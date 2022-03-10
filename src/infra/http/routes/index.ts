import { Router } from 'express';
import { makeCreateCustomersController } from '@/main/factories/controllers/makeCreateCustomersController';

const routes = Router();

const controller = makeCreateCustomersController();

routes.post(controller.path, async (req, res) => {
  const { body, status } = await controller.handle(req);
  return res.status(status).json(body);
});

export default routes;
