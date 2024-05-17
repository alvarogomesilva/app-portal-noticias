import { INew } from "../../@types";
import { Prisma } from "../../prisma";



export const CreateNewService = async ({ title, description, image, userId }: INew) => {
    try {
        const news = await Prisma.new.create({
            data: { title, description, image, userId }
        })
        return news
    } catch (error) {
        console.log(error)
    }
}