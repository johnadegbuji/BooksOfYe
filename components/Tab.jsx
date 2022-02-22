import React from 'react'
import styles from '../styles/Tab.module.css'

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
            <p>0.3 ETH</p>
            </div>
        </div>

        <div className={styles.tabRight}>
            <div className={styles.mr}>
                <p>stage</p>
                <p>Pre-Sale</p>
            </div>
            <div>
            <p>time remaining</p>
            <p>0:00:23</p>
            </div>
        </div>
    </div>
  )
}

export default Tab