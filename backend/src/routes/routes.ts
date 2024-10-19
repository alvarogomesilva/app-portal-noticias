import { Router } from "express";
import { CreateUserController } from "../controllers/users/CreateUserController";
import { AuthUserController } from "../controllers/users/AuthUserController";
import { DetailUserController } from "../controllers/users/DetailUserController";
import { UpdateUserController } from "../controllers/users/UpdateUserController";
import { auth } from "../middlewares/auth";

import upload from "../config/multer";
import { AllRoleController } from "../controllers/roles/AllRoleController";
import { ListAllUserController } from "../controllers/users/ListAllUserController";
import { ListUniqueUserController } from "../controllers/users/ListUniqueUserController";
import { DeleteUserController } from "../controllers/users/DeleteUserController";
import { CreateNewController } from "../controllers/news/CreateNewController";
import { ListAllNewController } from "../controllers/news/ListAllNewController";


const Route = Router()

// Rotas de User
Route.post('/user', new CreateUserController().handle)
Route.post('/login', new AuthUserController().handle)

Route.get('/me', auth, new DetailUserController().handle)
Route.get('/user/:userId', auth, new ListUniqueUserController().handle)
Route.put('/user', auth, upload.single('avatar'), new UpdateUserController().handle)
Route.get('/users', auth, new ListAllUserController().handle)
Route.delete('/user/:userId', auth, new DeleteUserController().handle)

// Rotas de Roles

Route.get('/roles', auth, new AllRoleController().handle)

// Rotas de News
Route.post('/new', auth, upload.single('banner'), new CreateNewController().handle)
Route.get('/news', new ListAllNewController().handle)

export default Route
