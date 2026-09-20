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

export interface LoginFieldsType {
    email: string;
    password: string;
}

export interface RegisterFieldsType extends LoginFieldsType {
    fname: string;
    lname: string;
}

export interface LoginResponseType {
    user: UserObjectType;
    token: string;
}
