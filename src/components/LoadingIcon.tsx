import React from 'react';
import { Icon } from 'react-native-elements'
import { ActivityIndicator, Dimensions, View } from 'react-native';

interface LoadingIconProps {
    color: string
}

export const LoadingIcon = ({color}:LoadingIconProps ) => {
    return (
        <View style={{
            backgroundColor: 'transparent', 
            top: Dimensions.get("screen").height / 4,
            left: Dimensions.get("screen").width / 4,
            position: 'absolute',
            }}>
            <ActivityIndicator size={200} color={color}/>
        </View>
    )
}