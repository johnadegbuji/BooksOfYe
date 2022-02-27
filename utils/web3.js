import Web3 from "web3";

let web3;

try {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(
      window.ethereum
    );
  } else {
    const provider = new Web3.providers.HttpProvider(
      "http://127.0.0.1:8545"
    );
    web3 = new Web3(provider);
  }
} catch (e) {
  console.error(e);
}

export default web3;
