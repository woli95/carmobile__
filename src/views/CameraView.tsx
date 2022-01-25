import React from "react";
import { Pressable, StatusBar } from "react-native";

import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { AppSettingsContext } from "../contexts/AppSettingsContext";
interface CameraViewProps {
    navigation: NavigationProp<ParamListBase>,
    route: RouteProp<{params: {cam:string}}, 'params'>
}

const CameraView = ({navigation, route}:CameraViewProps) => {
    const appsettingscontext = React.useContext(AppSettingsContext);

    return (
        <>
            <StatusBar hidden/>
            <Pressable 
                style={{width: '100%', height: '100%'}} 
                onLongPress={() => navigation.goBack()}>
                <WebView 
                    source={{ uri: route.params.cam === 'front' ? appsettingscontext.UrlToFrontCamViewStreamingFile : appsettingscontext.UrlToRearCamViewStreamingFile }} 
                    style={{ height: 500 }}/>

            </Pressable>
        </>
        
    )
}

export default CameraView;