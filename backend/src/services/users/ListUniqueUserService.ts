import { Prisma } from "../../prisma"


export const ListUniqueUserService = async ({ userId }: { userId: string }) => {

    const user = await Prisma.user.findUnique({
        where: { id: userId }
    })

    return user
}