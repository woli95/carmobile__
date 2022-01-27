import React from 'react';
import axios from 'axios';

interface useVideoFilenamesResponse {
    data: Array<[string, number]> | null
    isLoading: boolean,
    axiosOperation: (params:object) => void
}
export const useVideoFilenames = ():useVideoFilenamesResponse => {
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
