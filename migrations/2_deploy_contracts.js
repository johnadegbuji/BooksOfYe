const BooksOfYe = artifacts.require("BooksOfYe");

module.exports = async function (deployer) {
  await deployer.deploy(BooksOfYe);
  
  const contract = await BooksOfYe.deployed();

  await contract.setPriceAndInventory();

  await contract.editSaleStatus(0, true, false, true);

  await contract.editSaleStatus(3, true, false, true);

  

  
};
