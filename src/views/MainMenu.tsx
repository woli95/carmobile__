import React from "react";
import { View, StyleSheet} from "react-native";
import MainMenuButton from "../components/MainMenuButton";
import InfoBar from "../components/InfoBar";

import { ThemeContext } from "../contexts/ThemeContext";
import { AppSettingsContext } from "../contexts/AppSettingsContext";

const MainMenu = ({ navigation }: any): JSX.Element => {

    const themecontext = React.useContext(ThemeContext);
    const appsettingscontext = React.useContext(AppSettingsContext);
    const styles = StyleSheet.create({
        container: {
            paddingTop: 30,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignContent: 'stretch',
            height: '100%',
            backgroundColor: themecontext.first
        },
    });
    const [infoBarValues, setInfoBarValues] = React.useState(null);
    return (
        <>
            <InfoBar onInfoBarUpdate={setInfoBarValues}/>
            <View style={styles.container}>
                <MainMenuButton text={"SETTINGS"} onPress={() => {navigation.navigate('SettingsView')}} disabled={false}/>
                <MainMenuButton text={"DATABASE"} onPress={() => {navigation.navigate('DatabaseView')}} disabled={infoBarValues === null ? true : false}/>
                <MainMenuButton text={"SHOW FRONT CAM VIEW"} onPress={() => {navigation.navigate('CameraView', {url: appsettingscontext.UrlToFrontCamViewStreamingFile})}} disabled={infoBarValues === null ? true : !infoBarValues['isFrontCameraOn']}/>
                <MainMenuButton text={"SHOW REAR CAM VIEW"} onPress={() => {navigation.navigate('CameraView', {url: appsettingscontext.UrlToRearCamViewStreamingFile})}} disabled={infoBarValues === null ? true : !infoBarValues['isRearCameraOn']}/>
        </View>
        </>
    )
}
export default MainMenu;
