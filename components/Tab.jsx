import React from 'react'
import styles from '../styles/Tab.module.css'
import Countdown from 'react-countdown';


function Tab(props) {
  return (
    <div className={styles.tab}>
        <div className={styles.tabLeft}>
            <div className={styles.cardsRemaining}>
                <p className={styles.headerText}>Cards Remaining</p>
                <p className={styles.valuesText}>{`${props.amountLeft}/${props.total}`}</p>
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
            <p className={styles.valuesText}><Countdown date={"2022-02-28T13:00:00.000+08:00"}></Countdown></p>
            </div>
        </div>
    </div>
  )
}

export default Tab