import web3 from "./web3";
import BooksOfYe from "../build/contracts/BooksOfYe.json";

  const instance = new web3.eth.Contract(
    BooksOfYe.abi,
    "0x6e415166A08589e0F9A33f3C82b0FE2a1FdadB5d"
  );



//   const test = async () => {
//     const testVal = await instance.methods.viewSaleStatus(0).call();
//     console.log(testVal)
//   }

// test();

export default instance;