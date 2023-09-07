export interface User{
    username: string,
    email: string,
    emailVisibility?: boolean,
    password: string,
    passwordConfirm: string,
    name: string
}

export interface UserPatch{
    username?: string,
    email?: string,
    emailVisibility?: boolean,
    password?: string,
    passwordConfirm?: string,
    name?: string,
    oldPassword?: string
}