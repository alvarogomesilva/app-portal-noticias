import { Request, Response } from "express";
import { ListAllNoticeService } from "../../services/notices/ListAllNoticeService";

export class ListAllNoticeController {
    async handle(req: Request, res: Response) {

        try {
            const news = await ListAllNoticeService()
            return res.json(news)
        } catch (error) {
            console.log(error)
        }
    }
}