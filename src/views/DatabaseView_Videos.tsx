import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { useVideoFilenames } from '../hooks/useVideoFilenames';
import { Table, Row} from 'react-native-table-component';
import { Icon } from 'react-native-elements';
import { AppSettingsContext } from '../contexts/AppSettingsContext';
import _ from 'lodash';
import axios from 'axios';
import RNCToastMessage from '../native/ToastMessage'
import { ViewProps } from '../constants';
import { LoadingIcon } from '../components/LoadingIcon';

export const DatabaseView_Videos = ({route, navigation}:ViewProps) => {
    const themecontext = React.useContext(ThemeContext);
    const appsettingscontext = React.useContext(AppSettingsContext);
    const {data, isLoading, axiosOperation} = useVideoFilenames();
    React.useEffect(() => {
        axiosOperation({
            method: 'GET',
            url: appsettingscontext.UrlToRpi + '/utils/videos'
        })
    }, []);
    const [tableHeaders, widthArray] = React.useMemo(() => {
        return [
                ["Date", "Time_s", "Duration", "", ""],
                [Dimensions.get("screen").width * 0.30,Dimensions.get("screen").width * 0.2,Dimensions.get("screen").width * 0.2,Dimensions.get("screen").width * 0.15,Dimensions.get("screen").width * 0.15]
            ];
    }, []);
    const styles = StyleSheet.create({
        container: {
            backgroundColor: themecontext.first,
            marginBottom: 60,
            width: '100%',
        },
        header: {
            backgroundColor: themecontext.second,
        },
        headerText: {
            paddingBottom: 5,
            paddingTop: 5,
            textAlign: 'center',
            fontSize: 15,
            color: themecontext.first,
            letterSpacing: 1
        },
        row: {

        },
        rowText: {
            textAlign: 'center',
            fontSize: 13,
            color: themecontext.sixth,
            paddingBottom: 10,
            paddingTop: 10,
        },
        filterAndInfoSectionContainer: {
        }
    }); 
    const handlePlayClick = (filename:string) => {
        navigation.navigate("CameraView", { url: appsettingscontext.UrlToRpi + '/utils/videos/' + filename });
    }
    const handleDeleteClick = (filename:string) => {
        Alert.alert(
            "Your are about to remove file from RPI memory",
            "Please confirm this operation.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Remove " + filename,
                    onPress: async () => handleFileRemoving(filename),
                    style: 'default'
                }
            ]
        );
    }
    const handleFileRemoving = async (filename:string) => {
        await axios.delete(appsettingscontext.UrlToRpi + '/utils/videos/' + filename).then(( response ) => {
            if (response.status === 200)
                RNCToastMessage.showToast("File was successfully removed from RPI memory", RNCToastMessage.LONG);
            else
                RNCToastMessage.showToast("DUPA", RNCToastMessage.LONG);
        }).catch(( error ) => {
            RNCToastMessage.showToast(error.toJSON().message, RNCToastMessage.LONG);
        }).finally(() => {
            axiosOperation({
                method: 'GET',
                url: appsettingscontext.UrlToRpi + '/utils/videos'
            });
        });
    }
    return (
        <>
            <View style={{flex: 1, backgroundColor: themecontext.first}}>
                <Table>
                    <Row 
                        data={tableHeaders} 
                        widthArr={widthArray}
                        style={styles.header} 
                        textStyle={styles.headerText}/>
                    {isLoading === true 
                        ? <LoadingIcon color={themecontext.fourth}/>
                        :
                            <SafeAreaView>
                                <ScrollView style={styles.container}>
                                    { 
                                    _.map(data, (item, idx) => {
                                        return (
                                            <Row 
                                                key={idx}
                                                widthArr={widthArray}
                                                style={styles.row}
                                                textStyle={styles.rowText}
                                                data={[
                                                    item[0].slice(0, 10).replace('_', '-').replace('_', '-'), 
                                                    item[0].slice(12, 14) + ":" + item[0].slice(14, 16), 
                                                    item[1], 
                                                    <Icon 
                                                        onPress={() => handlePlayClick(item[0])}
                                                        tvParallaxProperties 
                                                        name={"controller-play"} 
                                                        type={"entypo"} 
                                                        size={20} 
                                                        color={themecontext.fourth}/>, 
                                                    <Icon 
                                                        onPress={() => handleDeleteClick(item[0])}
                                                        tvParallaxProperties 
                                                        name={"trash"} 
                                                        type={"fontisto"} 
                                                        size={20} 
                                                        color={themecontext.fourth}/>
                                                ]}/>
                                        )
                                    })}
                                </ScrollView>
                            </SafeAreaView>
                    }
                </Table>
            </View>
        </>
    )
}

