import Requester from 'utils/requester';
import {
    GetAuthDataResponseType,
    LoginFieldsType,
    LoginResponseType,
    RegisterFieldsType,
} from 'types/user';

export const getAuthData = (): Promise<GetAuthDataResponseType> =>
    Requester.get<GetAuthDataResponseType>('/auth/session');

export const login = (fields: LoginFieldsType): Promise<LoginResponseType> =>
    Requester.post<LoginResponseType>('/auth/login', fields);

/** Public sign up always creates a customer. */
export const register = (
    fields: RegisterFieldsType
): Promise<LoginResponseType> =>
    Requester.post<LoginResponseType>('/auth/register', fields);
