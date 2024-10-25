import { Prisma } from "../../prisma"

export const ListOneNoticeService = async ({id}: {id: string}) => {

    if (!id) return { message: 'Notice invalid!' }

    try {
        const notice = await Prisma.new.findUnique({
            where: { id: +id }
        })

        return notice
    } catch (error) {
        console.log(error) 
    }
}