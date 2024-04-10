export type KLineData = {
    data: {
        E: number;
        e: string;
        s: string;
        k: {
            B: string;
            L: number;
            Q: string;
            T: number;
            V: string;
            c: string;
            f: number;
            h: string;
            i: string;
            l: string;
            n: number;
            o: string;
            q: string;
            s: string;
            t: number;
            v: string;
            x: boolean;
        }
    },
    stream: string;
}

export type PriceVolume = string[];

export type OrderBookData = {
    asks: PriceVolume[];
    bids: PriceVolume[];
    lastUpdateId: string;
}

export type TickerData = {
    e: string;
    E: number,
    s: string;
    p: string;
    P: string;
    w: string;
    x: string;
    c: string;
    Q: string;
    b: string;
    B: string;
    a: string;
    A: string;
    o: string;
    h: string;
    l: string;
    v: string;
    q: string;
    O: number;
    C: number;
    F: number;
    L: number;
    n: number;
}

export type ExchangeData = {
    askPrice: string;
    askQty: string;
    bidPrice: string;
    bidQty: string;
    closeTime: number;
    count: number;
    firstId: number;
    highPrice: number;
    lastId: number;
    lastPrice: string;
    lastQty: string;
    lowPrice: string;
    openPrice: string;
    openTime: number;
    prevClosePrice: string;
    priceChange: string;
    priceChangePercent: string;
    quoteVolume: string;
    symbol: string;
    volume: string;
    weightedAvgPrice: string;
}

export type CandleSeriesData = {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

export type VolumeSeriesData = {
    time: number;
    value: number;
    color?: string;
}