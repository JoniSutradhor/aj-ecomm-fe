import { Navigate } from 'react-router';
import useAuthUser from 'hooks/useAuthUser';
import routes from 'routes/index';
import { UserRoleEnum } from 'types/user';

/**
 * Entry point of the app. The storefront will live here, until it exists
 * admins are sent to the admin dashboard and everybody else to the login.
 */
const Home = () => {
    const { isRole } = useAuthUser();

    return (
        <Navigate
            to={
                isRole(UserRoleEnum.ADMIN)
                    ? routes.admin.path
                    : routes.login.path
            }
            replace
        />
    );
};

export default Home;
