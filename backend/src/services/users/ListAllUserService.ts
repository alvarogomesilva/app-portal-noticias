import { Prisma } from "../../prisma"


export const ListAllUserService = async ({userId}: {userId: string}) => {

    const users = await Prisma.user.findMany({
        where: {
            NOT: {
                id: userId
            }
        }
    })
    
    return users
}