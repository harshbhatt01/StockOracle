
const hre = require("hardhat");

async function main() {

  const StockDataContract = await hre.ethers.getContractFactory("StockDataContract");
  const _StockDataContract = await StockDataContract.deploy();

  await _StockDataContract.deployed();
  console.log(_StockDataContract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
