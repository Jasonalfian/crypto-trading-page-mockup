import { useOrderBookImpl } from "./useOrderBookImpl";
import { PriceVolume } from "@/app/model";
import { CircularProgress, SvgIcon, Typography } from "@mui/material";
import { roundDownNumber, roundUpNumber, roundUpString } from "@/app/utility/numeral";
import styles from './OrderBook.module.css';
import { useRecoilValue } from "recoil";
import { LatestPriceState } from "@/app/recoil/latestPriceState";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { COLOR } from "@/app/constant";

export const Orderbook = () => {

    const {state} = useOrderBookImpl();
    const {orderBookData, sumAskVolume, sumBidVolume} = state;
    const {latestPrice, latestPriceColor, isPositive} = useRecoilValue(LatestPriceState);

    const generateTableHeader = () => {
        return (
            <div style={{marginBottom: '10px'}}>
                <div className={styles.flexSpaceBetween}>
                    <div className={styles.colPrice}>
                        <Typography variant="body2">Price(USDT)</Typography>
                    </div>
                    <div className={styles.colAmountTotal}>
                        <Typography variant="body2">Amount</Typography>
                    </div>
                    <div className={styles.colAmountTotal}>
                        <Typography variant="body2">Total</Typography>
                    </div>
                </div>
            </div>
        )
    }

    const generateOrderBook = (priceVolume: PriceVolume[], type: 'ask' | 'bid') => {

        const textColor = type === 'ask' ? COLOR.RED : COLOR.GREEN;
        const secondValues = priceVolume.map(([_, secondValue]) => parseFloat(secondValue));
        const highestValue = Math.max(...secondValues);

        return (
            <div>
                {priceVolume.map((orderBook, index) => {
                    const widthProgress = parseFloat(orderBook[1])/highestValue*100*2
                    return (
                        <div className={styles.singleRowContainer} key={`${type}row-${index}`}>
                            <div className={styles.progress} style={{backgroundColor: textColor, width: `${widthProgress}%`}}/>
                            <div className={styles.flexSpaceBetween}>
                                <div className={styles.colPrice}>
                                    <Typography color={textColor} variant="body2">{roundUpString((orderBook[0]))}</Typography>
                                </div>
                                <div className={styles.colAmountTotal}>
                                    <Typography color={'darkgrey'} variant="body2">{roundUpString((orderBook[1]),5)}</Typography>
                                </div>
                                <div className={styles.colAmountTotal}>
                                    <Typography color={'darkgrey'}  variant="body2">{roundUpNumber(parseFloat(orderBook[0]) * parseFloat(orderBook[1]),5)}</Typography>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    
    const bidVolumePercentage = sumBidVolume/(sumBidVolume+sumAskVolume)*100
    const askVolumePercentage = sumAskVolume/(sumBidVolume+sumAskVolume)*100

    return (
        <div className={styles.container}>
            { orderBookData.lastUpdateId == '' ?
                <div className={styles.loaderContainer}>
                    <CircularProgress size={60}/>
                </div>
            : <>
                {generateTableHeader()}
                {generateOrderBook(orderBookData.asks.reverse(), 'ask')}
                <div className={styles.flexCenter}>
                    <Typography color={latestPriceColor} my={1} variant="h6">
                        {latestPrice}
                    </Typography>
                    <SvgIcon style={{color: latestPriceColor, fontSize: '20'}} component={isPositive ? ArrowUpward : ArrowDownward}/>
                    <Typography ml={1} color={latestPriceColor} variant="body2">
                        ${latestPrice}
                    </Typography>
                </div>
                {generateOrderBook(orderBookData.bids, 'bid')}
                
                <div className={styles.buySellContainer}>
                    <Typography color={COLOR.GREEN} variant="body2">
                        Buy
                    </Typography>
                    <div className={styles.buySellPriceContainer}>
                        <div className={styles.buySellPercentage}>
                            <Typography variant="body2">
                                {roundUpNumber(bidVolumePercentage)}%
                            </Typography>
                            <Typography textAlign='right' variant="body2">
                                {roundDownNumber(askVolumePercentage)}%
                            </Typography>
                        </div>
                        <div style={{backgroundColor: COLOR.DARKGREEN, width:`${bidVolumePercentage}%`}}/>
                        <div style={{backgroundColor: COLOR.DARKRED, width:`${askVolumePercentage}%`}}/>
                    </div>
                    <Typography color={COLOR.RED} variant="body2">
                        Sell
                    </Typography>
                </div>
            </>}
        </div>
    )
}