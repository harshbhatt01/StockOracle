const { Contract, ethers } = require('ethers');
const axios = require('axios');
const { userAbi, oracleAbi } = require('./abi')

async function getStockData(){
    const userContractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"
    const oracleContractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner()
    const userContract = new Contract(userContractAddress, userAbi, signer)
    const oracleContract = new Contract(oracleContractAddress, oracleAbi, signer)

   
    const xyz = await userContract.callEmitEvent("TSLA","0x2546BcD3c84621e976D8185a91A922aE77ECEc30",{value:ethers.utils.parseEther("2"), gasLimit : 300000})
    console.log(xyz)
    const data = await userContract.get()
    console.log("Data :",data)
    // const data = abc
    const Name_of_Stock = data[0]
    const address_of_sender = data[1]
    const id = data[2]
    //console.log(h[0]);
    const transactionResponse = await oracleContract.add(Name_of_Stock,address_of_sender)
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
          
          const updateData = await oracleContract.storeStockData(open_,high_,low_, id)
          //console.log(updateData);
          const finalData = await oracleContract.getStockData(id)
          console.log(finalData)
  
    } catch (e) {
      console.error(e);
  }
  }
  
  getStockData().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });