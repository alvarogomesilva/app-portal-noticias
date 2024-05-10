import { Prisma } from "../../prisma"

export const ListAllUserService = async ({ userId }: { userId: string }) => {

    if (!userId) return { message: 'UserId invalid!' }

    try {
        const users = await Prisma.user.findMany({
            where: {
                NOT: {
                    id: userId
                }
            }
        })

        return users
    } catch (error) {
        console.log(error)
    }
}