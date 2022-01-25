import React from 'react';
import { Button } from 'react-native';
const SettingsView_Rpi = () => {

    const onPress = () => {
        console.log("We will invoke the native module here!");
    }
    return (
        <Button title='click to invoke native module'
                color="#841584"
                onPress={onPress}/>
    )
}

export default SettingsView_Rpi;