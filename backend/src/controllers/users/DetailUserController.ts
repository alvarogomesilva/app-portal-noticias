import { Request, Response } from "express";
import { DetailUserService } from "../../services/users/DetailUserService";

export class DetailUserController {

    async handle(req: Request, res: Response) {
        const userId = req.userId
        const user = await DetailUserService({userId})

        return res.json(user)
    }
}