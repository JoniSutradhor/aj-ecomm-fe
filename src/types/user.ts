export enum UserRoleEnum {
    CUSTOMER = 'customer',
    ADMIN = 'admin',
}

export interface UserObjectType {
    id: number;
    email: string;
    fname: string;
    lname: string;
    role: UserRoleEnum;
}

export interface GetAuthDataResponseType {
    user: UserObjectType | null;
    token?: string;
}
