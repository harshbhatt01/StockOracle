const hre = require("hardhat");
const axios = require('axios');

async function main() {

  const api = await hre.ethers.getContractFactory("Oracle");
  const _api = await api.deploy();

  await _api.deployed();

  console.log(
    " Oracle Address :", _api.address
  );

  const Contract2 = await hre.ethers.getContractFactory("Contract2");
  const contract2 = await Contract2.deploy(_api.address);

  await contract2.deployed();

  console.log(
    "User Address :", contract2.address
  );
}
main()













