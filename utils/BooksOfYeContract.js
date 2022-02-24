import web3 from "./web3";
import BooksOfYe from "../build/contracts/BooksOfYe.json";

  const instance = new web3.eth.Contract(
    BooksOfYe.abi,
    "0xF32C171cBdeDB0137c7380417138B9a812cD1B62"
  );

export default instance;