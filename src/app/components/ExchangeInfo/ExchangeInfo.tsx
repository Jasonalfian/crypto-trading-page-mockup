import { CircularProgress, TextField, Typography } from "@mui/material";
import { useExchangeInfo } from "./useExchangeInfo";
import { roundUpString } from "@/app/utility/numeral";
import styles from './ExchangeInfo.module.css';
import { ExchangeData } from "@/app/model";
import { COLOR } from "@/app/constant";

export const ExchangeInfo = () => {

    const {state, onRowClick, onFieldChange} = useExchangeInfo();
    const {exchangeData, searchField} = state;

    const generateTableHeader = () => {
        return (
            <div style={{marginBottom: '10px'}}>
                <div className={styles.tableContainer}>
                    <div className={styles.colPair}>
                        <Typography variant="body2">Pair</Typography>
                    </div>
                    <div className={styles.colPriceChange}>
                        <Typography variant="body2">Price</Typography>
                    </div>
                    <div className={styles.colPriceChange}>
                        <Typography variant="body2">Change</Typography>
                    </div>
                </div>
            </div>
        )
    }

    const generateExchangeData = (exchangeData: ExchangeData[]) => {
        return (
            <div>
                {exchangeData.map((data: any, index: number) => {
                    const isPositive = parseFloat(data.priceChangePercent) >= 0 
                    const textColor = isPositive ? COLOR.GREEN : COLOR.RED;
                    return (
                        data.symbol.includes(searchField) &&
                        <div onClick={() => onRowClick(data.symbol)} className={styles.highlight} key={`$exchange-row-${index}`}>
                            <div className={styles.tableContainer}>
                                <div className={styles.colPair}>
                                    <Typography variant="caption">{data.symbol}</Typography>
                                </div>
                                <div className={styles.colPriceChange}>
                                    <Typography fontWeight={600} color={textColor} variant="caption">{roundUpString(data.lastPrice ,4)}</Typography>
                                </div>
                                <div className={styles.colPriceChange}>
                                    <Typography fontWeight={600} color={textColor}  variant="caption">{`${isPositive ? '+' : ''}${roundUpString(data.priceChangePercent)}%`}</Typography>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <>
            {exchangeData.length <= 0 ?
                <div className={styles.container}>
                    <CircularProgress size={60}/>
                </div> 
            :
            <>
                <div className={styles.searchField}>
                    <TextField value={searchField} onChange={(e) => onFieldChange(e.target.value)} fullWidth label="Search" variant="outlined" />
                </div>
                <div>
                    {generateTableHeader()}
                    {generateExchangeData(exchangeData)}
                </div>
            </>}
        </>
    )
}