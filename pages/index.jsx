import Head from "next/head";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import cardInfo from "../utils/cardData";
import instance from "../utils/BooksOfYeContract";
import styles from "../styles/App.module.css";
import Tab from "../components/Tab";
import Layout from "../components/Layout";
import web3 from "../utils/web3";
import Countdown from "react-countdown";

function App(props) {
  const [amountLeft, setAmountLeft] = useState(
    props.tokensLeft ? props.tokensLeft : "???"
  );
  const [saleEvent, setSaleEvent] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [metaInstalled, setMetaInstalled] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [cards, setCards] = useState([]);
  const [isWhiteListed, setIsWhiteListed] = useState(false);
  const [chainId, setChainId] = useState("");
  const storeChainId = "0x4";

  const cardName = [
    "Let There Be Light",
    "Garden Of Eden",
    "Noah's Ark",
    "The Tower Of Babel",
    "Lot's Wife",
  ];
  const bookPassage = [
    "Genesis 1:3",
    "Genesis 1:27",
    "Genesis 7:1",
    "Genesis 11:19",
    "Genesis 19:26",
  ];

  useEffect(() => {
    getChainId();
  }, [metaInstalled]);

  useEffect(() => {
    isMetaMaskInstalled();
    checkIfLoggedIn();
    checkChainBeforeContractInteraction();
  }, [chainId]);

  const checkChainBeforeContractInteraction = async () => {
    if (chainId === storeChainId) {
      getActiveSaleEvent();
      refreshInventory();
      checkIfWhiteListed();
    }
  };

  const getChainId = async () => {
    if (metaInstalled) {
      const chain = await window.ethereum.request({ method: "eth_chainId" });
      setChainId(chain);
    }
  };

  const checkIfLoggedIn = async () => {
    const accounts = await web3.eth.getAccounts();
    setLoggedIn(accounts.length != 0);
  };

  const getActiveSaleEvent = async () => {
    for (let i = 0; i < 5; i++) {
      const sEvent = await instance.methods.viewSaleStatus(i).call();
      if (sEvent[1]) {
        setSaleEvent({
          price: web3.utils.fromWei(sEvent[0], "ether"),
          isActive: sEvent[1],
          isPreSale: sEvent[2],
          isPublicSale: sEvent[3],
          minCardId: sEvent[4],
          maxCardId: sEvent[5],
          saleEventNumber: i,
        });
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

    //Remove the minted Ids from cardInfo arrays
    for (let i = 0; i < cardInfo.length; i++) {
      ids.forEach((mintedId) => {
        const id = parseInt(mintedId);
        if (cardInfo[i].includes(id)) {
          for (let j = 0; j < cardInfo[i].length; j++) {
            if (cardInfo[i][j] === id) {
              cardInfo[i].splice(j, 1);
            }
          }
        }
      });
    }

    const cardProps = [];

    const colorways = ["gold", "platinum", "crimson", "cobalt"];

    let cardRow = [];

    for (let i = 0, j = 0; i < cardInfo.length; i++, j++) {
      if (j == 4) {
        j = 0;
        cardProps.push(cardRow);
        cardRow = [];
      }

      const card = {
        tokenId: cardInfo[i][0] == undefined ? -1 : cardInfo[i][0],
        img: `${i}.png`,
        color: colorways[j],
        amount: cardInfo[i].length,
      };

      cardRow.push(card);

      if (i === cardInfo.length - 1) {
        cardProps.push(cardRow);
      }
    }

    setCards(cardProps);
    getTotalTokens();
  };

  const isMetaMaskInstalled = () => {
    try {
      const { ethereum } = window;
      setMetaInstalled(Boolean(ethereum && ethereum.isMetaMask));

      window.ethereum.on("chainChanged", (chainId) => {
        setChainId(chainId);
      });
      window.ethereum.on("disconnect", (error) => {
        setLoggedIn(false);
      });
      window.ethereum.on("accountsChanged", (accounts) => {
        window.location.reload();
      });
    } catch (e) {
      console.error(e);
    }
    
  };

  const onClickConnect = async () => {
    try {
      setShowSpinner(true);
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setLoggedIn(accounts.length != 0);
      setShowSpinner(false);
    } catch (error) {
      console.error(error);
      setShowSpinner(false);
    }
  };

  const checkIfWhiteListed = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const wl = await instance.methods.checkWhitelist(0, account).call();
    setIsWhiteListed(wl);
  };

  const detectEthereumNetwork = async () => {
    web3.eth.net.getNetworkType().then(async (netId) => {
      if (netId != storeChainId) {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: storeChainId }],
        });
      }
    });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const displayCards = (
    <div className={styles.App}>
      {cards.map((cardArray, key) => {
        return (
          <div key={key} className={styles.cardRow}>
            <h5 className={styles.bookPassage}>{bookPassage[key]}</h5>
            <h3 className={styles.cardNames}>{cardName[key]}</h3>
            <div className={styles.cardContainer}>
              {cardArray.map((card) => {
                return (
                  <Card
                    key={card.tokenId}
                    refreshInventory={refreshInventory}
                    isMetaMaskInstalled={isMetaMaskInstalled}
                    checkIfLoggedIn={checkIfLoggedIn}
                    tokenId={card.tokenId}
                    img={card.img}
                    color={card.color}
                    cardName={cardName[key]}
                    amount={card.amount}
                    price={saleEvent.price}
                    checkIfWhiteListed={checkIfWhiteListed}
                    isWhiteListed={isWhiteListed}
                    isPreSale={saleEvent.isPreSale}
                    isPublicSale={saleEvent.isPublicSale}
                    saleEventNumber={saleEvent.saleEventNumber}
                    getActiveSaleEvent={getActiveSaleEvent}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  const getConnectOrNetworkChangeText = (wrongChain, notConnected) => {
    return chainId != storeChainId ? wrongChain : notConnected;
  };

  const displayConnectScreen = (
    <div className={styles.welcomeScreen}>
      <p className={styles.welcomeSubText}>WELCOME</p>
      <h1 className={styles.welcomeScreenText}>
        {metaInstalled ? getConnectOrNetworkChangeText(
          "Please Change Your Network",
          "Please Connect Your Wallet"
        ) : "Please Install MetaMask"}
      </h1>
      {metaInstalled ? (
        <>
          {showSpinner ? (
            <img src="/modalCircle.png" className="rotate" />
          ) : (
            <button
              onClick={
                chainId != storeChainId ? detectEthereumNetwork : onClickConnect
              }
            >
              {getConnectOrNetworkChangeText(
                "Change Network",
                "Connect MetaMask"
              )}
            </button>
          )}
        </>
      ) : (
        <>
          <h4>{"Oops, doesn't seem you have MetaMask installed."}</h4>
          <a href="https://metamask.io/download/" className="button">
            Install MetaMask Here
          </a>
        </>
      )}
    </div>
  );

  const displayScreen = () => {
    const isActive = saleEvent.isActive;
    const isPreSale = saleEvent.isPreSale;
    const isPublicSale = saleEvent.isPublicSale;

    if (metaInstalled && loggedIn && chainId === storeChainId) {
      if (!isPreSale && !isPublicSale) {
        if (isWhiteListed) {
          return (
            <>
              <p className={styles.welcomeSubText}>THANK YOU</p>;
              <h1 className={styles.welcomeScreenText}>
                You are on the whitelist.
                <br></br>
                <br></br>The Pre-Sale begins in: <br></br>
                <br></br>
                <Countdown date={"2022-02-28T13:00:00.000-05:00"}>
                  <button onClick={refreshPage}>Enter Sale</button>
                </Countdown>
              </h1>
              ;
            </>
          );
        } else if (!isWhiteListed) {
          return (
            <>
              <p className={styles.welcomeSubText}>THANK YOU</p>
              <h1 className={styles.welcomeScreenText}>
                The Sale will begin after the Pre-Sale has finished, if there is
                remaining stock.
                <br></br>
                <br></br>The Pre-Sale begins in: <br></br>
                <br></br>
                <Countdown date={"2022-02-28T13:00:00.000-05:00"}></Countdown>
              </h1>
            </>
          );
        }
      } else if (isActive && isPreSale && isWhiteListed) {
        return displayCards;
      } else if (isActive && isPublicSale && !isPreSale) {
        return displayCards;
      } else if (
        (isPreSale && !isPublicSale && !isWhiteListed) ||
        (isPreSale && isPublicSale && !isWhiteListed)
      ) {
        return (
          <>
            <p className={styles.welcomeSubText}>THANK YOU</p>
            <h1 className={styles.welcomeScreenText}>
              The Sale will begin after the Pre-Sale has finished, if there is
              remaining stock.
            </h1>
            ;
          </>
        );
      }
    } else {
      return displayConnectScreen;
    }
  };

  const preSaleOrPublic = () => {
    if (!saleEvent.isPresale && !saleEvent.isPublicSale) {
      return "Pre-Sale";
    } else if (saleEvent.isPresale && !saleEvent.isPublicSale) {
      return "Pre-Sale";
    } else if (!saleEvent.isPresale && saleEvent.isPublicSale) {
      return "Sale";
    }
  };

  return (
    <>
      <Layout>
        <img className={styles.logo} src={"/logo.png"} alt="" />
        {displayScreen()}
      </Layout>
      <Tab
        amountLeft={amountLeft}
        total={200}
        price={saleEvent.price}
        stage={preSaleOrPublic()}
      />
    </>
  );
}

export default App;
