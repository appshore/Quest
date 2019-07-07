import express from 'express';

import {
  addItems,
  deleteItems,
  listItems
} from '../controllers/Items';

const itemsRoutes = express.Router();

// item
itemsRoutes.post('/:itemType/:qty', addItems);
itemsRoutes.delete('/:itemType/:qty', deleteItems);
itemsRoutes.get('/', listItems);

export default itemsRoutes;
