import web3 from "./web3";
import BooksOfYe from "../build/contracts/BooksOfYe.json";

  const instance = new web3.eth.Contract(
    BooksOfYe.abi,
    "0x979510DBbEc58485A3b882Fe186410c7C9B4cd40"
  );

export default instance;