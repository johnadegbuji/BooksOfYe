import React from 'react'
import styles from '../styles/Tab.module.css'
import Countdown from 'react-countdown';


function Tab(props) {
  return (
    <div className={styles.tab}>
        <div className={styles.tabLeft}>
            <div>
                <p>cards remaining</p>
                <p>{`${props.amountLeft}/${props.total}`}</p>
            </div>
            <div className={styles.ml}>
            <p>current price</p>
            <p>{props.price}</p>
            </div>
        </div>
        <div className={styles.tabRight}>
            <div className={styles.mr}>
                <p>stage</p>
                <p>{props.stage}</p>
            </div>
            <div>
            <p>time remaining</p>
            <p><Countdown date={"2022-02-28T13:00:00.000+08:00"}></Countdown></p>
            </div>
        </div>
    </div>
  )
}

export default Tab