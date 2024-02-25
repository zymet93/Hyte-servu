import Express from 'express';
import {
  getUserById,
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

const userRouter = Express.Router();

// list users
userRouter.get('/', authenticateToken, getUsers);
// update user
userRouter.put('/', authenticateToken, putUser);
// user registration
userRouter.post('/', postUser);

// get info of a user
userRouter.get('/:id', authenticateToken, getUserById);

userRouter.delete('/:id', authenticateToken, deleteUser);

export default userRouter;
