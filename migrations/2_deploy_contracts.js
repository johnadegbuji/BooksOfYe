const BooksOfYe = artifacts.require("BooksOfYe");

module.exports = async function (deployer) {
  await deployer.deploy(BooksOfYe);
  
  const contract = await BooksOfYe.deployed();

  await contract.setPriceAndInventory();

  await contract.editSaleStatus(0, true, false, false);

  // await contract.editSaleStatus(3, true, false, true);

  // await contract.alterMintLimit(1);

  // await contract.editSalePrice(0, "6000000000000000000");

  // await contract.batchAddToWhitelist(["0x48A4D1F328280Ee957A5024F59c098380fCE3259"],0); 

  await contract.batchGiftMint(
    ["0x83Dc54351dc94A791993A61a7Fe10a3c4399eE2d","0x83Dc54351dc94A791993A61a7Fe10a3c4399eE2d","0x83Dc54351dc94A791993A61a7Fe10a3c4399eE2d"], 
    [3,0,6]); 


  

  
};
