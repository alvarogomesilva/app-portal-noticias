import { Prisma } from "../../prisma"

export const DetailUserService = async ({ userId }: { userId: string }) => {
    if (!userId) return { message: 'User invalid!' }

    const user = await Prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, lastname: true, name: true, email: true, phone: true, avatar: true, roleId: true }
    })

    return user
}