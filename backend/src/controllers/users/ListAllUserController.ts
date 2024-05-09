import { Request, Response } from "express";
import { ListAllUserService } from "../../services/users/ListAllUserService";


export class ListAllUserController {

    async handle(req: Request, res: Response) {
        const userId = req.userId
        const users = await ListAllUserService({userId})
        return res.json(users)
    }
} 