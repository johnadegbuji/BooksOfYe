import web3 from "./web3";
import BooksOfYe from "./BooksOfYe.json";

const instance = new web3.eth.Contract(
    BooksOfYe.abi,
    "0x580b6e863567402E8AEDFf49391d4F26E9E34151"
  );


export default instance;