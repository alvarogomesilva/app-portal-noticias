import { Prisma } from "../../prisma";
import { hashSync } from "bcryptjs";


interface IUser {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    avatar?: string;
    roleId: number;
}

export const CreateUserService = async ({
    name,
    lastname,
    email,
    phone,
    password,
    avatar,
    roleId }: IUser) => {

    if (!name) return { message: 'Name is required!' }
    if (!lastname) return { message: 'LastName is required!' }
    if (!email) return { message: 'Email is required!' }
    if (!phone) return { message: 'Phone is required!' }
    if (!password) return { message: 'Password is required!' }
    if (!roleId) return { message: 'Type User is required!' }

    const userAlredyExists = await Prisma.user.findFirst({
        where: { email: email }
    })

    if (userAlredyExists) return { message: 'User alredy exists!' }

    const passwordHash = hashSync(password, 8)

    const user = await Prisma.user.create({
        data: { name, lastname, email, phone, password: passwordHash, roleId }
    })

    return user
}