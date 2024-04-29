import { Router } from "express";
import { CreateUserController } from "../controllers/users/CreateUserController";
import { AuthUserController } from "../controllers/users/AuthUserController";
import { DetailUserController } from "../controllers/users/DetailUserController";
import { auth } from "../middlewares/auth";

const Route = Router()

Route.post('/user', new CreateUserController().handle)
Route.post('/login', new AuthUserController().handle)

Route.get('/user', auth, new DetailUserController().handle)


export default Route
