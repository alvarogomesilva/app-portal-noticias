import { Request, Response } from "express";
import { UpdateUserService } from "../../services/users/UpdateUserService";


export class UpdateUserController {

    async handle(req: Request, res: Response) {
        const userId = req.userId
        const { name, lastname, email, phone, avatar } = req.body

        const user = await UpdateUserService({name, lastname, email, phone, avatar, userId})

        return res.json(user)
    }
}