import { Router } from 'express';
import { makeCreateCardsController } from '@/main/factories/controllers/makeCreateCardsController';

const routes = Router();

const controller = makeCreateCardsController();

routes.post(controller.path, async (req, res) => {
  const { body, status } = await controller.handle(req);
  return res.status(status).json(body);
});

export default routes;
