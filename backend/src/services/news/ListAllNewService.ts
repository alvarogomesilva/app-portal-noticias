import { Prisma } from "../../prisma"

export const ListAllNewService = async () => {

    try {
        const news = await Prisma.new.findMany({
           select: {
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