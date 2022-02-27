import React from "react";
import styles from "../styles/Tab.module.css";
import Countdown from "react-countdown";
let countdownDate = "2022-02-26T17:52:00.000-08:00";
let preSaleDate = new Date("2022-02-26T17:44:00.000-08:00");
let saleDate = new Date("2022-02-28T19:00:00.000-08:00");
let saleEndDate = new Date("2022-03-01T19:00:00.000-08:00");

// const renderer = ({ days, hours, minutes, seconds, completed }) => {
//   if (completed && Date() > preSaleDate ) {
//     // Render a completed state
//     return <span>{hours}:{minutes}:{seconds}</span>;
//   } else {
//     // Render a countdown

//   }
// };
const timerUpdate = () => {
  console.log("timerUpdate Called");
  if (Date() > preSaleDate) {
    let countdownDate = saleDate;
    console.log("countdownDateUpdated");
  } else if (Date() > saleDate) {
    let countdownDate = saleEndDate;
  }
};

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
                <Countdown date={countdownDate}></Countdown>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Tab;
