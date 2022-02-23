import web3 from "./web3";
import BookOfYe from "../build/contracts/BookOfYe.json";

  const instance = new web3.eth.Contract(
    BookOfYe.abi,
    "0x1B7A16aB707AE51C28e44ba9A2f0900DEDc0Fda6"
  );

export default instance;