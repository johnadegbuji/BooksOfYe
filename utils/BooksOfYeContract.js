import web3 from "./web3";
import BooksOfYe from "../build/contracts/BooksOfYe.json";

  const instance = new web3.eth.Contract(
    BooksOfYe.abi,
    "0x1376131c7EBE15E74577ECe8dce374cdB71Cc3cc"
  );

export default instance;