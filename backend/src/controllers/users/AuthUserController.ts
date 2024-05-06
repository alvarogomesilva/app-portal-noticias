import { Request, Response } from "express";
import { AuthUserService } from "../../services/users/AuthUserService";

export class AuthUserController {

    async handle(req: Request, res: Response) {
        const { email, password } = req.body
        const user = await AuthUserService({ email, password })
        return res.json(user)
    }
}