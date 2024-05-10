import { compareSync } from "bcryptjs";
import { Prisma } from "../../prisma";
import { sign } from "jsonwebtoken";
import { ILogin } from "../../@types";

export const AuthUserService = async ({ email, password }: ILogin) => {
    try {
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
            lastname: userExists.lastname,
            phone: userExists.phone,
            email: userExists.email,
            avatar: userExists.avatar,
            token: token,
            roleId: userExists.roleId
        }
    } catch (error) {
        console.log(error)
    }
}