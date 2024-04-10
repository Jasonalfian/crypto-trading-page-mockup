'use client'
import { TradingChart } from "./components/TradingChart/TradingChart";
import { Orderbook } from "./components/OrderBook/OrderBook";
import { InfoHeader } from "./components/InfoHeader/InfoHeader";
import { RecoilRoot } from "recoil";
import { ExchangeInfo } from "./components/ExchangeInfo/ExchangeInfo";
import { OrderForm } from "./components/OrderForm/OrderForm";
import styles from './page.module.css';

const HomePage = () => {
  return (
    <RecoilRoot>
      <div className={styles.outerContainer}>
        <InfoHeader/>
        <div className={styles.innerContainer}>
          <div className={styles.leftContainer}>
            <Orderbook/>
          </div>
          <div className={styles.centerContainer}>
            <TradingChart/>
            <OrderForm/>
          </div>
          <div className={styles.rightContainer}>
            <ExchangeInfo/>
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default HomePage;
