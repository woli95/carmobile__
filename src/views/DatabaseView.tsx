import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ViewProps } from "../constants";
import { ThemeContext } from "../contexts/ThemeContext";
import { Icon } from "react-native-elements";
import { DatabaseView_Plates } from "./DatabaseView_Plates";
import { DatabaseView_Videos } from "./DatabaseView_Videos";
import { useInfoBarData } from "../hooks/useInfoBarData";
import { AppSettingsContext } from "../contexts/AppSettingsContext";

const Tab = createBottomTabNavigator();

const DatabaseView = ({navigation, route}:ViewProps) => {
    const themecontext = React.useContext(ThemeContext);
    const appsettingscontext = React.useContext(AppSettingsContext);
    const optionsForScreen:BottomTabNavigationOptions = {
                    headerShown: false,
                    tabBarLabelStyle: {
                        color: themecontext.sixth,
                        fontSize: 16,
                        letterSpacing: 1
                    },
                    tabBarActiveBackgroundColor: themecontext.second,
                    tabBarLabelPosition: "beside-icon",
                    tabBarStyle: {
                        borderTopWidth: 0,
                        backgroundColor: themecontext.first,
                    }
    }
    const styles = StyleSheet.create({
        DBInfoContainer: {
            backgroundColor: themecontext.first,
        },
        column: {
            flexDirection: 'column'
        },
        row: {
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center',
            // justifyContent: 'space-evenly'
        }
    })
    const {data: header_data, isLoading: header_isLoading, axiosOperation: header_axiosOperation} = useInfoBarData();
    React.useEffect(() => {
        const interval = setInterval(() => {
            header_axiosOperation({
                method: 'get',
                url: appsettingscontext.UrlToRpi + '/utils/usagebar'
            });
        }, parseInt(appsettingscontext.InfoBarUpdateInterval));
        return () => clearInterval(interval);
    }, []);
    return (
        <>
        <View style={styles.DBInfoContainer}>
            <View style={styles.column}>
                <View style={styles.row}>
                    {/* DISK SPACE FOR DATABASE USAGE*/}
                        <Icon 
                            style={{marginLeft: 10}}
                            tvParallaxProperties
                            name="sd-storage"
                            type="material"
                            color={themecontext.fourth}
                            size={20}>
                        </Icon>
                        {/* hdd_usage: number,
        hdd_free: number,
        hdd_video_usage: number,
        hdd_plates_usage: number,
        ram_usage: number,
        ram_free: number */}
                    <Text style={{fontSize: 12, color: 'white', textAlign: 'center', width: 90}}>TOTAL: 30GB</Text>
                    <Text style={{fontSize: 12, color: 'white', textAlign: 'left', width: 90}}>{header_data ? "FREE: " + header_data['hdd_free'] + "GB" : <ActivityIndicator size={15} color={themecontext.fourth}/>}</Text>
                    <Text style={{fontSize: 12, color: 'white', textAlign: 'left', width: 80}}>{header_data ? "USED: " + header_data['hdd_usage'] + "GB" : <ActivityIndicator size={15} color={themecontext.fourth}/>}</Text>
                </View>
                <View style={styles.row}>
                    {/* RAM USAGE*/}
                <Icon 
                        style={{marginLeft: 10}}
                        tvParallaxProperties
                        name="memory"
                        type="material"
                        color={themecontext.fourth}
                        size={20}/>
                    <Text style={{fontSize: 12, color: 'white', textAlign: 'center', width: 90}}>TOTAL: 30GB</Text>
                    <Text style={{fontSize: 12, color: 'white', textAlign: 'left', width: 90}}>{header_data ? "FREE: " + header_data['ram_free'] + "MiB" : <ActivityIndicator size={15} color={themecontext.fourth}/>}</Text>
                    <Text style={{fontSize: 12, color: 'white', textAlign: 'left', width: 80}}>{header_data ? "USED: " + header_data['ram_usage'] + "MiB" : <ActivityIndicator size={15} color={themecontext.fourth}/>}</Text>
                </View>
            </View>
        </View>
        <Tab.Navigator>
            <Tab.Screen 
                options={
                    {
                        ...optionsForScreen, 

                        tabBarIcon: () => {
                            return <Icon 
                                        tvParallaxProperties 
                                        name="movie-filter"  
                                        type="material"
                                        color={themecontext.sixth}
                                        size={25}/>
                        },
                        tabBarLabel: "Videos",
                    }}
                name="DatabaseView_Videos" 
                component={DatabaseView_Videos}
            />
            <Tab.Screen 
               options={
                   {
                       ...optionsForScreen,
                       tabBarIcon: () => {
                        return <Icon 
                                    tvParallaxProperties 
                                    name="ios-car-sport"  
                                    type="ionicon"
                                    color={themecontext.sixth}
                                    size={25}/>
                    },
                    tabBarLabel: "Plates",
                   }
               }
            name="DatabaseView_Plates" 
            component={DatabaseView_Plates}/>
        </Tab.Navigator>
        </>
    )
}
export default DatabaseView;