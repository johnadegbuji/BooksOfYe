import React, { useState } from "react";
import styles from "../styles/Card.module.css";
import Image from "next/image";
import web3 from "../utils/web3";
import instance from "../utils/BooksOfYeContract";
import Router from "next/router";
import ReactModal from "react-modal";

function Card(props) {
  const [tokenModal, setTokenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mintWasSuccessful, setMintWasSuccessful] = useState(false);
  const [showMintResult, setShowMintResult] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const handleBuyClick = async () => {
    setTokenModal(true);

    try {
      props.getActiveSaleEvent();

      const accounts = await web3.eth.getAccounts();
      props.refreshInventory();

      await props.checkIfWhiteListed();

      if (props.isWhiteListed && props.isPreSale) {
        await instance.methods
          .preSaleMint(props.saleEventNumber, props.tokenId)
          .send({
            from: accounts[0],
            value: web3.utils.toWei(props.price.toString(), "ether"),
          })
          .on("transactionHash", () => {
            setIsSigning(true);
          });
      } else if (!props.isPreSale && props.isPublicSale) {
        await instance.methods
          .publicMint(props.saleEventNumber, props.tokenId)
          .send({
            from: accounts[0],
            value: web3.utils.toWei(props.price.toString(), "ether"),
          })
          .on("transactionHash", () => {
            setIsSigning(true);
          });
      }
      if (!showMintResult) {
        setShowMintResult(true);
        setMintWasSuccessful(true);
      }
    } catch (e) {
      console.error(e);
      setErrorMessage(e.message);
      if (!showMintResult) {
        setShowMintResult(true);
        setMintWasSuccessful(false);
      }
    } finally {
      props.isMetaMaskInstalled();
      props.checkIfLoggedIn();
    }
  };

  const formatErrorMessage = () => {
    if (errorMessage.includes("Mint Limit Reached"))
      return "Mint Limit Reached";
    else if (errorMessage.includes("insufficient funds"))
      return "Insufficient Funds";
    else if (errorMessage.includes("MetaMask Tx Signature:"))
      return errorMessage.replace("MetaMask Tx Signature:", "");
    else
      return "Transaction Failed On The Blockchain, Your Purchase Was Reversed";
  };

  return (
    <>
      <div className={styles.card}>
        <img
          
          className={styles.cardImage}
          src={`cards/${props.img}`}
        />

        {props.amount > 0 ? (
          <div className={styles.cardTextContainer} onClick={props.amount === 0 ? () => {} : handleBuyClick}>
            <p className={styles.cardBuy} onClick={handleBuyClick}>
              buy
            </p>
            {props.color === "gold" ? (
              <p className={styles.inventoryText}>{`${props.amount}/1`} LEFT</p>
            ) : null}
            {props.color === "platinum" ? (
              <p className={styles.inventoryText}>{`${props.amount}/4`} LEFT</p>
            ) : null}
            {props.color === "crimson" ? (
              <p className={styles.inventoryText}>
                {`${props.amount}/10`} LEFT
              </p>
            ) : null}
            {props.color === "cobalt" ? (
              <p className={styles.inventoryText}>
                {`${props.amount}/25`} LEFT
              </p>
            ) : null}
          </div>
        ) : (
          <div className={styles.cardSoldOutContainer}>
            <div className={styles.soldOut}>
              <img src={`/check.png`} alt="" />
              <p>sold out</p>
            </div>
          </div>
        )}
      </div>
      <ReactModal
        className={styles.tokenModal}
        isOpen={tokenModal}
        preventScroll={true}
        style={{
          overlay: {
            zIndex: 1000,
            backgroundColor: "black",
            background: "rgba(0, 0, 0, 0.9)",
          },
        }}
      >
        <img className={styles.tokenModalImage} src={`cards/${props.img}`} />
        {!showMintResult ? (
          <>
            <div className={styles.responseContainer}>
              <img
                className={styles.closeModal}
                src={`close_x.png`}
                onClick={() => {
                  setTokenModal(false);
                  setShowMintResult(false);
                  props.refreshInventory();
                }}
              />
              <img className="rotate" src={`/modalCircle.png`} />
              <h3 className={styles.tokenModalHeading}>
                {isSigning ? "Signing" : "Please Sign The Transaction"}
              </h3>
              <div className={styles.messageContainer}>
                <p className={styles.tokenModalText}>
                  {isSigning
                    ? ""
                    : "Note that if the transaction fails on the blockchain, the purchase will be reversed"}
                </p>
                <hr className={styles.line}></hr>
                <div className={styles.tokenModalLower}>
                  <div className={styles.tokenModalLowerLeft}>
                    <h5 className={styles.tokenModalCardName}>
                      {props.cardName}
                    </h5>
                    <h5 className={styles.tokenModalCardColor}>
                      {props.color}
                    </h5>
                  </div>
                  <div className={styles.tokenModalLowerRight}>
                    <img className={styles.etherIcon} src="/ether.png"></img>
                    <h5 className={styles.tokenModalPrice}>{props.price}</h5>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.responseContainer}>
            <img
              className={styles.closeModal}
              src={`close_x.png`}
              onClick={() => {
                setTokenModal(false);
                setShowMintResult(false);
                props.refreshInventory();
              }}
            />
            {mintWasSuccessful ? (
              <>
                <img className={styles.modalStatusImage} src="/Checkmark.png" />
                <h3 className={styles.tokenModalHeading}>Card Reserved</h3>
                <div className={styles.messageContainer}>
                  <p className={styles.tokenModalText}>
                    Note that if the transaction fails on the blockchain, the
                    purchase will be reversed
                  </p>
                  <hr className={styles.line}></hr>
                  <div className={styles.tokenModalLower}>
                    <div className={styles.tokenModalLowerLeft}>
                      <h5 className={styles.tokenModalCardName}>
                        {props.cardName}
                      </h5>
                      <h5 className={styles.tokenModalCardColor}>
                        {props.color}
                      </h5>
                    </div>
                    <div className={styles.tokenModalLowerRight}>
                      <img className={styles.etherIcon} src="/ether.png"></img>
                      <h5 className={styles.tokenModalPrice}>{props.price}</h5>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <img className={styles.modalStatusImage} src="/failed.png" />
                <h3 className={styles.tokenModalHeading}>Transaction Failed</h3>
                <div className={styles.messageContainer}>
                  <p className={styles.errorMessage}>{formatErrorMessage()}</p>
                  <hr className={styles.line}></hr>
                  <div className={styles.tokenModalLower}>
                    <div className={styles.tokenModalLowerLeft}>
                      <h5 className={styles.tokenModalCardName}>
                        {props.cardName}
                      </h5>
                      <h5 className={styles.tokenModalCardColor}>
                        {props.color}
                      </h5>
                    </div>
                    <div className={styles.tokenModalLowerRight}>
                      <img className={styles.etherIcon} src="/ether.png"></img>
                      <h5 className={styles.tokenModalPrice}>{props.price}</h5>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </ReactModal>
    </>
  );
}

export default Card;
