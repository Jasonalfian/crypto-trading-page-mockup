import { useEffect } from "react";
import { useTradingChartImpl } from "./useTradingChartImpl"
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import { CHART_RANGE_OPTIONS, COLOR } from "../../constant";
import { Button, Stack } from "@mui/material";
import styles from './TradingChart.module.css'

export const TradingChart = () => {
  
    const {changeKLineRange, state} = useTradingChartImpl();
    const {chartRange, chartContainerRef, candleSeriesRef, volumeSeriesRef} = state;

    const rangeOptions = () => {
      return (
        <Stack direction="row" my={1}>
          {CHART_RANGE_OPTIONS.map(option => {
            return ( 
              <Button
                variant={chartRange === option ? 'contained' : 'text'}
                key={'chart-range' + option}
                onClick={() => {
                  changeKLineRange(option);
                }}>
                {option.toUpperCase()}
              </Button>
            )
          })}
        </Stack>
      )
    }

    useEffect(() => {
      if(chartContainerRef.current) {
        const handleResize = () => {
            if(chartContainerRef.current)
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: '#152238' },
                textColor: 'white',
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
            grid: {
                vertLines: {
                color: '#334158',
                },
                horzLines: {
                color: '#334158',
                },
            },
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            timeScale: {
                borderColor: '#485c7b',
                timeVisible: true,
                secondsVisible: true
            },
        });
        chart.timeScale().fitContent();
        candleSeriesRef.current = chart.addCandlestickSeries({
            upColor: COLOR.GREEN,
            downColor: COLOR.RED,
            borderDownColor: COLOR.RED,
            borderUpColor: COLOR.GREEN,
            wickDownColor: '#838ca1',
            wickUpColor: '#838ca1',
          });

        volumeSeriesRef.current = chart.addHistogramSeries({
          priceFormat: {
              type: 'volume',
          },
          priceScaleId: '',
        });
        volumeSeriesRef.current.priceScale().applyOptions({
            scaleMargins: {
                top: 0.95,
                bottom: 0,
            },
        });

        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
          chart.remove();
        };
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
      <>
        {rangeOptions()}
        <div className={styles.container} ref={chartContainerRef}/>
      </>
    );
}