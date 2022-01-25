import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultAsyncStorageValues } from '../constants';

export interface AppSettingsProps {
    InfoBarUpdateInterval: string,
    MemoryLimitIndicator: string
    UrlToRpi: string,
    UrlToFrontCamViewStreamingFile: string,
    UrlToRearCamViewStreamingFile: string,
}
export interface AppSettingsDispatchProps {
    get: () => void,
    set: (theme:AppSettingsProps) => void
}
export const useAppSettings = () => {
    const [settings, setSettings] = React.useState<AppSettingsProps>(defaultAsyncStorageValues.AppSettings);
    const [error, setError] = React.useState<any>(undefined);
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const methods = {
        get: async () => {
            await AsyncStorage.getItem("__AppSettings")
            .then((response) => {
                if (response !== null)
                setSettings(JSON.parse(response));
                else
                    throw new Error("useAppSettings: got null value");
            })
            .catch((error) => {
                setError(error);
                setSettings(defaultAsyncStorageValues.AppSettings)
            })
            .finally(() => {
                setLoading(false);
            });
        },
        set: async(settings:AppSettingsProps) => {
            await AsyncStorage.setItem("__AppSettings", JSON.stringify(settings))
            .then(() => {
                methods.get();
            });
        }
        
    }
    React.useEffect(() => {
        methods.get();
    }, []);
    return { settings, error, isLoading, methods };
}