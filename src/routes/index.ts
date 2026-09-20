import { ReactNode } from 'react';
import { pathWithId } from 'utils/routes';

export interface routeShape {
    path: string;
    icon?: ReactNode;
    title: string;
    keywords?: string;
    description?: string;
}

export class Route {
    id: symbol;

    path: string;

    icon: ReactNode;

    title: string;

    description: string;

    keywords: string;

    constructor({
        path = '',
        icon = null,
        title = '',
        description = '',
        keywords = '',
    }: routeShape) {
        this.id = Symbol(path);
        this.path = path;
        this.icon = icon;
        this.title = title;
        this.description = description;
        this.keywords = keywords;
    }

    pathWithId(id: string | number, param = 'id') {
        return pathWithId(this.path, id, param);
    }

    toString() {
        return this.path;
    }
}

const routes = {
    notFound404: new Route({
        path: '/not-found',
        icon: null,
        title: 'Not found',
    }),
    home: new Route({
        path: '/',
        icon: null,
        title: 'Home',
    }),
    shop: new Route({
        path: '/shop',
        icon: null,
        title: 'Shop',
    }),
    product: new Route({
        path: '/products/:slug',
        icon: null,
        title: 'Product',
    }),
    cart: new Route({
        path: '/cart',
        icon: null,
        title: 'Cart',
    }),
    checkout: new Route({
        path: '/checkout',
        icon: null,
        title: 'Checkout',
    }),
    orderTrack: new Route({
        path: '/orders/track',
        icon: null,
        title: 'Track order',
    }),
    myOrders: new Route({
        path: '/account/orders',
        icon: null,
        title: 'My orders',
    }),
    register: new Route({
        path: '/register',
        icon: null,
        title: 'Create account',
    }),
    login: new Route({
        path: '/login',
        icon: null,
        title: 'Sign in',
    }),
    admin: new Route({
        path: '/admin',
        icon: null,
        title: 'Dashboard',
    }),
    adminProducts: new Route({
        path: '/admin/products',
        icon: null,
        title: 'Products',
    }),
    adminProductNew: new Route({
        path: '/admin/products/new',
        icon: null,
        title: 'New product',
    }),
    adminProductEdit: new Route({
        path: '/admin/products/:id',
        icon: null,
        title: 'Edit product',
    }),
    adminCategories: new Route({
        path: '/admin/categories',
        icon: null,
        title: 'Categories',
    }),
    adminStock: new Route({
        path: '/admin/stock',
        icon: null,
        title: 'Stock',
    }),
};

export default routes;
