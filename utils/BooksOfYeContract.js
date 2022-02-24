import web3 from "./web3";
import BooksOfYe from "../build/contracts/BooksOfYe.json";

  const instance = new web3.eth.Contract(
    BooksOfYe.abi,
    "0x19B2EFc5eBCF06f28Af49b87c63ecb15EF48b029"
  );

export default instance;