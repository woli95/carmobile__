import React from "react";
import { View, StyleSheet} from "react-native";
import MainMenuButton from "../components/MainMenuButton";
import InfoBar from "../components/InfoBar";

import { ThemeContext } from "../contexts/ThemeContext";

const MainMenu = ({ navigation }: any): JSX.Element => {

    const themecontext = React.useContext(ThemeContext);
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
                <MainMenuButton text={"WTF"} onPress={() => {navigation.navigate('DatabaseView')}} disabled={infoBarValues === null ? true : false}/>
                <MainMenuButton text={"SHOW FRONT CAM VIEW"} onPress={() => {navigation.navigate('CameraView', {cam: 'front'})}} disabled={infoBarValues === null ? true : !infoBarValues['isFrontCameraOn']}/>
                <MainMenuButton text={"SHOW REAR CAM VIEW"} onPress={() => {navigation.navigate('CameraView', {cam: 'rear'})}} disabled={infoBarValues === null ? true : !infoBarValues['isRearCameraOn']}/>
        </View>
        </>
    )
}
export default MainMenu;
