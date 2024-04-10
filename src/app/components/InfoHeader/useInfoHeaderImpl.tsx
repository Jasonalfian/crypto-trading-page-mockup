import { COLOR } from "@/app/constant";
import { TickerData } from "@/app/model";
import { GlobalExchangeState } from "@/app/recoil/globalExchange";
import { LatestPriceState } from "@/app/recoil/latestPriceState";
import { formatCurrency } from "@/app/utility/numeral";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useInfoHeaderImpl = () => {

    const [infoData, setInfoData] = useState<TickerData>()
    const setLatestPrice = useSetRecoilState(LatestPriceState);

    const isPositive = (data?: string) => {
        return parseFloat(data ? data : infoData?.P ?? '0') >= 0 
    }
    const {selectedPair} = useRecoilValue(GlobalExchangeState);

    useEffect(() => {  
      const closeSocket = () => {
        socket.close();
      }
      const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedPair.toLowerCase()}@ticker`);

      socket.onmessage = function (event) {    
        let data: TickerData;
        if(event.data) {
          data = JSON.parse(event.data)
          setInfoData(data);
          setLatestPrice({
            latestPrice: formatCurrency(data.c),
            latestPriceColor: isPositive(data.P) ? COLOR.GREEN : COLOR.RED,
            isPositive: isPositive(data.P) 
          })
        }
      };
      socket.onerror = function (error) {
        console.log(`WebSocket error: ${error}`);
      };

      return () => {
        closeSocket();
        setInfoData(undefined);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPair])
    const state = {infoData}

    return {state, isPositive}
}