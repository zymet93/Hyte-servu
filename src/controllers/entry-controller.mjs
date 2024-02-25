import {
  listAllEntries,
  findEntryById,
  addEntry,
  updateEntry,
  deleteEntryById,
} from '../models/entry-model.mjs';

const getEntries = async (req, res) => {
  const result = await listAllEntries();
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = req.body;
  if (entry_date && (weight || mood || sleep_hours || notes) && user_id) {
    const result = await addEntry(req.body);
    if (result.entry_id) {
      res.status(201);
      res.json({message: 'New entry added.', ...result});
    } else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.sendStatus(400);
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

const deleteEntry = async (req, res) => {
  const currentUser = req.user; // Assuming authenticateToken middleware attaches user to req.user

  const entry_id = req.params.id;
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

  const result = await deleteEntryById(entry_id);
  if (!result.error) {
    res.sendStatus(200);
  } else {
    res.status(500).json(result);
  }
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
