import { useEffect, useState } from "react";
import { OrderBookData } from "../../model";
import { useRecoilValue } from "recoil";
import { GlobalExchangeState } from "@/app/recoil/globalExchange";
import { DEFAULT_ORDER_BOOK } from "@/app/constant";

export const useOrderBookImpl = () => {

    const [orderBookData, setOrderBookData] = useState<OrderBookData>(DEFAULT_ORDER_BOOK);
    const updateOrderBookData = (latestData: OrderBookData) => {
      setOrderBookData(latestData);
    }
    const {selectedPair} = useRecoilValue(GlobalExchangeState);
    const sumAskVolume = orderBookData.asks.reduce((total, [, secondValue]) => total + parseFloat(secondValue), 0);
    const sumBidVolume = orderBookData.bids.reduce((total, [, secondValue]) => total + parseFloat(secondValue), 0);

    useEffect(() => {  
      const closeSocket = () => {
        socket.close();
      }
      const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedPair.toLowerCase()}@depth20`);

      socket.onmessage = function (event) {    
        let data: OrderBookData;
        if(event.data) {
          data = JSON.parse(event.data)
          updateOrderBookData(data);
        }
      };
      socket.onerror = function (error) {
        console.log(`WebSocket error: ${error}`);
      };

      return () => {
        closeSocket();
        setOrderBookData(DEFAULT_ORDER_BOOK);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPair])

    const state = {orderBookData, sumAskVolume, sumBidVolume}
    return {state}
}