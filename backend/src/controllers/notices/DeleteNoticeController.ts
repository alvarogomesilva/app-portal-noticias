import { Request, Response } from "express";
import { DeleteNoticeService } from "../../services/notices/DeleteNoticeService";

export class DeleteNoticeController {

    async handle(req: Request, res: Response) {
        const { id } = req.params

        try {
            const notice = await DeleteNoticeService({id})
            return res.json(notice)
        } catch (error) {
            console.log(error)
        }
    }
}