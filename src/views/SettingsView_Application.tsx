import React from 'react';
import { StyleSheet, SafeAreaView, Text, ScrollView, StatusBar} from 'react-native';
import SettingsColorCustomizationItem from '../components/SettingsColorCustomizationItem';
import { SettingsTextInputButton } from '../components/SettingsTextInputButton';
import { AppSettingsContext, AppSettingsDispatchContext } from '../contexts/AppSettingsContext';
import { ThemeContext } from '../contexts/ThemeContext';
import RNCToastMessage from '../native/ToastMessage';

const SettingsView_Application = () => {
    const themecontext = React.useContext(ThemeContext);
    const appsettingscontext = React.useContext(AppSettingsContext);
    const appsettingsdispatchcontext = React.useContext(AppSettingsDispatchContext);

    const styles = StyleSheet.create({
        safeareaview: {
            flex: 1,
            paddingTop: StatusBar.currentHeight
        },
        container: {
            backgroundColor: themecontext.first,
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        },
        categoryText: {
            fontSize: 20,
            letterSpacing: 3,
            color: themecontext.second,
            textAlign: 'center',
            backgroundColor: themecontext.first,
        },
        backButton: {
            backgroundColor: themecontext.fourth,
            alignSelf: 'flex-end'
        }
    });

    const handleSettingsChange = (val:string, property:string) => {
        let does_updated:boolean = false;
        if (val.length === 0) {
            RNCToastMessage.showToast("Empty value.", RNCToastMessage.LONG)
            return
        }
        switch(property) {
            case "InfoBarInterval":
                if (!/^-?\d+$/.test(val))
                    RNCToastMessage.showToast("Interval has to be number.", RNCToastMessage.LONG);
                else if (parseInt(val) <= 500)
                RNCToastMessage.showToast("Interval has to be larger than 500 ms.", RNCToastMessage.LONG);
                else {
                    appsettingsdispatchcontext.set({...appsettingscontext, InfoBarUpdateInterval: val});
                    does_updated = true;
                }
                break;
            case "MemoryLimitIndicator":
                if (!/^-?\d+$/.test(val))
                    RNCToastMessage.showToast("Memory indicator has to be number.", RNCToastMessage.LONG);
                else if (parseInt(val) <= 1)
                    RNCToastMessage.showToast("Memory indicator has to be 2Gb at least.", RNCToastMessage.LONG);
                else {
                    appsettingsdispatchcontext.set({...appsettingscontext, MemoryLimitIndicator: val});
                    does_updated = true;
                }
                break;
            case "UrlToRpi":
                appsettingsdispatchcontext.set({...appsettingscontext, UrlToRpi: val});
                does_updated = true;
                break;
            case "UrlToFrontCamViewStreamingFile":
                appsettingsdispatchcontext.set({...appsettingscontext, UrlToFrontCamViewStreamingFile: val});
                does_updated = true;
                break;
            case "UrlToRearCamViewStreamingFile":
                appsettingsdispatchcontext.set({...appsettingscontext, UrlToRearCamViewStreamingFile: val});
                does_updated = true;
                break;
        }
        does_updated === true ? RNCToastMessage.showToast("Connection settings property updated.", RNCToastMessage.LONG) : null;
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <Text style={styles.categoryText}>RPI CONNECTION SETTINGS</Text>
                <SettingsTextInputButton 
                    keyboardType={"numeric"}
                    title={'Set interval timeout between API calls checking connection with RPI (miliseconds)'} 
                    onSubmit={(val) => handleSettingsChange(val, 'InfoBarInterval')}
                    placeholder={appsettingscontext.InfoBarUpdateInterval}/>
                <SettingsTextInputButton 
                    keyboardType={"numeric"}
                    title={'Set the limit of the available memory indicator on the header bar (gigabytes)'} 
                    onSubmit={(val) => handleSettingsChange(val, 'MemoryLimitIndicator')}
                    placeholder={appsettingscontext.MemoryLimitIndicator}/>
                <SettingsTextInputButton
                    keyboardType={"visible-password"}
                    title={'Set URL to RPI server'}
                    onSubmit={(val) => handleSettingsChange(val, 'UrlToRpi')}
                    placeholder={appsettingscontext.UrlToRpi}/>
                <SettingsTextInputButton
                    keyboardType={"visible-password"}
                    title={'Set URL to RPI front camera stream file'}
                    onSubmit={(val) => handleSettingsChange(val, 'UrlToFrontCamViewStreamingFile')}
                    placeholder={appsettingscontext.UrlToFrontCamViewStreamingFile}/>
                <SettingsTextInputButton
                    keyboardType={"visible-password"}
                    title={'Set URL to RPI rear camera stream file'}
                    onSubmit={(val) => handleSettingsChange(val, 'UrlToRearCamViewStreamingFile')}
                    placeholder={appsettingscontext.UrlToRearCamViewStreamingFile}/>
                <Text style={styles.categoryText}>APP VISUAL SETTINGS</Text>
                <SettingsColorCustomizationItem/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SettingsView_Application;