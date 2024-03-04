import {body} from 'express-validator';
import express from 'express';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

const entryRouter = express.Router();

entryRouter
  .route('/')
  .get(authenticateToken, getEntries)
  // TODO: add authentication and input validation
  .post(
    //authenticateToken,
    body('entry_date').trim().isDate(),
    body('mood').trim().notEmpty(),
    body('weight').trim().isFloat({min: 0}),
    body('sleep_hours').trim().isInt({min: 0}),
    body('notes').trim().notEmpty(),
    postEntry
  );

entryRouter.route('/:id').get(getEntryById).put(putEntry).delete(deleteEntry);

export default entryRouter;
