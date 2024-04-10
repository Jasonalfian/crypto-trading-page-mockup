import { atom } from "recoil";

type GlobalExchange = {
    selectedPair: string
}

export const GlobalExchangeState = atom<GlobalExchange>({
    key: 'globalExchangeAtom',
    default: {
        selectedPair: 'btcusdt'
    },
})