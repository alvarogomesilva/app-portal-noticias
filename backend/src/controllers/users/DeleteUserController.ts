import { Request, Response } from "express";
import { DeleteUserService } from "../../services/users/DeleteUserService";

export class DeleteUserController {

    async handle(req: Request, res: Response) {
        try {
            const { userId } = req.params
            const user = await DeleteUserService({ userId })
            return res.json(user)
        } catch (error) {
            console.log(error)
        }
    }
}