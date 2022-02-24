import Head from "next/head";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import cardInfo from "../utils/cardData";
import instance from "../utils/BooksOfYeContract";
import styles from "../styles/App.module.css";
import Tab from "../components/Tab";
import Layout from "../components/Layout";
import web3 from "../utils/web3";

function App(props) {
  const [amountLeft, setAmountLeft] = useState(props.tokensLeft);
  const [cardData, setCardData] = useState([]);
  const [saleEvent, setSaleEvent] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [metaInstalled, setMetaInstalled] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getActiveSaleEvent();

  }, []);

  useEffect(() => {
    refreshInventory();
  }, []);

  useEffect(() => {
    setMetaInstalled(isMetaMaskInstalled());

    const getAccounts = async () => {
      const accounts = await web3.eth.getAccounts();
      setLoggedIn(accounts.length != 0);
    };

    getAccounts();
  }, [loggedIn]);

  //Returns 1st active sale event that it finds from least to greatest
  const getActiveSaleEvent = async () => {
    for (let i = 0; i < 5; i++) {
      const sEvent = await instance.methods.viewSaleStatus(i).call();
      if (sEvent[1]) {
        sEvent[0] = web3.utils.fromWei(sEvent[0], 'ether');
        sEvent[2] = sEvent[2];

        setSaleEvent(sEvent);
        break;
      }
    }
  };

  const getTotalTokens = () => {
    let sum = 0;
    cardInfo.forEach((array) => {
      sum += array.length;
    });
    setAmountLeft(sum);
  };

  const refreshInventory = async () => {
    //Get Minted Ids
    const ids = await instance.methods.viewMintedCards().call();

    console.log("Minted Ids: ", ids);

    //Remove the minted Ids from cardInfo arrays
    for (let i =  0; i < cardInfo.length; i++) {
      ids.forEach((mintedId) => {
        const id = parseInt(mintedId);
        if (cardInfo[i].includes(id)) {
          for(let j = 0; j < cardInfo[i].length; j++){
            if (cardInfo[i][j] === id) { 
              cardInfo[i].splice(j, 1); 
          }
          }
        }
      });
    }


    console.log("Card Info: ", cardInfo);

    const cardProps = [
      {
        tokenId: cardInfo[0][0] == undefined  ? -1 : cardInfo[0][0],
        img: "4.png",
        color: "gold",
        amount: cardInfo[0].length,
      },
      {
        tokenId: cardInfo[1][0] == undefined ? -1 : cardInfo[1][0],
        img: "3.png",
        color: "platnium",
        amount: cardInfo[1].length,
      },
      {
        tokenId: cardInfo[2][0] == undefined ? -1 : cardInfo[2][0],
        img: "2.png",
        color: "crimson",
        amount: cardInfo[2].length,
      },
      {
        tokenId: cardInfo[3][0] == undefined ? -1 : cardInfo[3][0],
        img: "1.png",
        color: "bronze",
        amount: cardInfo[3].length,
      },
    ];

    setCards(cardProps);
    getTotalTokens(); 
  };

  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const onClickConnect = async () => {
    try {
      setShowSpinner(true);
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setLoggedIn(accounts.length != 0);
      setShowSpinner(false);
    } catch (error) {
      console.error(error);
      setShowSpinner(false);
    }
  };

  return (
    <>
      <Layout>
        <img className={styles.logo} src={"/logo.png"} alt="" />
        {loggedIn && metaInstalled ? (
          <div className={styles.App}>
            {cards.map((card, key) => 
              <Card
              key={key}
              refreshInventory={refreshInventory}
              tokenId={card.tokenId}
              img={card.img}
              color={card.color}
              amount={card.amount}
              price={0.2}
            />
            )}
            
          </div>
        ) : (
          <div className={styles.welcomeScreen}>
            <p>Welcome</p>
            <h1>Please Connect Your Wallet</h1>
            {metaInstalled ? (
              <>
                {showSpinner ? (
                  <img src="/modalCircle.png" className="rotate" />
                ) : (
                  <button onClick={onClickConnect}>Connect MetaMask</button>
                )}
              </>
            ) : (
              <>
                <h4>Oops, doesn't seem you have MetaMask installed.</h4>
                <a href="https://metamask.io/download/" className="button">
                  Install MetaMask Here
                </a>
              </>
            )}
          </div>
        )}
      </Layout>

      <Tab
        amountLeft={amountLeft}
        total={200}
        price={saleEvent[0]}
        stage={saleEvent[2] ? "Pre-Sale" : "Sale"}
      />

    </>
  );
}

export default App;
