import React from "react";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ViewProps } from "../constants";
import SettingsView_Application from "./SettingsView_Application";
import SettingsView_Rpi from "./SettingsView_Rpi";
import { ThemeContext } from "../contexts/ThemeContext";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

const SettingsView = ({navigation, route}:ViewProps) => {
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
                                        name="mobile-alt"  
                                        type="fontisto"
                                        color={themecontext.sixth}
                                        size={25}/>
                        },
                        tabBarLabel: "APP",
                    }}
                name="SettingsView_Application" 
                component={SettingsView_Application}
            />
            <Tab.Screen 
               options={
                   {
                       ...optionsForScreen,
                       tabBarIcon: () => {
                        return <Icon 
                                    tvParallaxProperties 
                                    name="raspberry-pi"  
                                    type="fontisto"
                                    color={themecontext.sixth}
                                    size={25}/>
                    },
                    tabBarLabel: "RPI",
                   }
               }
            name="SettingsView_Rpi" 
            component={SettingsView_Rpi}/>
        </Tab.Navigator>
    )
}
export default SettingsView;