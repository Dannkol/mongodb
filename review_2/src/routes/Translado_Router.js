import express from 'express';

import {ControllerTranslado} from '../controllers/TransladoConstroller.js'

const routes = express.Router();

routes.post('/', ControllerTranslado.PostTranslado )

export { routes }