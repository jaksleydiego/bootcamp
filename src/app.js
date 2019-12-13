import express from 'express';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // enviar requisições e receber respostas no formato de json
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}
// instanciando e exportando a classe app
export default new App().server;
