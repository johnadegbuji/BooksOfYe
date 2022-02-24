import Head from "next/head";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import cardInfo from "../utils/cardData";
import instance from "../utils/BooksOfYeContract";
import styles from "../styles/App.module.css";
import Tab from "../components/Tab";
import Layout from "../components/Layout";
import web3 from "../utils/web3";
import date from "../utils/countdown.js";

function App(props) {
  const [amountLeft, setAmountLeft] = useState(props.tokensLeft);
  const [cardData, setCardData] = useState([]);
  const [saleEvent, setSaleEvent] = useState({});
  // const [genesis1, setGenesis1] = useState(cardData[0]);
  // const [genesis2, setGenesis2] = useState(cardData[1]);
  // const [genesis3, setGenesis3] = useState(cardData[2]);
  // const [genesis4, setGenesis4] = useState(cardData[3]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [metaInstalled, setMetaInstalled] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    getActiveSaleEvent();
    refreshInventory();
    getTotalTokens();
  }, []);

  useEffect(() => {
    setMetaInstalled(isMetaMaskInstalled());

    const getAccounts = async () => {
      const accounts = await web3.eth.getAccounts();
      // console.log(accounts);
      setLoggedIn(accounts.length != 0);
    };

    getAccounts();
  }, [loggedIn]);

  //Returns 1st active sale event that it finds from least to greatest
  const getActiveSaleEvent = async () => {
    for (let i = 0; i < 5; i++) {
      const sEvent = await instance.methods.viewSaleStatus(i).call();
      if (sEvent[1]) {
        setSaleEvent(sEvent);
        console.log("Sale Event: " + saleEvent);
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
    const ids = await instance.methods.viewMintedCards().call();

    for (let i = 0; i < cardInfo.length; i++) {
      ids.forEach((mintedId) => {
        if (cardInfo[i].includes(parseInt(mintedId))) {
          cardInfo[i].splice(0, 1);
        }
      });
    }
    setCardData(cardInfo);
    console.log(cardData);
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
            <Card
              refreshInventory={refreshInventory}
              tokenId={cardData[0][0]}
              img="4.png"
              color="gold"
              amount={cardData[0].length}
              price={3}
            />
            <Card
              refreshInventory={refreshInventory}
              tokenId={cardData[1][0]}
              img="3.png"
              color="platinum"
              amount={cardData[1].length}
            />
            <Card
              refreshInventory={refreshInventory}
              tokenId={cardData[2][0]}
              img="2.png"
              color="crimson"
              amount={cardData[2].length}
              price={3}
            />
            <Card
              refreshInventory={refreshInventory}
              tokenId={cardData[3][0]}
              img="1.png"
              color="bronze"
              amount={cardData[3].length}
            />
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
        date="date"
      />
    </>
  );
}

//COME BACK TO THIS

// App.getInitialProps = async () => {

//   const currentSaleEvent = getActiveSaleEvents();

//   const totalTokens = getTotalTokens();

//   let tokensLeft = 0;

//   const refreshInventory = () => {

//     }

//     tokensLeft = getTotalTokens();
//   };

//   refreshInventory();

//   return {
//     cardData,
//     totalTokens,
//     tokensLeft,
//     currentSaleEvent
//   };
// };

export default App;
