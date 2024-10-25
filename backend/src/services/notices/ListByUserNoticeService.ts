import { Prisma } from "../../prisma"

export const ListByUserNoticeService = async ({ userId }: { userId: string }) => {
    if (!userId) return { message: 'User invalid!' }

    const user = await Prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, roleId: true }
    })

    try {
        let notices;
        if (user.roleId === 1) {
            notices = await Prisma.new.findMany({
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
        } else {
            notices = await Prisma.new.findMany({
                where: { userId: user.id },
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
        }

        return notices
    } catch (error) {
        console.log(error)
    }
}