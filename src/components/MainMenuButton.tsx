import React from 'react';
import { Pressable, StyleSheet, Text } from "react-native";
import { fonts } from '../constants';
import { ThemeContext } from '../contexts/ThemeContext';
interface MainMenuButton {
    text:string,
    onPress:(event:any) => void,
    disabled: boolean
}

const MainMenuButton = ({text, onPress, disabled}: MainMenuButton):JSX.Element => {
    const themecontext = React.useContext(ThemeContext);
    const styles = StyleSheet.create({
        button: {
            backgroundColor: themecontext.second,
            borderWidth: 2,
            borderColor: themecontext.fourth,
            borderStyle: 'dashed',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            width: 150,
            height: 150,
        },
        text: {
            color: themecontext.sixth,
            fontSize: 19,
            fontFamily: fonts.mainmenubuttonfont,
            textAlign: 'center',
            fontWeight: 'bold',
            letterSpacing: 3,
    
        },
    })
    return (
        <Pressable onPress={onPress} style={{...styles.button, backgroundColor: disabled === false ? themecontext.second : themecontext.third}} disabled={disabled}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}


export default MainMenuButton;
