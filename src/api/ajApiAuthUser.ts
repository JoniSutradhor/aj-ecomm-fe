import Requester from 'utils/requester';
import { GetAuthDataResponseType } from 'types/user';

// TODO: adjust the endpoint to the real backend contract
export const getAuthData = (): Promise<GetAuthDataResponseType> =>
    Requester.get<GetAuthDataResponseType>('/auth/session');
