import {validationResult} from 'express-validator';
import {
  listAllEntriesByUserId,
  findEntryById,
  addEntry,
  updateEntry,
  deleteEntryById,
} from '../models/entry-model.mjs';

const getEntries = async (req, res, next) => {
  // return only logged in user's own entries
  // - get user's id from token (req.user.user_id)
  const result = await listAllEntriesByUserId(req.user.user_id);
  if (!result.error) {
    res.json(result);
  } else {
    next(new Error(result.error));
  }
};


const getEntryById = async (req, res, next) => {
  const entry = await findEntryById(req.params.id, req.user.user_id);
  if (entry) {
    res.json(entry);
  } else {
    next(customError('Entry not found', 404));
  }
};

const postEntry = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { user_id, entry_date, mood, weight, sleep_hours, notes } = req.body;
    if (entry_date && (weight || mood || sleep_hours || notes) && user_id) {
      const result = await addEntry(req.body);
      if (result.entry_id) {
        res.status(201);
        res.json({ message: 'New entry added.', ...result });
      } else {
        throw new Error('Failed to add entry');
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error); // Forward the error to the error handler middleware
  }
};


const putEntry = async (req, res) => {
  const currentUser = req.user; // Assuming authenticateToken middleware attaches user to req.user

  const entry_id = req.params.id;
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = req.body;

  if (
    entry_id &&
    user_id &&
    entry_date &&
    (mood || weight || sleep_hours || notes)
  ) {
    const entry = await findEntryById(entry_id);

    if (!entry) {
      res.status(404).json({error: 'Entry not found'});
      return;
    }

    // Check if the current user is the owner of the entry
    if (entry.user_id !== currentUser.id) {
      res.status(403).json({error: 'Forbidden'});
      return;
    }

    const result = await updateEntry({entry_id, ...req.body});
    if (!result.error) {
      res.sendStatus(200);
    } else {
      res.status(500).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

const deleteEntry = async (req, res, next) => {
  const result = await deleteEntryById(req.params.id, req.user.user_id);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.json(result);
};


export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
