import { Request, Response } from "express";
import { CreateNoticeService } from "../../services/notices/CreateNoticeService";
import sharp from "sharp";
import { unlink } from "fs/promises";

sharp.cache(false)

export class CreateNoticeController {

    async handle(req: Request, res: Response)  {
        const userId = req.userId
        const { title, description } = req.body

        let banner: string | undefined;

        if (req.file) {
            const extension = req.file.mimetype.substring(6);
            const randomName = Math.floor(Math.random() * 999999999) + Date.now();
            await sharp(req.file.path)
                .resize(400, 300)
                .toFile(`./uploads/banners/${randomName}.${extension}`);

            banner = `${randomName}.${extension}`;
            await unlink(req.file.path);
        } 

        try {
            const news = await CreateNoticeService({ title, description, image: banner, userId })
            return res.json(news)
        } catch (error) {
            console.log(error)
        }        
    }
}