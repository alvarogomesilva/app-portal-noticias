import { Router } from "express";
import { CreateUserController } from "../controllers/users/CreateUserController";
import { AuthUserController } from "../controllers/users/AuthUserController";
import { DetailUserController } from "../controllers/users/DetailUserController";
import { UpdateUserController } from "../controllers/users/UpdateUserController";
import { auth } from "../middlewares/auth";

import upload from "../config/multer";


const Route = Router()

Route.post('/user', new CreateUserController().handle)
Route.post('/login', new AuthUserController().handle)

Route.get('/user', auth, new DetailUserController().handle)
Route.put('/user', auth, upload.single('avatar'), new UpdateUserController().handle)


export default Route
