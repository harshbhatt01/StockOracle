const hre = require("hardhat");
const { Contract, ethers } = require('ethers');
const axios = require('axios');

async function main() {


  const api = await hre.ethers.getContractFactory("StockDataContract");
  const _api = await api.deploy();

  await _api.deployed();

  console.log(
    "Address :", _api.address
  );

  const transactionResponse = await _api.requestStock("AAPL")
  const transactionReceipt = await transactionResponse.wait()
  console.log(transactionReceipt.events[0].args.name_stock)
  // Name = transactionReceipt.events[0].args.name_stock


  try {
        Name = transactionReceipt.events[0].args.name_stock
        const apiKey = 'uVkr9z1EwjmDoCJyI1XjeKFBo8KF5B1m';
        const StockAPI = `https://api.polygon.io/v1/open-close/${Name}/2023-01-09?adjusted=true&apiKey=${apiKey}`
        const response = await axios.get(StockAPI);
        const StockData = response.data;
        //console.log(PlayerData);
        open_ = StockData.open.toString();
        high_ = StockData.high.toString();
        low_ = StockData.low.toString();
        console.log(open_, high_, low_); 
        
        const updateData = await _api.updateWeather(Name,open_,high_,low_)
        //console.log(updateData);
        const finalData = await _api.getStock(Name)
        console.log(finalData)

  } catch (e) {
    console.error(e);
}
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});