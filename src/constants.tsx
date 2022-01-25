export const fonts = {
    'mainmenubuttonfont': 'serif'
}
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
export interface ViewProps {
    navigation: NavigationProp<ParamListBase>,
    route: RouteProp<{params: Object}, 'params'>
}




export const defaultAsyncStorageValues = {
    AppSettings: {
        InfoBarUpdateInterval: "5000",
        MemoryLimitIndicator: "3",
        UrlToRpi: "http://192.168.1.32:5000",
        UrlToFrontCamViewStreamingFile: "http://192.168.1.32:8080/stream/video.mjpeg",
        UrlToRearCamViewStreamingFile: "http://192.168.1.32:8080/stream/video.mjpeg"
    },
    Theme: {
        first: '#1a1a1d',
        second: '#c3073f',
        third: '#6f2232',
        fourth: '#950740',
        fifth: '#4e4e50',
        sixth: '#FFFFFF'
    }
}
