import { Prisma } from "../../prisma"

export const ListUniqueUserService = async ({ userId }: { userId: string }) => {

    if (!userId) return { message: 'UserId invalid!' }

    try {
        const user = await Prisma.user.findUnique({
            where: { id: userId }
        })

        return user
    } catch (error) {
        console.log(error)
    }
}