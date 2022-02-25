import React, { useState } from 'react'
import styles from '../styles/Card.module.css'
import Image from 'next/image'
import web3 from "../utils/web3";
import instance from "../utils/BooksOfYeContract";
import Router from 'next/router'
import ReactModal from 'react-modal';




function Card(props) {

  const [tokenModal, setTokenModal] = useState(false);
  // const [showSpinner, setShowSpinner] = useState(false);




const handleBuyClick = async () => {

  setTokenModal(true); 

  try{
  const accounts = await web3.eth.getAccounts();
  props.refreshInventory(); 
  //todo: Add preSaleMint functionality
  await instance.methods.publicMint(0,props.tokenId).send({
    from: accounts[0],
    value: web3.utils.toWei(props.price.toString(), 'ether')
  });

}
  catch{
    setTokenModal(false);
  }
  finally{
    setTokenModal(false);
    props.isMetaMaskInstalled(); 
    props.refreshInventory();
    props.checkIfLoggedIn();
  }
 
  
 
}

  return (
    <>
    <div className={styles.card}>
        <img className={styles.cardImage} src={`cards/${props.img}`}/>
        
        {props.amount > 0 ?
        <div className={styles.cardTextContainer}>
            <p className={styles.cardBuy} onClick={handleBuyClick} >buy</p>
            {props.color === 'gold' ? <p className={styles.inventoryText}>{`${props.amount}/1`} LEFT</p> : null}
            {props.color === 'platinum' ? <p className={styles.inventoryText}>{`${props.amount}/4`} LEFT</p> : null}
            {props.color ==='crimson' ? <p className={styles.inventoryText}>{`${props.amount}/10`} LEFT</p> : null}
            {props.color === 'cobalt' ? <p className={styles.inventoryText}>{`${props.amount}/25`} LEFT</p> : null}
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
        <img className={styles.tokenModalImage} src={`cards/${props.img}`}/>
        <img className="rotate" src={`/modalCircle.png`}/>
       <h3 className={styles.tokenModalHeading}>Please Sign The Transaction</h3>
       <p className={styles.tokenModalText}>Note that if the transaction fails on the blockchain, the purchase will be reversed</p>
       <hr className={styles.line}></hr>
       <div>
         <h5 className={styles.tokenModalHeading}>Sodom and Gomorrah</h5>
         <h5></h5>
       </div>
      </ReactModal>
       </>
  )
}



export default Card