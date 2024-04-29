import { Router } from "express";
import { CreateUserController } from "../controllers/users/CreateUserController";
import { AuthUserController } from "../controllers/users/AuthUserController";

const Route = Router()

Route.post('/users', new CreateUserController().handle)
Route.post('/login', new AuthUserController().handle)

export default Route
