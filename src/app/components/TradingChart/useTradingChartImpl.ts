import { useEffect, useRef, useState } from "react";
import { CandleSeriesData, KLineData, VolumeSeriesData } from "../../model";
import axios from 'axios';
import { useRecoilValue } from "recoil";
import { GlobalExchangeState } from "@/app/recoil/globalExchange";
import { COLOR } from "@/app/constant";

export const useTradingChartImpl = () => {
    const {selectedPair} = useRecoilValue(GlobalExchangeState);
    const [kLineRange, setKlineRange] = useState('1m');
    const [chartRange, setChartRange] = useState('15m');

    const changeKLineRange = (range: string) => {
      setChartRange(range);
      setKlineRange(range);
    }

    const chartContainerRef = useRef<HTMLDivElement|null>(null);
    const candleSeriesRef = useRef<any>();
    const volumeSeriesRef = useRef<any>();

    useEffect(() => {  
      const closeSocket = () => {
        socket.close();
      }
      const socket = new WebSocket(`wss://stream.binance.com/stream?streams=${selectedPair.toLowerCase()}@kline_${kLineRange}`);
      axios.get(`https://api.binance.com/api/v3/klines?symbol=${selectedPair.toUpperCase()}&interval=${kLineRange}&limit=400`).then(res => {
        const historicalData = res.data
        if(historicalData) {

          const parsedCandleData : CandleSeriesData[] = []
          const parsedVolumeData : VolumeSeriesData[] = []

          historicalData.map((data: any) => {
            parsedCandleData.push({
              time: data[0] / 1000,
              open: parseFloat(data[1]),
              high: parseFloat(data[2]),
              low: parseFloat(data[3]),
              close: parseFloat(data[4])
            })
            parsedVolumeData.push({
              time: data[0] / 1000,
              value: parseFloat(data[5]),
              color: parseFloat(data[4]) > parseFloat(data[1]) ? COLOR.GREEN : COLOR.RED
            })
          })

          candleSeriesRef.current.setData(parsedCandleData);
          volumeSeriesRef.current.setData(parsedVolumeData);

          socket.onmessage = function (event) {    
            let data: KLineData;
            if(event.data) {
              data = JSON.parse(event.data)
              if(candleSeriesRef.current) {
                candleSeriesRef.current.update({
                  time: data.data.k.t / 1000,
                  open: parseFloat(data.data.k.o),
                  high: parseFloat(data.data.k.h),
                  low: parseFloat(data.data.k.l),
                  close: parseFloat(data.data.k.c)
                });
              }

              if(volumeSeriesRef.current) {
                volumeSeriesRef.current.update({
                  time: data.data.k.t / 1000,
                  value: parseFloat(data.data.k.v),
                  color: parseFloat(data.data.k.c) > parseFloat(data.data.k.o) ? COLOR.GREEN : COLOR.RED
                })
              }
            }
          };
          socket.onerror = function (error) {
            console.log(`WebSocket error: ${error}`);
          };
        }
      }).catch((err) => {
        console.log(err);
        closeSocket();
      })

      return () => {
        closeSocket();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kLineRange, selectedPair])

    const state = {chartContainerRef, candleSeriesRef, volumeSeriesRef, chartRange}

    return {changeKLineRange, state, chartRange}
}