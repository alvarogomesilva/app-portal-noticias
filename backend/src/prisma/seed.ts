import { hashSync } from 'bcryptjs';
import { Prisma } from '.';

async function main() {
    const role1 = await Prisma.role.create({
        data: { type: 'admin' }
    })
    const role2 = await Prisma.role.create({
        data: { type: 'maintenance' }
    })
    const role3 = await Prisma.role.create({
        data: { type: 'user' }
    })

    const user1 = await Prisma.user.create({
        data: {
            name: 'Alvaro',
            lastname: 'Henrique',
            email: 'alvaro@gmail.com',
            phone: '(47) 9 9999-9999',
            password: hashSync('123', 8),
            avatar: null,
            roleId: 1
        }
    })
 
}

main()
    .then(async () => {
        await Prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await Prisma.$disconnect()
    })