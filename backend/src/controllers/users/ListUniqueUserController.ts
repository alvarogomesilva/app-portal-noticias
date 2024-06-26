import { Request, Response } from "express";
import { ListUniqueUserService } from "../../services/users/ListUniqueUserService";

export class ListUniqueUserController {

    async handle(req: Request, res: Response) {
        try {
            const { userId } = req.params
            const user = await ListUniqueUserService({ userId })
            return res.json(user)
        } catch (error) {
            console.log(error)
        }
    }
}