import { compareSync } from "bcryptjs";
import { Prisma } from "../../prisma";

interface IUser {
    email: string;
    password: string;
}

export const AuthUserService = async ({email, password}: IUser) => {
    if (!email) return { message: 'Email is required!' }
    if (!password) return { message: 'Password is required!' }

    const userExists = await Prisma.user.findFirst({
        where: { email: email }
    })

    if (!userExists) return { message: 'Email/Password invalid!' }

    const passwordMatch = compareSync(password, userExists.password)

    if (!passwordMatch) return { message: 'Email/Password invalid!' }

    return { ok: true }
}