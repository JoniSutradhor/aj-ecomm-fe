# aj-ecomm-fe

AJ e-commerce front end, a single page React app.

The structure and conventions follow the reference product `paperturn_dashboard`, with two differences:

- **Vite** instead of webpack
- **Redux (Redux Toolkit)** instead of zustand

# Development

The api is `aj-ecomm-be` (NestJS + PostgreSQL), start it first. Sign in at `/login` with the admin account from the back end `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).

```
nvm use
npm install
cp .env.example .env
npm run start
```

| Script              | What it does                                                   |
| ------------------- | -------------------------------------------------------------- |
| `npm run start`     | Dev server, opens the browser (`npm run dev` does not open it) |
| `npm run build`     | Type-check and production build to `dist`                      |
| `npm run preview`   | Serve the production build                                     |
| `npm run lint`      | ESLint (`lint-fix` to auto fix)                                |
| `npm run format`    | Prettier                                                       |
| `npm run typecheck` | `tsc -b`                                                       |
| `npm run test`      | Vitest (no test cases yet)                                     |

## .env

Only `VITE_*` variables are exposed to the app. They are read in one place: `src/utils/config.ts`.

```
VITE_API_URL=http://localhost:8080/api
VITE_API_TIMEOUT=20000
VITE_DEFAULT_LANGUAGE=en
VITE_CURRENCY=USD
```

## General

`vite` - build and dev server - [vite.dev](https://vite.dev/)

`react` - user interfaces library - [react.dev](https://react.dev/)

`redux toolkit` - state manager - [redux-toolkit.js.org](https://redux-toolkit.js.org/)

`react-router` - url routing - [reactrouter.com](https://reactrouter.com/home)

`material-ui` - UI framework - [mui.com](https://mui.com/)

`axios` - promise based HTTP client - [axios-http.com](https://axios-http.com/docs/intro)

`react-hook-form` + `zod` - forms and validation

`sass` - CSS extension

`eslint` + `prettier` - lint and formatting

## Storefront

Public pages, inside `layouts/Storefront` (header with search, cart and sign in, footer). They use the public `/api/store/*` endpoints, which only return active products.

| Route             | Page                  | What it does                                                                      |
| ----------------- | --------------------- | --------------------------------------------------------------------------------- |
| `/`               | `pages/Home`          | Hero, shop by category, new arrivals                                              |
| `/shop`           | `pages/Shop`          | Product grid: search, category, sort, paging (12 per page, in the url)            |
| `/products/:slug` | `pages/ProductDetail` | Gallery, price / sale, stock, quantity, add to cart                               |
| `/cart`           | `pages/Cart`          | Line items, quantity, remove, subtotal                                            |
| `/checkout`       | `pages/Checkout`      | Delivery form (prefilled when signed in), summary, place order (cash on delivery) |
| `/orders/track`   | `pages/OrderTrack`    | Thank you page after checkout, or look up an order by number + email              |
| `/account/orders` | `pages/MyOrders`      | Signed in customers: their orders, cancel a pending order                         |
| `/register`       | `pages/Register`      | Customer sign up (login is `/login`)                                              |

The cart is the `store/cart` Redux slice, saved in `localStorage` (`aj_cart`). Items are snapshots (name, price, stock when added), quantity never goes above that stock. Checkout works for guests and signed in customers. `utils/orderLimits.ts` mirrors the api validation limits (99 per line, 50 lines, field lengths, password 8-72) so the UI never sends something the api rejects. The client never sends prices, the api re-prices and re-checks stock at checkout.

## Admin area

Everything under `/admin` is for administrators only (`AuthGuard` with `roles`), inside `layouts/Dashboard` (sidebar + top bar).

| Route                                        | Page                | What it does                                                                |
| -------------------------------------------- | ------------------- | --------------------------------------------------------------------------- |
| `/admin`                                     | `pages/Dashboard`   | Stock summary cards, products that need restocking                          |
| `/admin/products`                            | `pages/Products`    | Product list: search, status / category / low stock filters, paging, delete |
| `/admin/products/new`, `/admin/products/:id` | `pages/ProductEdit` | Create / edit form, images, stock card with recent changes                  |
| `/admin/categories`                          | `pages/Categories`  | Category list, create / edit dialog, delete                                 |
| `/admin/stock`                               | `pages/Stock`       | Stock levels with adjust dialog, and the full stock history                 |

List filters and paging live in the url (`useFilterChange`, `useProductsFilter`), so they survive a reload and can be shared. Stock only changes through `components/StockAdjustDialog`, never by editing a product.

## Folder structure

- `public` - Static assets, copied as is to the build. Reference them with `assetUrl('/file.svg')`.

- `src` - All source code.

    - `api` - One file per backend domain, `ajApi{Domain}.ts`. Only calls `Requester`, no state.

    - `components` - Reusable components.

    - `core_components` - Non reusable components used once for system / structure purpose. Example: `App`, `AppRoot`, `ThemeProvider`.

    - `hooks` - All hooks. Hooks wrap store / api access for the components.

    - `icons` - Icon wrappers.

    - `layouts` - Page layouts.

    - `pages` - Route pages.

    - `routes` - Route definitions (`index.ts`), router config, route components.

    - `store` - Redux state: one folder per slice, see below.

    - `test_utils` - Test helpers.

    - `theme` - MUI theme related files.

    - `types` - TypeScript type definitions.

    - `utils` - Helpers and utilities.

## Aliases

Aliases are bare specifiers and are declared **once** in `tsconfig.app.json` (`paths`). Vite reads them from there (`resolve.tsconfigPaths`), so there is nothing else to keep in sync.

```TS
import Logo from 'components/Logo'
import App from 'core_components/App'
import useAuthUser from 'hooks/useAuthUser'
import MainLayout from 'layouts/Main'
import Home from 'pages/Home'
import routes from 'routes/index'
import store from 'store/index'
import { setNewAuthData } from 'store/authUser/actions'
import { UserObjectType } from 'types/user'
import { assetUrl } from 'utils/url'
```

A directory alias needs a file path (`routes/index`, `store/index`), the bare `'store'` does not resolve.

To add a new alias add it to `paths` in `tsconfig.app.json`.

## Store (Redux)

Each slice lives in `store/{slice}` and has the same 3 files as in the reference:

- `index.ts` - the slice (`createSlice`), the state type and the default state. Default export is the reducer.

- `actions.ts` - imperative helpers (`store.dispatch(...)`, side effects like cookies / API calls). Usable outside React.

- `selectors.ts` - `(state: RootState) => ...` selectors.

New slice: create the folder, then register the reducer in `store/index.ts`.

Components never touch the store directly, they use a hook that wraps it (`hooks/useAuthUser`, `hooks/useAppSettings`) built on the typed `useAppSelector` / `useAppDispatch`.

## Components, testids and routing

- A component is a folder with an `index.tsx`.

- Testids are defined in `TESTIDS` inside the component file and are only exposed via `addTestIds`:

```TSX
const TESTIDS = { LOGO: 'logo' };

export default addTestIds(Logo, TESTIDS);
```

- Pages and layouts are lazy loaded in `routes/routerConfig.tsx`. Use `PageLoader` for pages (shows the top progress bar) and `SuspensedComponent` for everything else.

- New route: add a `Route` in `routes/index.ts`, create the page in `pages/`, register it in `routes/routerConfig.tsx`. Wrap protected routes with `components/AuthGuard`.

## Api

All requests go through `utils/requester.ts`. It adds the bearer token, unwraps `response.data` and rejects with `ErrorWithStatus`.

```TS
import Requester from 'utils/requester';

export const getProducts = (): Promise<ProductObjectType[]> =>
    Requester.get('/products');
```

## Material UI

### Colors

Only the colors in `CUSTOM_COLORS` (`theme/theme.tsx`) should be used. They are available in the theme palette and as css variables:

```TSX
<CircularProgress color="grey900" />
<Box sx={{ border: `1px solid ${cssColor('grey200')}` }} />
```

To add a color add it to `CUSTOM_COLORS`.

### Typography

Only these variants are allowed: `h1`, `h2`, `h3`, `text1`, `text2`, `text3`, `text4`. If something else is needed add it to the theme.

```TSX
<Typography color="textPrimary" variant="text3">
    {`${user?.fname} ${user?.lname}`}
</Typography>
```

## Code style

Prettier (4 spaces, single quotes, es5 trailing commas) and ESLint. Run `npm run lint` and `npm run typecheck` before pushing.

## Testing

Vitest, jsdom and Testing Library are installed and configured (`vite.config.ts`, `src/test_utils/setupTests.ts`). No test cases have been written yet. When they are added, follow the reference conventions: tests in a `__tests__` folder next to the tested file, named `{filename}.test.(ts|tsx)`.
