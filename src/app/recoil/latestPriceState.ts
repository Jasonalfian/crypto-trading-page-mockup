import { atom } from "recoil";

type LatestPrice = {
    latestPrice: string;
    latestPriceColor: string;
    isPositive: boolean;
}

export const LatestPriceState = atom<LatestPrice>({
    key: 'latestPriceAtom',
    default: {
        latestPrice: '',
        latestPriceColor: '',
        isPositive: true,
    },
})