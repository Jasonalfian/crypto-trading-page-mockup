import { OrderBookData } from "./model";

export const CHART_RANGE_OPTIONS = ['1s', '15m', '1h', '4h', '1d', '1w']
export const MARKS = [
    {
      value: 0,
      label: '',
    },
    {
      value: 25,
      label: '',
    },
    {
      value: 50,
      label: '',
    },
    {
      value: 75,
      label: '',
    },
    {
      value: 100,
      label: '',
    },
  ];

export  const DEFAULT_ORDER_BOOK : OrderBookData = {
  asks: [],
  bids: [],
  lastUpdateId: ''
}

export const COLOR = {
  GREEN: 'mediumseagreen',
  RED: 'firebrick',
  DARKGREEN: 'darkgreen',
  DARKRED: 'darkred',
  GREY: 'dimgrey',
}