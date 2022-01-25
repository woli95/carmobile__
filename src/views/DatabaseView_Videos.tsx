import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { Table, Row, Rows} from 'react-native-table-component';
import { Icon } from 'react-native-elements';
export const DatabaseView_Videos = () => {
    const themecontext = React.useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            backgroundColor: themecontext.first,
            height: '100%'
        }
    }); 
    return (
        <View style={styles.container}>
            
        </View>
    )
}

