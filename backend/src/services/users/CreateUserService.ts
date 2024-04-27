
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


    return { ok: true }
}