import { INew } from "../../@types";
import { Prisma } from "../../prisma";



export const CreateNewService = async ({ title, description, image, userId }: INew) => {
    if (!title) return { messageError: 'Title is required!' }
    if (!description) return { messageError: 'Description is required!' }
    if (!userId) return { messageError: 'User invalid!' }
    
    try {
        const news = await Prisma.new.create({
            data: { title, description, image, userId }
        })
        return news
    } catch (error) {
        console.log(error)
    }
}