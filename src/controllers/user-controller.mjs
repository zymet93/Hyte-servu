import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';
import {
  deleteUserById,
  insertUser,
  listAllUsers,
  selectUserById,
  updateUserById,
} from '../models/user-model.mjs';

const getUsers = async (req, res) => {
  const result = await listAllUsers();
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const getUserById = async (req, res) => {
  const result = await selectUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const postUser = async (req, res, next) => {
  const {username, password, email} = req.body;
  const validationErrors = validationResult(req);
  console.log('user validation errors', validationErrors);
  // check that all needed fields are included in request
  if (validationErrors.isEmpty()) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await insertUser({
      username,
      email,
      password: hashedPassword,
    }, next);
    return res.status(201).json(result);
  } else {
    const error = new Error('bad request');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next(error);
  }
};

// Only user authenticated by token can update own data
const putUser = async (req, res) => {
  // Get userinfo from req.user object extracted from token
  const user_id = req.user.user_id;
  const {username, password, email} = req.body;
  // hash password if included in request
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // check that all needed fields are included in request
  if (user_id && username && password && email) {
    const result = await updateUserById({
      user_id,
      username,
      password: hashedPassword,
      email,
    });
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

const deleteUser = async (req, res) => {
  const result = await deleteUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
