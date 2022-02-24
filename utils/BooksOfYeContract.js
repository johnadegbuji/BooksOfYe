import web3 from "./web3";
import BooksOfYe from "../build/contracts/BooksOfYe.json";

  const instance = new web3.eth.Contract(
    BooksOfYe.abi,
    "0xc523d8c4B2aD0f915CD1e476AF93fe3C25E05984"
  );

export default instance;