const hre = require("hardhat");
const { Contract, ethers } = require('ethers');
const axios = require('axios');

async function main() {


  const api = await hre.ethers.getContractFactory("Oracle");
  const _api = await api.deploy();

  await _api.deployed();

  console.log(
    "Address :", _api.address
  );

  const Contract2 = await hre.ethers.getContractFactory("Contract2");
  const contract2 = await Contract2.deploy(_api.address);

  await contract2.deployed();

  console.log(
    "Contract_Address :", contract2.address
  );

  const xyz = await contract2.callEmitEvent("TSLA","0x2546BcD3c84621e976D8185a91A922aE77ECEc30")
  const data = await contract2.get()
  // const data = abc
  const Name_of_Stock = data[0]
  const address_of_sender = data[1]
  const id = data[2]
  //console.log(h[0]);
  const transactionResponse = await _api.add(Name_of_Stock,address_of_sender)
  const transactionReceipt = await transactionResponse.wait()
  console.log("Done-> ",transactionReceipt.events[0].args.name_ofStock)
  console.log(transactionReceipt.events[0].args.sender)
  //Name = transactionReceipt.events[0].args.name_stock


  try {
        Name = transactionReceipt.events[0].args.name_ofStock;
        const apiKey = 'uVkr9z1EwjmDoCJyI1XjeKFBo8KF5B1m';
        const StockAPI = `https://api.polygon.io/v1/open-close/${Name}/2023-01-09?adjusted=true&apiKey=${apiKey}`
        const response = await axios.get(StockAPI);
        const StockData = response.data;
        //console.log(PlayerData);
        open_ = StockData.open.toString();
        high_ = StockData.high.toString();
        low_ = StockData.low.toString();
        console.log(open_, high_, low_,id);
        
        const updateData = await _api.storeStockData(open_,high_,low_, id)
        //console.log(updateData);
        const finalData = await _api.getStockData(id)
        console.log(finalData)

  } catch (e) {
    console.error(e);
}
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});