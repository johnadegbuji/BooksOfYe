import Head from "next/head";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import cardData from "../utils/cardData";
import instance from "../utils/bookOfYe";
import styles from "../styles/App.module.css";
import Tab from "../components/Tab";
import Layout from "../components/Layout";
import web3 from "../utils/web3";

function App(props) {
  const [amountLeft, setAmountLeft] = useState(props.tokensLeft);
  const [genesis1, setGenesis1] = useState(props.cardData[0]);
  const [genesis2, setGenesis2] = useState(props.cardData[1]);
  const [genesis3, setGenesis3] = useState(props.cardData[2]);
  const [genesis4, setGenesis4] = useState(props.cardData[3]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [metaInstalled, setMetaInstalled] = useState(false);

  useEffect(() => {

    setMetaInstalled(isMetaMaskInstalled());

    const getAccounts = async () => {
      const accounts = await web3.eth.getAccounts();
      // console.log(accounts);
      setLoggedIn(accounts.length != 0);
    };

    getAccounts();
  }, [loggedIn]);


  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      await ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setLoggedIn(accounts.length != 0);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout>
        <img className={styles.logo} src={"/logo.png"} alt="" />
        {loggedIn && metaInstalled ? (
          <div className={styles.App}>
            <Card
              tokenId={genesis1[0]}
              img="4.png"
              color="gold"
              amount={genesis1.length}
              price={3}
            />
            <Card
              tokenId={genesis2[0]}
              img="3.png"
              color="platinum"
              amount={genesis2.length}
            />
            <Card
              tokenId={genesis3[0]}
              img="2.png"
              color="crimson"
              amount={genesis3.length}
              price={3}
            />
            <Card
              tokenId={genesis4[0]}
              img="1.png"
              color="bronze"
              amount={genesis4.length}
            />
          </div>
        ) : (
          <div className={styles.welcomeScreen}>
          <p>welcome</p>
          <h1>Please Connect Your Wallet</h1>
          {metaInstalled ?
            <button onClick={onClickConnect}>Connect MetaMask</button> :
            <>
            <h4>Oops, doesn't seem you have MetaMask installed.</h4>
            <a href="https://metamask.io/download/" class="button">Install MetaMask Here</a>
            </>
          }
          </div>
        )}
      </Layout>
      <Tab amountLeft={amountLeft} total={40} />
    </>
  );
}

const getTotalTokens = () => {
  let sum = 0;
  cardData.forEach((array) => {
    sum += array.length;
  });
  return sum;
};

App.getInitialProps = async () => {
  const ids = await instance.methods.getMintedTokens().call();

  const totalTokens = getTotalTokens();

  console.log(ids);

  let tokensLeft = 0;

  const refreshInventory = () => {
    for (let i = 0; i < cardData.length; i++) {
      ids.forEach((mintedId) => {
        if (cardData[i].includes(parseInt(mintedId))) {
          cardData[i].splice(0, 1);
        }
      });
    }

    tokensLeft = getTotalTokens();
  };

  refreshInventory();

  return {
    cardData,
    totalTokens,
    tokensLeft,
  };
};

export default App;
