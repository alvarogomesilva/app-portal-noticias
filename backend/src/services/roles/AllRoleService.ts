import { Prisma } from "../../prisma"


export const AllRoleService = async () => {
    
    const roles = await Prisma.role.findMany()
    return roles
}