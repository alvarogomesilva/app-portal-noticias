export type RootState = {
    user: TUser
}


// Types User

export type UserState = {
    token: string | null;
    isAuthenticated: boolean;
    currentUser: object;
}

export type TCurrentUser = {
    id: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    photo: string;
    roleId: number;
}

export type TUser = {
    token: null | string;
    currentUser: TCurrentUser | null;
    isAuthenticated: boolean;
}

// Type Login

export type TLogin = {
    email: string;
    password: string;
}