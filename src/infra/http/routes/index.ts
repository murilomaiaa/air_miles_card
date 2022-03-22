import { Router } from 'express';
import { makeCreateCardsController } from '@/main/factories/controllers/makeCreateCardsController';
import { makeListCardsController } from '@/main/factories/controllers/makeListCardsController';

const routes = Router();

const createController = makeCreateCardsController();
const listController = makeListCardsController();

routes.post(createController.path, async (req, res) => {
  const { body, status } = await createController.handle(req);
  return res.status(status).json(body);
});

routes.get(listController.path, async (req, res) => {
  const { body, status } = await listController.handle(req);
  return res.status(status).json(body);
});

export default routes;
