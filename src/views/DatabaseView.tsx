import React from "react";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ViewProps } from "../constants";
import SettingsView_Application from "./SettingsView_Application";
import SettingsView_Rpi from "./SettingsView_Rpi";
import { ThemeContext } from "../contexts/ThemeContext";
import { Icon } from "react-native-elements";
import { DatabaseView_Logs } from "./DatabaseView_Logs";
import { DatabaseView_Plates } from "./DatabaseView_Plates";
import { DatabaseView_Videos } from "./DatabaseView_Videos";

const Tab = createBottomTabNavigator();

const DatabaseView = ({navigation, route}:ViewProps) => {
    const themecontext = React.useContext(ThemeContext);
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
    return (
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
    )
}
export default DatabaseView;