/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
 * https://javascript.plainenglish.io/extend-material-ui-theme-in-typescript-a462e207131f
 */
import merge from 'lodash/merge';
import { createTheme } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { SimplePaletteColorOptions } from '@mui/material/styles';

const baseTheme = createTheme();
const { augmentColor } = baseTheme.palette;

export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
};

export const DIRECTIONS = {
    LTR: 'ltr',
    RTL: 'rtl',
};

export const BREAKPOINTS = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
};

export const isXS = (width = window.innerWidth) => width < BREAKPOINTS.sm;
export const isSM = (width = window.innerWidth) =>
    width >= BREAKPOINTS.sm && width < BREAKPOINTS.md;
export const isMD = (width = window.innerWidth) =>
    width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
export const isLG = (width = window.innerWidth) =>
    width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl;
export const isXL = (width = window.innerWidth) =>
    width >= BREAKPOINTS.xl && width < BREAKPOINTS.xxl;
export const isXXL = (width = window.innerWidth) => width >= BREAKPOINTS.xxl;

/**
 * Only colors listed here are allowed to be used in the app.
 * They are available in the theme palette and as css variables (`cssColor`).
 * Add the brand colors here.
 */
export const CUSTOM_COLORS = {
    black: '#050f10',
    white: '#ffffff',
    grey1000: '#3d3d3d',
    grey900: '#5c5c5c',
    grey800: '#707070',
    grey700: '#858585',
    grey600: '#999999',
    grey500: '#adadad',
    grey400: '#c2c2c2',
    grey300: '#d6d6d6',
    grey200: '#ebebeb',
    grey100: '#f8f8f8',
};

export type CustomColorName = keyof typeof CUSTOM_COLORS;

type CustomColors = Record<CustomColorName, SimplePaletteColorOptions>;

export type CustomColorNames = Record<CustomColorName, true>;

const customPalette = Object.fromEntries(
    Object.entries(CUSTOM_COLORS).map(([name, main]) => [
        name,
        augmentColor({
            color: {
                main,
                contrastText:
                    name === 'white'
                        ? CUSTOM_COLORS.black
                        : CUSTOM_COLORS.white,
            },
            name: name as CustomColorName,
        }),
    ])
) as CustomColors;

const theme = {
    typography: {
        fontFamily: 'var(--font-family-body)',
        h1: {
            fontWeight: 700,
            fontSize: 32,
            lineHeight: 40 / 32,
            fontFamily: 'var(--font-family-heading)',
        },
        h2: {
            fontWeight: 700,
            fontSize: 24,
            lineHeight: 32 / 24,
            fontFamily: 'var(--font-family-heading)',
        },
        h3: {
            fontWeight: 700,
            fontSize: 18,
            lineHeight: 24 / 18,
            fontFamily: 'var(--font-family-heading)',
        },
        text1: {
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 24 / 16,
            fontFamily: 'var(--font-family-body)',
        },
        text2: {
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 24 / 14,
            fontFamily: 'var(--font-family-body)',
        },
        text3: {
            fontWeight: 400,
            fontSize: 12,
            lineHeight: 16 / 12,
            fontFamily: 'var(--font-family-body)',
        },
        text4: {
            fontWeight: 400,
            fontSize: 10,
            lineHeight: 16 / 10,
            fontFamily: 'var(--font-family-body)',
        },
    },
    palette: {
        ...customPalette,
    },
    breakpoints: {
        values: BREAKPOINTS,
    },
    aj: {
        topbarHeight: 56,
    },
};

const themesOptions = {
    [THEMES.LIGHT]: {
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    ':root': Object.fromEntries(
                        Object.entries(CUSTOM_COLORS).map(([name, main]) => [
                            `--${name}`,
                            main,
                        ])
                    ),
                    '*': {
                        boxSizing: 'border-box',
                    },
                    html: {
                        MozOsxFontSmoothing: 'grayscale',
                        WebkitFontSmoothing: 'antialiased',
                        height: '100%',
                        width: '100%',
                    },
                    body: {
                        height: '100%',
                    },
                    '#__AJ_APP_ROOT__': {
                        height: '100%',
                    },
                    '#nprogress .bar': {
                        zIndex: '2000 !important',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                    },
                },
            },
        },
    },
    [THEMES.DARK]: {},
};

interface CustomVariants {
    h1: true;
    h2: true;
    h3: true;
    text1: true;
    text2: true;
    text3: true;
    text4: true;
}

export type ColorNames = OverridableStringUnion<
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | CustomColorName,
    CustomColorNames
>;

declare module '@mui/material/styles' {
    interface PaletteOptions extends CustomColors {}
    interface Palette extends CustomColors {}

    interface TypographyVariants {
        text1: React.CSSProperties;
        text2: React.CSSProperties;
        text3: React.CSSProperties;
        text4: React.CSSProperties;
    }
    interface TypographyVariantsOptions {
        text1?: React.CSSProperties;
        text2?: React.CSSProperties;
        text3?: React.CSSProperties;
        text4?: React.CSSProperties;
    }

    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        xxl: true;
    }
    interface Theme {
        aj: {
            topbarHeight: number;
        };
    }
}

declare module '@mui/material/Chip' {
    interface ChipPropsColorOverrides extends CustomColorNames {}
}

declare module '@mui/material/Badge' {
    interface BadgePropsColorOverrides extends CustomColorNames {}
}

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides extends CustomColorNames {}
}

declare module '@mui/material/SvgIcon' {
    interface SvgIconPropsColorOverrides extends CustomColorNames {}
}

declare module '@mui/material/CircularProgress' {
    interface CircularProgressPropsColorOverrides extends CustomColorNames {}
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides extends CustomColorNames {}
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides extends CustomVariants {}

    interface TypographyPropsColorOverrides extends CustomColorNames {}
}

export type ThemeMode = 'light' | 'dark';

export const getTheme = (themeMode: ThemeMode): any =>
    merge({}, themesOptions[themeMode], theme);

export const isDark = (themeData: { palette: { mode: string } }) =>
    themeData.palette.mode === THEMES.DARK;

export default theme;
