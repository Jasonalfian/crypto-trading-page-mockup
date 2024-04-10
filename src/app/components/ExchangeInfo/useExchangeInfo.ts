import axios from "axios";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { GlobalExchangeState } from "@/app/recoil/globalExchange";
import { ExchangeData } from "@/app/model";

export const useExchangeInfo = () => {

    const exchangeInfoUrl = 'https://api.binance.com/api/v3/ticker/24hr'
    const setGlobalExchange = useSetRecoilState(GlobalExchangeState);

    const [searchField, setSearchField] = useState('');
    const [exchangeData, setExchangeData] = useState<ExchangeData[]>([]);

    const onRowClick = (key: string) => {
        setGlobalExchange({
            selectedPair: key
        })
    }

    const onFieldChange = (value: string) => {
        setSearchField(value.toUpperCase());
    }

    useEffect(() => {

        const fetchExchangeInfo = () => {
            axios.get(exchangeInfoUrl).then((res) => {
                const exchangeData = res.data
                const testList : ExchangeData[] = [];
                if(exchangeData){
                    exchangeData.map((singleData: ExchangeData) => {
                        if(singleData.symbol.includes('USDT')){
                            testList.push(singleData);
                        }
                    })
                }
                setExchangeData(testList);
            })
        }

        fetchExchangeInfo()
        const intervalId = setInterval(() => {
            fetchExchangeInfo();
        }, 5000)

        return () => {
            clearInterval(intervalId);
        }
    },[])

    const state = {exchangeData, searchField}
    return {state, onRowClick, onFieldChange}
}