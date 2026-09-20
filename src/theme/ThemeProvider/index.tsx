import { CssBaseline, Theme } from '@mui/material';
import merge from 'lodash/merge';
import {
    createTheme as createMuiTheme,
    ThemeProvider as MuiThemeProvider,
    responsiveFontSizes as muiResponsiveFontSizes,
} from '@mui/material/styles';
import { ReactNode } from 'react';
import { DIRECTIONS, getTheme, ThemeMode, THEMES } from 'theme/theme';

interface ThemeConfig {
    direction?: string;
    responsiveFontSizes?: boolean;
    themeMode?: ThemeMode;
}

export interface ThemeProviderProps extends ThemeConfig {
    children?: ReactNode | ReactNode[];
}

const createTheme = (themeData: Theme, config: ThemeConfig = {}) => {
    let theme = createMuiTheme(
        merge(
            {},
            {
                shape: {
                    borderRadius: 8,
                },
                direction: config.direction,
            },
            themeData
        )
    );

    if (config.responsiveFontSizes) {
        theme = muiResponsiveFontSizes(theme);
    }

    return theme;
};

const ThemeProvider = ({
    children = null,
    direction = DIRECTIONS.LTR,
    responsiveFontSizes = false,
    themeMode = THEMES.LIGHT as ThemeMode,
}: ThemeProviderProps) => {
    const theme = createTheme(getTheme(themeMode), {
        direction,
        responsiveFontSizes,
        themeMode,
    });

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;
