import React from 'react';
import { View, StyleSheet, Text, Animated } from "react-native";
import { Icon } from 'react-native-elements';
import { useInfoBarData } from '../hooks/useInfoBarData';
import { useIsFocused } from '@react-navigation/native';
import { ThemeContext } from '../contexts/ThemeContext';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

interface InfoBarParams {
    onInfoBarUpdate: (data:any) => void
}

const InfoBar = ({onInfoBarUpdate}: InfoBarParams):JSX.Element => {
    const [ update, callUpdate ] = React.useState(0);
    const { data, isLoading, axiosOperation } = useInfoBarData();
    const appsettingscontext = React.useContext(AppSettingsContext);
    const themecontext = React.useContext(ThemeContext);
    const isFocused = useIsFocused();
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: themecontext.first,
            flexWrap: 'wrap'
        },
        group: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
            width: 100,
        },
        text: {
            color: themecontext.sixth,
            fontSize: 17,
            marginLeft: 2,
        }
    });
    //API calls invoker
    React.useEffect(() => {
        let interval = setInterval(() => {
            callUpdate(update => update + 1);
        }, parseInt(appsettingscontext.InfoBarUpdateInterval));
        return () => clearInterval(interval)
    }, [isFocused, appsettingscontext.InfoBarUpdateInterval]);

    //API calls
    React.useEffect(() => {
        axiosOperation({
            method: 'GET',
            url: appsettingscontext.UrlToRpi + '/utils/infobar'
        });
    }, [update])

    //Animation on API CALL
    const fadeAnim = React.useRef(new Animated.Value(1)).current;
    React.useEffect(() => {
        Animated.sequence([
            Animated.timing(
                fadeAnim, { toValue: 0.6, duration: 300, useNativeDriver: true}
            ),
            Animated.timing(
                fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true}
            )
        ]).start();
    }, [update])

    //After api call update send it to parent
    React.useEffect(() => {
        onInfoBarUpdate(data);
    }, [data])

    return (
        <>
                <Animated.View style={{...styles.container, opacity: fadeAnim}}>
                    <View style={styles.group}>
                        <Icon
                            tvParallaxProperties
                            name={"wifi"}
                            type={'ionicon'}
                            color={data === null ? themecontext.fourth : themecontext.second}
                            size={20}
                        />
                        <Text style={styles.text}>RPI</Text>
                    </View>
                    {data !== null
                        ?
                            <>
                                <View style={styles.group}>
                                    <Icon
                                        tvParallaxProperties
                                        name={"videocam"}
                                        type={'ionicon'}
                                        color={ data['isRearCameraOn'] ? themecontext.second : themecontext.fifth}
                                        size={20}/>
                                    <Text style={styles.text}>RCAM</Text>
                                </View>
                                <View style={styles.group}>
                                    <Icon
                                        tvParallaxProperties
                                        name={"cog"}
                                        type={'ionicon'}
                                        color={ data['isRearPlateRecoginitionOn'] ? themecontext.second : themecontext.fifth}
                                        size={20}/>
                                    <Text style={styles.text}>RAI</Text>
                                </View>
                                <View style={styles.group}>
                                    <Icon
                                        tvParallaxProperties
                                        name={"cube"}
                                        type={'ionicon'}
                                        color={ data['diskUsage_free'] > parseInt(appsettingscontext.MemoryLimitIndicator) ? themecontext.second : themecontext.fifth}
                                        size={20}/>
                                    <Text style={styles.text}>MEM</Text>
                                </View>
                                <View style={styles.group}>
                                    <Icon
                                        tvParallaxProperties
                                        name={"videocam"}
                                        type={'ionicon'}
                                        color={ data['isFrontCameraOn'] ? themecontext.second : themecontext.fifth}
                                        size={20}/>
                                    <Text style={styles.text}>FCAM</Text>
                                </View>
                                <View style={styles.group}>
                                    <Icon
                                        tvParallaxProperties
                                        name={"cog"}
                                        type={'ionicon'}
                                        color={ data['isFrontPlateRecoginitionOn'] ? themecontext.second : themecontext.fifth}
                                        size={20}/>
                                    <Text style={styles.text}>FAI</Text>
                                </View>
                            </>
                        : null
                    }
                </Animated.View>
        </>
    )
}
export default InfoBar;
