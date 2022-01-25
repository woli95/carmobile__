import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultAsyncStorageValues } from '../constants';

export interface ThemeProps {
    first: string,
    second: string,
    third: string,
    fourth: string,
    fifth: string,
    sixth: string
}

export const useTheme = () => {
    const [theme, setTheme] = React.useState<ThemeProps>(() => defaultAsyncStorageValues.Theme);
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<any>(undefined);
    const methods = {
        get: async () => {
            await AsyncStorage.getItem("__Theme")
            .then((response) => {
                if (response !== null)
                    setTheme(JSON.parse(response));
                else
                    throw new Error("useTheme: got null value");
            })
            .catch((error) => {
                setError(error);
                setTheme(defaultAsyncStorageValues.Theme)
            })
            .finally(() => {
                setLoading(false);
            });
        },
        set: async(theme:ThemeProps) => {
            await AsyncStorage.setItem("__Theme", JSON.stringify(theme))
            .then(() => {
                methods.get();
            });
        }
    }
    React.useEffect(() => {
        methods.get();
    }, []);
    return { theme, isLoading, error, methods };
}