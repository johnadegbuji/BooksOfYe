import web3 from "./web3";
import BooksOfYe from "./BooksOfYe.json";

  const instance = new web3.eth.Contract(
    BooksOfYe.abi,
    "0xD076c4611bBE88Fa837Dc9770B7FbC2A80feacC9"
  );


export default instance;