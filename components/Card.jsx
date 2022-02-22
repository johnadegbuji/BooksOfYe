import React, { useState } from 'react'
import styles from '../styles/Card.module.css'
import Image from 'next/image'
import web3 from "../utils/web3";
import instance from "../utils/bookOfYe";
import Router from 'next/router'
import ReactModal from 'react-modal';




function Card(props) {

  const [amount, setAmount] = useState(props.amount);
  const [id, setId] = useState(props.tokenId); 
  const [tokenModal, setTokenModal] = useState(false);



const handleBuyClick = async () => {

  setTokenModal(true); 

  try{
  const accounts = await web3.eth.getAccounts();


  await instance.methods.mint(id).send({
    from: accounts[0],
  });
  setAmount(amount - 1); 
  setId(id + 1); }
  catch{
    setTokenModal(false)
  }

  Router.reload(window.location.pathname); 
  
 
}

  return (
    <>
    <div className={styles.card}>
        <img className={styles.cardImage} src={`img/${props.img}`}/>
        
        {amount != 0 ?
        <div className={styles.cardTextContainer}>
            <p className={styles.cardBuy} onClick={handleBuyClick} >buy</p>
            {props.color === 'gold' ? <p>{`${amount}/1`} LEFT</p> : null}
            {props.color === 'platinum' ? <p>{`${amount}/4`} LEFT</p> : null}
            {props.color ==='crimson' ? <p>{`${amount}/15`} LEFT</p> : null}
            {props.color === 'bronze' ? <p>{`${amount}/20`} LEFT</p> : null}
        </div> :
        <div className={styles.cardSoldOutContainer}>
            <div className={styles.soldOut}>
              <img src={`/check.png`} alt="" />
              <p>sold out</p>
            </div>
        </div>
         }
    </div>
      <ReactModal
        className={styles.tokenModal}
        isOpen={tokenModal}
        // onRequestClose={() => setExperienceModalIsOpen(false)}
        preventScroll={true}
        style={{
          overlay: {
            zIndex: 1000,
            backgroundColor: "black",
            background: "rgba(0, 0, 0, 0.9)",
          },
        }}
      >
        <img className={styles.tokenModalImage} src={`img/${props.img}`}/>
        <img className="" src={`/modalCircle.png`}/>
       <h3>Please Sign The Transaction</h3>
      </ReactModal>
       </>
  )
}



export default Card