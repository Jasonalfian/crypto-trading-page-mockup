import { useInfoHeaderImpl } from "./useInfoHeaderImpl";
import { Divider, Grid, LinearProgress, Typography } from "@mui/material";
import { formatCurrency, roundUpString } from "@/app/utility/numeral";
import styles from './InfoHeader.module.css';
import { COLOR } from "@/app/constant";

export const InfoHeader = () => {

    const {state, isPositive} = useInfoHeaderImpl();
    const {infoData} = state;

    const generateSecondaryInfo = (label: string, value: string|undefined) => {
        return (
            <div>
                <Typography color={COLOR.GREY} variant='body2'>
                    {label}
                </Typography>
                <Typography variant='body2'>
                    {formatCurrency(value)}
                </Typography>
        </div>
        )
    }

    return (
        <div style={{height: '44px'}}>
            {!infoData ?             
            <Grid style={{height: '100%'}} alignItems='center' spacing={1} container>
                <Grid xs item>
                    <LinearProgress/>
                </Grid>
            </Grid>
            : <div className={styles.container}>
                <Typography variant='h4'>
                    {infoData?.s}
                </Typography>

                <Divider orientation="vertical" flexItem />

                <div>
                    <Typography color={COLOR.GREY} variant='body2'>
                        Last Price
                    </Typography>
                    <Typography fontWeight={700} color={isPositive() ? COLOR.GREEN : COLOR.RED} variant='body2'>
                        {formatCurrency(infoData?.c, '$')}
                    </Typography>
                </div>

                <div>
                    <Typography color={COLOR.GREY} variant='body2'>
                        24h Change
                    </Typography>
                    <Typography fontWeight={700} variant='body2'>
                        {`${formatCurrency(infoData?.p)} `} 
                        <span style={{color: isPositive() ? COLOR.GREEN : COLOR.RED}}>
                            {`${isPositive() ? '+' : ''}${roundUpString(infoData?.P)}%`}
                        </span>
                    </Typography>
                </div>

                {generateSecondaryInfo('24h High', infoData?.h)}
                {generateSecondaryInfo('24h High', infoData?.l)}
                {generateSecondaryInfo('24h High', infoData?.v)}
                {generateSecondaryInfo('24h High', infoData?.q)}
            </div>
            }
        </div>
    )
}