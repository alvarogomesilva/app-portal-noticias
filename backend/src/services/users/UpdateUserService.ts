import { Prisma } from "../../prisma";

interface IUser {
    userId: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    avatar: string;

}

export const UpdateUserService = async ({ name, lastname, email, phone, avatar, userId }: IUser) => {
    if (!userId) return { message: 'User invalid!' }
    if (!name) return { message: 'Name invalid!' }
    if (!lastname) return { message: 'Lastname invalid!' }
    if (!email) return { message: 'Email invalid!' }
    if (!phone) return { message: 'Phone invalid!' }
    
    const user = await Prisma.user.update({
        data: { name, lastname, email, phone },
        where: { id: userId }
    })

    return user
}