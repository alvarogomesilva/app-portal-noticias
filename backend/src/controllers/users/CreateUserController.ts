import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserService";

export class CreateUserController {

    async handle(req: Request, res: Response) {
        const { name, lastname, email, phone, password, roleId } = req.body
        const user = await CreateUserService({ name, lastname, email, phone, password, roleId })
        return res.json(user)
    }

}