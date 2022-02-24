import "../styles/globals.css";


function BookOfYe({ Component, pageProps, tabData }) {
  return (
    <div>
        <Component {...pageProps} />
    </div>
  );
}

// BookOfYe.getInitialProps = async () => {
//   const ids = await instance.methods.getMintedTokens().call();
 
//   const refreshInventory =  () => {

//     for(let i = 0; i < cardData.length; i++){
//       ids.forEach((mintedId) => {
//         if (cardData[i].includes(parseInt(mintedId))) {
//           cardData[i].splice(0, 1);
//         }
//       });
//     } 
// }

// refreshInventory();

//   return {
//     tabData: cardData
//   };
// };

export default BookOfYe;
