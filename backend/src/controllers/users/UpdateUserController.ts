import { Request, Response } from "express";
import { UpdateUserService } from "../../services/users/UpdateUserService";
import sharp from "sharp";
import { unlink } from "fs/promises";

export class UpdateUserController {

    async handle(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const { name, lastname, email, phone } = req.body;
            
            let avatar: string | undefined;

            if (req.file) {
                const extension = req.file.mimetype.substring(6);
                const randomName = Math.floor(Math.random() * 999999999) + Date.now();
                await sharp(req.file.path)
                    .resize(250)
                    .toFile(`./uploads/${randomName}.${extension}`);

                avatar = `${randomName}.${extension}`;
                await unlink(req.file.path);
            } 

            const user = await UpdateUserService({ name, lastname, email, phone, avatar, userId });

            return res.json(user);
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}