export interface ILogin {
    email: string;
    password: string;
}

export interface IUser {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    avatar?: string;
    roleId: number;
}

export interface IUpdateUser {
    idUser: string;
    userId: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    avatar?: string;
    roleId: number
}

export interface INotice {
    idNew?: string;
    title: string;
    description: string;
    image?: string;
    userId: string;
}