import { Prisma } from "../../prisma"

export const DeleteNoticeService = async ({id}: {id: string}) => {
    if (!id) return { message: 'Notice invalid!' }
    
    try {
        const notice = await Prisma.new.delete({
            where: { id: +id }
        })

        return notice
    } catch (error) {
        console.log(error)
    }
}