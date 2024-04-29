import { compareSync } from "bcryptjs";
import { Prisma } from "../../prisma";
import { sign } from "jsonwebtoken";

interface IUser {
    email: string;
    password: string;
}

export const AuthUserService = async ({ email, password }: IUser) => {
    if (!email) return { message: 'Email is required!' }
    if (!password) return { message: 'Password is required!' }

    const userExists = await Prisma.user.findFirst({
        where: { email: email }
    })

    if (!userExists) return { message: 'Email/Password invalid!' }

    const passwordMatch = compareSync(password, userExists.password)

    if (!passwordMatch) return { message: 'Email/Password invalid!' }


    const token = sign({ name: userExists.name, email: userExists.email }, process.env.JWT_SECRET, {
        subject: userExists.id,
        expiresIn: '30d'
    })

    return { 
        id: userExists.id, 
        name: userExists.name, 
        email: userExists.email,
        avatar: userExists.avatar,
        token: token, 
        roleId: userExists.roleId
     }
}