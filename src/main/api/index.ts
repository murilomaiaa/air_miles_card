import 'reflect-metadata';
import 'dotenv/config';

import env from '../config/env';
import { TypeormHelper } from '@/infra/typeorm';
import { RabbitMQBroker } from '@/infra/queue';

TypeormHelper.getInstance()
  .connect()
  .then(async () => {
    const { app } = await import('./app');
    app.listen(env.apiPort, () => {
      // eslint-disable-next-line no-console
      console.log(`Listening on port ${env.apiPort}`);
    });

    const broker = new RabbitMQBroker();
    await broker.start();
  })
  .catch(console.log);
