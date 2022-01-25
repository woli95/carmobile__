import React from 'react';
import { defaultAsyncStorageValues } from '../constants';
import { AppSettingsProps, useAppSettings, AppSettingsDispatchProps } from '../hooks/useAppSettings';


const AppSettingsContext = React.createContext<AppSettingsProps>(defaultAsyncStorageValues.AppSettings);
const AppSettingsDispatchContext = React.createContext<AppSettingsDispatchProps>({get:() => {}, set:() => {}});

const AppSettingsProvider = ({children}:any) => {
    const { settings, error, isLoading, methods } = useAppSettings();
    
    return (
        <AppSettingsContext.Provider value={settings}>
            <AppSettingsDispatchContext.Provider value={methods}>
                {children}
            </AppSettingsDispatchContext.Provider>
        </AppSettingsContext.Provider>
    )
}

export { AppSettingsProvider, AppSettingsContext, AppSettingsDispatchContext };