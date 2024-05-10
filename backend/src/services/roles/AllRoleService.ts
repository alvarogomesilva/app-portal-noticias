import { Prisma } from "../../prisma"


export const AllRoleService = async () => {

    try {
        const roles = await Prisma.role.findMany()
        return roles
    } catch (error) {
        console.log(error)
    }
}