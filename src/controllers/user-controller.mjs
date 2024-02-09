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

const postUser = async (req, res) => {
  const {username, password, email} = req.body;
  if (username && password && email) {
    const result = await insertUser(req.body);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result); // Status code 201 for resource created
  } else {
    return res.status(400).json({error: 400, message: 'Bad request'});
  }
};

const putUser = async (req, res) => {
  const user_id = req.params.id;
  const {username, password, email} = req.body;
  if (user_id && username && password && email) {
    const result = await updateUserById({user_id, ...req.body});
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(200).json(result); // Status code 200 for successful update
  } else {
    return res.status(400).json({error: 400, message: 'Bad request'});
  }
};

const deleteUser = async (req, res) => {
  const result = await deleteUserById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

const postLogin = (req, res) => {
  // Implement login functionality properly, including password hashing and database querying
  // For simplicity, this example assumes the users array contains user objects
  const userCreds = req.body;
  if (!userCreds.username || !userCreds.password) {
    return res.sendStatus(400);
  }
  const userFound = users.find((user) => user.username == userCreds.username);
  if (!userFound) {
    return res.status(403).json({error: 'Username/password invalid'});
  }
  if (userFound.password === userCreds.password) {
    res.json({message: 'Logged in successfully', user: userFound});
  } else {
    return res.status(403).json({error: 'Username/password invalid'});
  }
};

export {getUsers, getUserById, postUser, putUser, postLogin, deleteUser};
