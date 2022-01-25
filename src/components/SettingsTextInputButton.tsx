import React from "react";
import { StyleSheet, View, Text, TextInput, Dimensions, Pressable, Keyboard, KeyboardTypeOptions} from 'react-native';
import { ThemeContext } from "../contexts/ThemeContext";
import { SettingsSubmitButton } from "./SettingsSubmitButton";


interface SettingsTextInputButtonParams {
    title: string,
    onSubmit: (number:string) => void,
    placeholder: string,
    keyboardType: KeyboardTypeOptions
}
export const SettingsTextInputButton = ({title, onSubmit, placeholder, keyboardType}:SettingsTextInputButtonParams):JSX.Element => {
    const [input, setInput] = React.useState('');
    const themecontext = React.useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: themecontext.first,
            alignItems: 'center',
            padding: 10,
        },
        text: {
            color: themecontext.sixth,
            fontWeight: '100',
            textAlign: "center",
            fontSize: 15,
        },
        rowContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'flex-end',
            width: 332.5,
        },
        input: {
            backgroundColor: themecontext.fourth,
            color: themecontext.sixth,
            borderRadius: 5,
            textAlign: 'center',
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 10,
            marginBottom: 10,
            // marginRight: 15,
            width: 260
        }
    })
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.rowContainer}>
            <TextInput 
                placeholder={placeholder}
                placeholderTextColor={themecontext.first}
                style={styles.input} 
                keyboardType={keyboardType} 
                onChange={event => setInput(event.nativeEvent.text)}
                textAlignVertical={"center"}
                />
            <SettingsSubmitButton propStyles={{
                onPush:() => {onSubmit(input); Keyboard.dismiss()}
            }}/>
            </View>
        </View>
    )
}