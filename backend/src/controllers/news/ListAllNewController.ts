import { Request, Response } from "express";
import { ListAllNewService } from "../../services/news/ListAllNewService";

export class ListAllNewController {
    async handle(req: Request, res: Response) {

        try {
            const news = await ListAllNewService()
            return res.json(news)
        } catch (error) {
            console.log(error)
        }
    }
}