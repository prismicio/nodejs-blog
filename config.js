/**
 * Module dependencies.
 */
import express from 'express';
import favicon from 'serve-favicon';
import logger from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';
import path from 'path';
import { fileURLToPath } from 'url';

export const app = () => {
  const app = express();
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(favicon('public/images/punch.png'));
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(errorHandler());

  return app;
};

export default app;
