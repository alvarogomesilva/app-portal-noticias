import { Request, Response } from "express";
import { AllRoleService } from "../../services/roles/AllRoleService";

export class AllRoleController {

    async handle(req: Request, res: Response) {

        const roles = await AllRoleService()
        return res.json(roles)
    }
}