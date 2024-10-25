import { Request, Response } from "express";
import { ListOneNoticeService } from "../../services/notices/ListOneNoticeService";

export class ListOneNoticeController {

    async handle(req: Request, res: Response) {
        const { id } = req.params

        try {
            const notice = await ListOneNoticeService({id})
            return res.json(notice)
        } catch (error) {
            console.log(error)
        }
    }
}