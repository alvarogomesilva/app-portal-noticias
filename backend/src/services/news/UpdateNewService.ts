import { unlink } from "fs/promises";
import { INew } from "../../@types";
import { Prisma } from "../../prisma";
import { resolve } from "path";


export const UpdateNewService = async ({idNew, userId, title, description, image}: INew) => {
    if (!title) return { messageError: 'Title is required!' }
    if (!description) return { messageError: 'Description is required!' }
    if (!userId) return { messageError: 'User invalid!' }

    const bannerAlredyExists = await Prisma.new.findFirst({
        where: { id: +idNew },
        select: { image: true }
    })

    if (bannerAlredyExists.image !== null && image) {
        await unlink(resolve(__dirname, '..', '..', '..', 'uploads', 'banners', bannerAlredyExists.image))
    }

    try {
        const news = await Prisma.new.update({
            where: { id: +idNew },
            data: { title, description, image }
        })
        return news
    } catch (error) {
        console.log(error)
    }

}