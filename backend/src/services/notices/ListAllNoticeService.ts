import { Prisma } from "../../prisma"

export const ListAllNoticeService = async () => {

    try {
        const news = await Prisma.new.findMany({
           select: {
            id: true,
            title: true,
            description: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    name: true,
                    avatar: true
                }
            }
           }
        })
        return news
    } catch (error) {
        console.log(error)
    }
}