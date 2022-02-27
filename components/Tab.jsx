import React from "react";
import styles from "../styles/Tab.module.css";
import Countdown from "react-countdown";
let preSaleDate = new Date("2022-02-28T13:00:00.000-05:00");
let saleDate = new Date("2022-02-28T19:19:00.000-05:00");
let saleEndDate = new Date("2022-03-01T19:00:00.000-05:00");


function Tab(props) {
  return (
    <div className={styles.tab}>
      {props.amountLeft <= 0 ? (
        <div className={styles.soldOutText}>
          <p>ALL SOLD OUT</p>
          <h6>See you at the next sale!</h6>
        </div>
      ) : (
        <>
          <div className={styles.tabLeft}>
            <div className={styles.cardsRemaining}>
              <p className={styles.headerText}>Cards Remaining</p>
              <p
                className={styles.valuesText}
              >{`${props.amountLeft}/${props.total}`}</p>
            </div>
            <div className={styles.ml}>
              <p className={styles.headerText}>Current Price</p>
              <p className={styles.valuesText}>{props.price}</p>
            </div>
          </div>
          <div className={styles.tabRight}>
            <div className={styles.mr}>
              <p className={styles.headerText}>Stage</p>
              <p className={styles.valuesText}>{props.stage}</p>
            </div>
            <div className={styles.timeRemaining}>
              <p className={styles.headerText}>Time Remaining</p>
              <p className={styles.valuesText}>
                <Countdown date={preSaleDate}>
                    <Countdown date={saleDate}>
                        <Countdown date={saleEndDate}>
                            <p className={styles.valuesText}>Sale Is Over!</p>
                        </Countdown>
                    </Countdown>
                </Countdown>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Tab;
