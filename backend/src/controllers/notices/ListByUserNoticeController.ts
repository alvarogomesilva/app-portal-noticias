import { Request, Response } from "express";
import { ListByUserNoticeService } from "../../services/notices/ListByUserNoticeService";

export class ListByUserNoticeController {
    async handle(req: Request, res: Response) {
        const userId = req.userId

        try {
            const notices = await ListByUserNoticeService({userId})
            return res.json(notices)
        } catch (error) {
            console.log(error)
        }
    }
}