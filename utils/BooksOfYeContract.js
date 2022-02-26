import web3 from "./web3";
import BooksOfYe from "../build/contracts/BooksOfYe.json";

  const instance = new web3.eth.Contract(
    BooksOfYe.abi,
    "0x5539739445b0606FB70Bbe95A5fAD87361FBB203"
  );

export default instance;