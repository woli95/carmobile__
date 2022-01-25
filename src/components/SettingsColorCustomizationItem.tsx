import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { ThemeContext, ThemeDispatchContext } from '../contexts/ThemeContext';
import _ from 'lodash';
import { SettingsSubmitButton } from './SettingsSubmitButton';
import RNCToastMessage from '../native/ToastMessage';

const SettingsColorCustomizationItem = ():JSX.Element => {
    const themecontext = React.useContext(ThemeContext);
    const themedispatchcontext = React.useContext(ThemeDispatchContext);
    const [f, forceRefresh] = React.useState(false);
    const values = Array(6);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: themecontext.first,
            padding: 17.5,
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
            marginBottom: 20,
        },
        input: {
            backgroundColor: themecontext.fourth,
            color: themecontext.sixth,
            borderRadius: 5,
            paddingBottom: 0,
            paddingTop: 0,
            marginLeft: 15,
            marginRight: 15,
            width: 65,
            height: 25,
            textAlign: 'center',
        },
        text: {
            color: themecontext.sixth,
            fontWeight: '100',
            width: 125,
            textAlign: "left",
            fontSize: 15,
        },
    })
    const handleColorChange = (text:string, index:number) => {
        values[index] = text.toUpperCase();
    }
    const handleSubmit = (index:number) => {
        if (/^#([0-9A-F]{3}){1,2}$/i.test('#' + values[index])) {
            index === 0 
            ? themedispatchcontext.set({...themecontext, first: '#' + values[index]}) 
            : index === 1
                ? themedispatchcontext.set({...themecontext, second: '#' + values[index]}) 
                : index === 2
                    ? themedispatchcontext.set({...themecontext, third: '#' + values[index]})
                    : index === 3
                        ? themedispatchcontext.set({...themecontext, fourth: '#' + values[index]})
                        : index === 4
                            ? themedispatchcontext.set({...themecontext, fifth: '#' + values[index]}) 
                            : themedispatchcontext.set({...themecontext, sixth: '#' + values[index]})
            RNCToastMessage.showToast("Visual settings property was updated.", RNCToastMessage.LONG);
            forceRefresh(!f);
        }
    }
    return (
        <>
            <View style={styles.container}>
                {
                    _.map(Object.entries(themecontext), (entry, index) => {
                        return (
                            <View style={styles.row} key={index}>
                                <Text style={styles.text}>{entry[0].charAt(0).toUpperCase() + entry[0].slice(1)} color (hex)</Text>
                                <TextInput
                                    maxLength={6}
                                    placeholder={entry[1].replace("#", '')}
                                    placeholderTextColor={themecontext.first}
                                    style={styles.input} 
                                    keyboardType={"visible-password"} 
                                    onChange={event => handleColorChange(event.nativeEvent.text, index)}
                                    textAlignVertical={"center"}/>
                                <View 
                                    style={{
                                        width: 25, 
                                        height: 25, 
                                        backgroundColor: entry[1], 
                                        borderWidth: 2,
                                        marginRight: 15}}/>
                                <SettingsSubmitButton 
                                    propStyles={{
                                        onPush:() => handleSubmit(index)
                                        }}/>
                            </View>
                        )
                    })
                }
            </View>
        </>
    )
}

export default SettingsColorCustomizationItem;