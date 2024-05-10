import { unlink } from "fs/promises"
import { Prisma } from "../../prisma"
import { resolve } from "path"

export const DeleteUserService = async ({ userId }: { userId: string }) => {
    if (!userId) return { message: 'UserId inválid!' }
    
    try {
        const user = await Prisma.user.delete({
            where: { id: userId }
        })
        await unlink(resolve(__dirname, '..', '..', '..', 'uploads', user.avatar))
        return user
    } catch (error) {
        console.log(error)
    }
}