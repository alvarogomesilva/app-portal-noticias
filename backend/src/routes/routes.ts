import { Router } from "express";
import { CreateUserController } from "../controllers/users/CreateUserController";
import { AuthUserController } from "../controllers/users/AuthUserController";
import { DetailUserController } from "../controllers/users/DetailUserController";
import { UpdateUserController } from "../controllers/users/UpdateUserController";
import { auth } from "../middlewares/auth";

import upload from "../config/multer";
import { AllRoleController } from "../controllers/roles/AllRoleController";
import { ListAllUserController } from "../controllers/users/ListAllUserController";


const Route = Router()

// Rotas de User
Route.post('/user', new CreateUserController().handle)
Route.post('/login', new AuthUserController().handle)

Route.get('/user', auth, new DetailUserController().handle)
Route.put('/user', auth, upload.single('avatar'), new UpdateUserController().handle)
Route.get('/users', auth, new ListAllUserController().handle)

// Rotas de Roles

Route.get('/roles', auth, new AllRoleController().handle)


export default Route
