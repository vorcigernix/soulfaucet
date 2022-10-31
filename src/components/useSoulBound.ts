import { useState, useEffect } from 'react';


export type SoulApiResponse = {
    status: Number;
    statusText: String;
    data: any;
    error: any;
    loading: Boolean;
    isEligible: Boolean;
};

const baseUrl = "https://faucet-api.ethbrno.cz/lookup?addr="

export const useApiGet = (addr: string): SoulApiResponse => {
    const [status, setStatus] = useState<Number>(0);
    const [statusText, setStatusText] = useState<String>('');
    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isEligible, setIsEligible] = useState<boolean>(false);

    const getAPIData = async () => {
        setLoading(true);
        try {
            const apiResponse = await fetch(baseUrl + addr);
            const json = await apiResponse.json();
            setStatus(apiResponse.status);
            setStatusText(apiResponse.statusText);
            setData(json);
        } catch (error) {
            setError(error);
        }
        //console.log(data.tokenId)
        if (data?.tokenId) setIsEligible(true);
        setLoading(false);

    };

    useEffect(() => {
        getAPIData();
    }, []);

    return { status, statusText, data, error, loading, isEligible };
};