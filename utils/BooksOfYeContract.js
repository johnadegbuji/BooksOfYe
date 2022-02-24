import web3 from "./web3";
import BooksOfYe from "../build/contracts/BooksOfYe.json";

  const instance = new web3.eth.Contract(
    BooksOfYe.abi,
    "0x432f4cC269a014930301458F2f57B00f2919A0e7"
  );

export default instance;