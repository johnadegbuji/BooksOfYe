import Web3 from "web3";


let web3;
 
//typeof gets the type of the value 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  //creating our own instance of web3 using the provider from metamask
  // instead of using the injected metamask web3 instance
  //We cant rely on the one meta mask web3 instance because we don't know what version it is using. 
  web3 = new Web3(
    window.ethereum
    // new Web3.providers.HttpProvider('http://127.0.0.1:8545')
    );
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    //passing url to a remote node provided by infura
    //THis will be changed to mainnet after development 
    //This is just being used as a portal to the ETH network 
    // "https://rinkeby.infura.io/v3/1c9c0aa9a694433aa907a8b60d97a7b6"
    'http://127.0.0.1:8545'
    );
  web3 = new Web3(provider);
}
 
export default web3;