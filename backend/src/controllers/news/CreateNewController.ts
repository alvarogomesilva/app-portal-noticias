import { Request, Response } from "express";
import { CreateNewService } from "../../services/news/CreateNewService";


export class CreateNewController {

    async handle(req: Request, res: Response)  {
        const userId = req.userId
        const { title, description, image } = req.body
        try {
            const news = await CreateNewService({ title, description, image, userId })
            return res.json(news)
        } catch (error) {
            console.log(error)
        }        
    }
}