import { unlink } from "fs/promises";
import { Prisma } from "../../prisma";
import { resolve } from "path";
import { IUpdateUser } from "../../@types";


export const UpdateUserService = async ({ idUser, name, lastname, email, phone, avatar, userId, roleId }: IUpdateUser) => {
    try {
        if (!userId) return { message: 'User invalid!' }
        if (!name) return { message: 'Name invalid!' }
        if (!lastname) return { message: 'Lastname invalid!' }
        if (!email) return { message: 'Email invalid!' }
        if (!phone) return { message: 'Phone invalid!' }

        const avatarAlredyExists = await Prisma.user.findFirst({
            where: { id: userId },
            select: { avatar: true }
        })

        if (avatarAlredyExists.avatar !== null && avatar) {
            await unlink(resolve(__dirname, '..', '..', '..', 'uploads', 'avatars', avatarAlredyExists.avatar))
        }

        let user;
        if (roleId && idUser) {
            user = await Prisma.user.update({
                data: { name, lastname, email, phone, avatar, roleId },
                where: { id: idUser },
                select: { id: true, lastname: true, name: true, email: true, phone: true, avatar: true, roleId: true }
            })
        } else {
            user = await Prisma.user.update({
                data: { name, lastname, email, phone, avatar },
                where: { id: userId },
                select: { id: true, lastname: true, name: true, email: true, phone: true, avatar: true, roleId: true }
            })
        }


        return user
    } catch (error) {
        console.log(error)
    }
}