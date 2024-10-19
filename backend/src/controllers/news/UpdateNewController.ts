import { Request, Response } from "express";
import { unlink } from "fs/promises";
import sharp from "sharp";
import { UpdateNewService } from "../../services/news/UpdateNewService";

sharp.cache(false)

export class UpdateNewController {

    async handle(req: Request, res: Response) {

        const userId = req.userId
        const {idNew, title, description} = req.body
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
            const news = await UpdateNewService({idNew, userId, title, description, image: banner})
            return res.json(news)
        } catch (error) {
            console.log(error)
        }
    }

    
}