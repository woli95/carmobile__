import React from 'react';
import { useTheme, ThemeProps } from '../hooks/useTheme';
import { defaultAsyncStorageValues } from '../constants';


const ThemeContext = React.createContext<ThemeProps>(defaultAsyncStorageValues.Theme);
const ThemeDispatchContext = React.createContext({get: () => {}, set: (theme:ThemeProps) => {}});
const ThemeProvider = ({children}:any) => {
    const { theme, isLoading, error, methods } = useTheme();
    return (
        <ThemeContext.Provider value={theme}>
            <ThemeDispatchContext.Provider value={methods}>
                {children}
            </ThemeDispatchContext.Provider>
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext, ThemeDispatchContext };