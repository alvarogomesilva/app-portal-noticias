import { Router } from "express";
import { CreateUserController } from "../controllers/users/CreateUserController";

const Route = Router()

Route.post('/users', new CreateUserController().handle)

export default Route
