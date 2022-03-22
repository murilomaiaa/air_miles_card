import env from '@/main/config/env';
import { cardsRoute } from './routes';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Cards management',
    description: "Cards management's endpoints",
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${env.apiPort}/api`,
      description: 'Server running local',
    },
  ],
  // apis: ['./src/infra/http/docs/**/**.doc.ts'],
  paths: {
    ...cardsRoute,
  },
};
