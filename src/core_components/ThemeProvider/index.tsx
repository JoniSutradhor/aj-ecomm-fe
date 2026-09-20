import { ReactNode } from 'react';
import { DIRECTIONS, ThemeMode, THEMES } from 'theme/theme';
import DashboardThemeProvider from 'theme/ThemeProvider';

export interface ThemeProviderProps {
    children: ReactNode | ReactNode[];
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return (
        <DashboardThemeProvider
            direction={DIRECTIONS.LTR}
            responsiveFontSizes={true}
            themeMode={THEMES.LIGHT as ThemeMode}
        >
            {children}
        </DashboardThemeProvider>
    );
};

export default ThemeProvider;
