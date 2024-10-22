import { INotice } from "../../@types";
import { Prisma } from "../../prisma";



export const CreateNoticeService = async ({ title, description, image, userId }: INotice) => {
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