const { Contract, ethers } = require('hardhat');
const axios = require('axios');
const {userAbi, oracleAbi} = require("../Constrants/index.js")

async function getStockData(){
    const userContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    const oracleContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const provider = new ethers.providers.JsonRpcProvider();
    const signers = await ethers.getSigners();
    const userContract = new ethers.Contract(userContractAddress, userAbi, provider)
    const oracleContract = new ethers.Contract(oracleContractAddress, oracleAbi, provider)
    let value = 2*10**18;
    value = value.toString()
    let tx = await oracleContract.connect(signers[5]).addingStockData('TSLA',signers[5].address,{value});
    tx = await tx.wait()
    console.log("tx is ---", tx);
   
    // const xyz = await userContract.requestStockData("TSLA","0x2546BcD3c84621e976D8185a91A922aE77ECEc30",{value : ethers.utils.parseEther("2"), gasLimit : 300000})
    // const data = await userContract.getData()

    // const Name_of_Stock = data[0]
    // const address_of_sender = data[1]
    // const id = data[2]

    // const transactionResponse = await oracleContract.addingStockData(Name_of_Stock,address_of_sender)
    // const transactionReceipt = await transactionResponse.wait()
    // console.log("Name of stock :",transactionReceipt.events[0].args.name_ofStock)
    // console.log("Sender address input :",transactionReceipt.events[0].args.sender)
  
    // try {
    //       Name = transactionReceipt.events[0].args.name_ofStock;
    //       const apiKey = 'uVkr9z1EwjmDoCJyI1XjeKFBo8KF5B1m';
    //       const StockAPI = `https://api.polygon.io/v1/open-close/${Name}/2023-01-09?adjusted=true&apiKey=${apiKey}`
    //       const response = await axios.get(StockAPI);
    //       const StockData = response.data;

    //       open_ = StockData.open.toString();
    //       high_ = StockData.high.toString();
    //       low_ = StockData.low.toString();
          
    //       const updateData = await oracleContract.storeStockData(open_,high_,low_, id)
    //       const finalData = await oracleContract.getStockData(id)
    //       console.log(finalData)

    //     //retreving back in user's contract
    //     const getdata = await userContract.retreiveData(id)
    //     console.log(getdata);
  
  //   } catch (e) {
  //     console.error(e);
  // }
  }
  
  getStockData().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });