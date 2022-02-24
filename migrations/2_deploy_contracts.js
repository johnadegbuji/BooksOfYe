const BooksOfYe = artifacts.require("BooksOfYe");

module.exports = async function (deployer) {
  await deployer.deploy(BooksOfYe);
  
  const contract = await BooksOfYe.deployed();

  await contract.setPriceAndInventory();

  await contract.editSaleStatus(0, true, false, true);

  await contract.editSaleStatus(3, true, false, true);

  await contract.batchGiftMint(["0x83Dc54351dc94A791993A61a7Fe10a3c4399eE2d"], [33]); 

  

  
};
