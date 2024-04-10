import { ceil, floor } from 'lodash';
import numeral from 'numeral';

export const formatCurrency = (value: string | null | undefined, prefix?: string) => {
    return numeral(parseFloat(value ?? '')).format(`${prefix}0,0.00`)
}

// Function to round up a number and fill it with zeros
export const roundUpString = (value: string | undefined, decimals: number = 2) => {
    const roundedNumber = ceil(parseFloat(value ?? ''), decimals);
    const formattedNumber = roundedNumber.toFixed(decimals);
    return formattedNumber;
}

const formatDecimalNumber = (value: number, decimals: number) => {
    const formattedNumber = value.toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    });
    return formattedNumber;
}

export const roundUpNumber = (value: number, decimals: number = 2) => {
    const roundedNumber = ceil((value), decimals);
    return formatDecimalNumber(roundedNumber, decimals)
}

export const roundDownNumber = (value: number, decimals: number = 2) => {
    const roundedNumber = floor((value), decimals);
    return formatDecimalNumber(roundedNumber, decimals)
}
