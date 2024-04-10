import { COLOR, MARKS } from "@/app/constant"
import { LatestPriceState } from "@/app/recoil/latestPriceState";
import { roundDownNumber } from "@/app/utility/numeral";
import { Button, Slider, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styles from './OrderForm.module.css';
import { GlobalExchangeState } from "@/app/recoil/globalExchange";

export const OrderForm = () => {

    const availableUsdt = 1000;
    const {latestPrice} = useRecoilValue(LatestPriceState);
    const {selectedPair} = useRecoilValue(GlobalExchangeState);

    const [buyPrice, setBuyPrice] = useState<string>('');
    const [sellPrice, setSellPrice] = useState<string>('');

    useEffect(() => {
        if((!buyPrice || !sellPrice) && latestPrice) {
            const sanitizedLatestPrice = latestPrice.replaceAll(',','');
            setBuyPrice(sanitizedLatestPrice);
            setSellPrice(sanitizedLatestPrice);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [latestPrice])

    useEffect(() => {
        if(buyPrice || sellPrice) {
            setBuyPrice('')
            setSellPrice('')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPair])

    const onChangeBuyPrice = (value: string) => {
        setBuyPrice(value)
    }
    const onChangeSellPrice = (value: string) => {
        setSellPrice(value);
    }

    const generateForm = (isBuy: boolean, usdtPrice: string, onChangeUsdtPrice: (price: string) => void) => {

        const currencyText = isBuy ? 'USDT' : 'Coins'
        return (
            <>
                <Typography variant="caption">
                    Avbl {roundDownNumber(availableUsdt)} {currencyText}
                </Typography>
                <TextField onChange={(e) => onChangeUsdtPrice(e.target.value)} value={usdtPrice} fullWidth label="Price (USDT)" variant="outlined" />
                <TextField fullWidth label="Amount (Coins)" variant="outlined" />
                <div style={{padding: '8px 0px'}}>
                    <Slider
                        min={0}
                        max={100}
                        defaultValue={0}
                        step={1}
                        marks={MARKS}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value}%`}
                    />
                </div>
                <TextField fullWidth label="Total (USDT)" variant="outlined" />
                <Typography marginBottom={'-10px'} variant="caption">
                    Max Buy 0 Coins
                </Typography>
                <Typography variant="caption">
                    Est. Fee
                </Typography>
                <Button variant="contained" style={{backgroundColor: isBuy ? COLOR.GREEN : COLOR.RED, color: isBuy ? 'black' : 'white'}}>
                    {isBuy ? 'Buy' : 'Sell'}
                </Button>
            </>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                {generateForm(true, buyPrice, onChangeBuyPrice)}
            </div>
            <div className={styles.formContainer}>
                {generateForm(false, sellPrice, onChangeSellPrice)}
            </div>
        </div>
    )
}