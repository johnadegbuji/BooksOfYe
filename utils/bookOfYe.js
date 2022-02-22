import web3 from "./web3";
import BookOfYe from "../build/contracts/BookOfYe.json";

  const instance = new web3.eth.Contract(
    BookOfYe.abi,
    "0xb642F37837B52D7fe1bccAEabc16867F8F61B96A"
  );

export default instance;