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
    props.refreshInventory();
  }
 
  
 
}

  return (
    <>
    <div className={styles.card}>
        <img className={styles.cardImage} src={`img/${props.img}`}/>
        
        {props.amount > 0 ?
        <div className={styles.cardTextContainer}>
            <p className={styles.cardBuy} onClick={handleBuyClick} >buy</p>
            {props.color === 'gold' ? <p>{`${props.amount}/1`} LEFT</p> : null}
            {props.color === 'platnium' ? <p>{`${props.amount}/4`} LEFT</p> : null}
            {props.color ==='crimson' ? <p>{`${props.amount}/10`} LEFT</p> : null}
            {props.color === 'bronze' ? <p>{`${props.amount}/25`} LEFT</p> : null}
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
        <img className="rotate" src={`/modalCircle.png`}/>
       <h3>Please Sign The Transaction</h3>
       <p>Note that if the transaction fails on the blockchain, the purchase will be reversed</p>
       <hr></hr>
       <div>
         <h5>Sodom and Gomorrah</h5>
         <h5></h5>
       </div>
      </ReactModal>
       </>
  )
}



export default Card