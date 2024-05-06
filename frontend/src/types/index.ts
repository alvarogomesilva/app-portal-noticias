export type RootState = {
    user: TUser
}

// Types User
export type TAction = {
    type: 'user/login';
    payload: {
        userId: string;
    };
};

export type TUser = {
    currentUser: object | null;
    isAuthenticated: boolean;
}

// Type Login

export type TLogin = {
    email: string;
    password: string;
}