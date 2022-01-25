import { toPlainObject } from 'lodash';
import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { ThemeContext } from '../contexts/ThemeContext';


interface SettingsSubmitButtonProps {
    propStyles: {
        onPush: () => void
    }
}
export const SettingsSubmitButton = ({propStyles}:SettingsSubmitButtonProps) => {
    const themecontext = React.useContext(ThemeContext);
    const styles = StyleSheet.create({
        button: {
            backgroundColor: themecontext.first,
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 5,
            height: 25,
            width: 70
        },
    })
    return (
        <Pressable style={styles.button} onPress={propStyles.onPush}>
            <Icon tvParallaxProperties name="edit" type="feather" color={themecontext.fourth} size={25}/>
        </Pressable>
    )
}