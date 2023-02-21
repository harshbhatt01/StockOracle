const hre = require("hardhat");
const axios = require('axios');

async function main() {

  const oracle = await hre.ethers.getContractFactory("contracts/Oracle.sol:Oracle");
  const _oracle = await oracle.deploy();

  await _oracle.deployed();

  console.log(
    "oracel address :", _oracle.address
  );

  const user = await hre.ethers.getContractFactory("Contract2");
  const userContract = await user.deploy(_oracle.address);

  await userContract.deployed();

  console.log(
    "User_Contract_Address :", userContract.address
  );
}
main()