import promisePool from '../utils/database.mjs';

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE entry_id = ?',
      [id]
    );
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addEntry = async (entry) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, mood, weight, sleep_hours, notes];
  try {
    const rows = await promisePool.query(sql, params);
    console.log('rows', rows);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const deleteEntryById = async (id) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM DiaryEntries WHERE entry_id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return {error: 'Entry not found'};
    }
    return {message: 'Entry deleted successfully'};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const updateEntry = async (entry) => {
  const {entry_id, user_id, entry_date, mood, weight, sleep_hours, notes} =
    entry;
  const sql = `UPDATE DiaryEntries SET user_id = ?, entry_date = ?, mood = ?, weight = ?, sleep_hours = ?, notes = ? WHERE entry_id = ?`;
  const params = [
    user_id,
    entry_date,
    mood,
    weight,
    sleep_hours,
    notes,
    entry_id,
  ];
  try {
    const [result] = await promisePool.query(sql, params);
    if (result.affectedRows === 0) {
      return {error: 'Entry not found'};
    }
    return {message: 'Entry updated successfully'};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};
export {listAllEntries, findEntryById, addEntry, deleteEntryById, updateEntry};
