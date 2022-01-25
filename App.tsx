import React from "react";
import { View,  } from 'react-native';

import MainMenu from "./src/views/MainMenu";
import CameraView from "./src/views/CameraView";
import SettingsView from "./src/views/SettingsView";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";


import { ThemeContext, ThemeProvider } from "./src/contexts/ThemeContext";
import { AppSettingsProvider } from "./src/contexts/AppSettingsContext";
import DatabaseView from "./src/views/DatabaseView";

const Stack = createNativeStackNavigator();
export default function App() {
  const themecontext = React.useContext(ThemeContext);
  return (
    <NavigationContainer>
        <ThemeProvider>
        <AppSettingsProvider>
          <View style={{flex: 1, backgroundColor: themecontext.first}}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: themecontext.second
                },
              }}
              initialRouteName={"MainMenu"}>
              <Stack.Screen
                name="MainMenu"
                component={MainMenu}/>
              <Stack.Screen
                name="SettingsView"
                component={SettingsView}/>
              <Stack.Screen
                name="CameraView"
                component={CameraView}
                options={{
                  orientation: 'landscape',
                  statusBarHidden: true
                  }}/>
              <Stack.Screen
                name="DatabaseView"
                component={DatabaseView}/>
            </Stack.Navigator>
          </View>
        </AppSettingsProvider>
        </ThemeProvider>
    </NavigationContainer>
  )
}
