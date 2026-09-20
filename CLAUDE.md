# aj-ecomm-fe

## Rule: follow the reference product

Everything in this project must follow the patterns of the reference product at `D:\devspike\paperturn_dashboard` (folder layout, bare aliases, `addTestIds` + `TESTIDS`, `SuspensedComponent` / `PageLoader` lazy routing, `Requester` + `api/*` files, hooks wrapping the store, MUI theme with custom typography, prettier 4-space / single quote).

Before building anything new, look at how the reference does the equivalent (component, hook, page, api file, store slice) and mirror it.

Differences from the reference:

- Build tool is **Vite**. Ignore everything webpack / babel / storybook-webpack.
- State is **Redux Toolkit**, not zustand. Keep the reference's `store/{slice}/{index,actions,selectors}.ts` layout.
- Env vars are `VITE_*`, read only in `src/utils/config.ts`.
- Not carried over on purpose: Paperturn translation service, Chargebee / Intercom / Amplitude, Paperturn API envelope, brand colors.

## Conventions

- Aliases are bare (`components/*`, `store/*`, ...) and live only in `tsconfig.app.json`. Use `store/index`, `routes/index` (a bare directory alias does not resolve).
- Colors only from `CUSTOM_COLORS` in `theme/theme.tsx`; typography only `h1-h3`, `text1-text4`.
- No test cases for now (the user asked to skip them). Vitest is configured for later.
- Logo / icons are the default Vite ones for now (`public/favicon.svg`); the user will replace them.
- Run `npm run typecheck`, `npm run lint` and `npm run build` after changes.

See `README.md` for the full structure.
