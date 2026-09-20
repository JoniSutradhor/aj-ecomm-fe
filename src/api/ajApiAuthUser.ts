import Requester from 'utils/requester';
import {
    GetAuthDataResponseType,
    LoginFieldsType,
    LoginResponseType,
} from 'types/user';

export const getAuthData = (): Promise<GetAuthDataResponseType> =>
    Requester.get<GetAuthDataResponseType>('/auth/session');

export const login = (fields: LoginFieldsType): Promise<LoginResponseType> =>
    Requester.post<LoginResponseType>('/auth/login', fields);
