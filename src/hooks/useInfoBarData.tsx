import React from 'react';
import axios from 'axios';

interface useInfoBarDataResponse {
    data: null | {
        isFrontCameraOn: boolean,
        isFrontPlateRecoginitionOn: boolean,
        diskUsage_free: number,
        diskUsage_total: number,
        diskUsage_used: number,
        isRearCameraOn: boolean,
        isRearPlateRecoginitionOn: boolean
    },
    isLoading: boolean,
    axiosOperation: (params:object) => void
}
export const useInfoBarData = ():useInfoBarDataResponse => {
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const axiosOperation = async (params:any) => {
        try {
            setIsLoading(true);
            const result = await axios.request(params);
            setData(result.data);
        } catch (error) {
            setData(null);
        } finally {
            setIsLoading(false);
        }
    }
    return {data, isLoading, axiosOperation};
}
