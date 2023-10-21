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

export interface UserContext_{
    id: string,
    username: string,
    email: string,
    name: string,
    admin: boolean,
    picture: any,
    activeMember: boolean,
    created: Date,
    updated: Date,
    token: string
}
export interface UserContextType{
    user: UserContext_ | null,
    setUser: (user: UserContext_ | null) => void,
}