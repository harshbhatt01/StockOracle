// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "./Oracle.sol";

contract Contract2 {
    Oracle c1;
    bool payment;


    constructor(address _c1) public {
        c1 = Oracle(_c1);
    }

    string stock;
    address add;
    int _id;

    function callEmitEvent(string memory name_ofStock, address payable sender) public payable returns (string memory, address, int, bool){
        (bool success) = c1.payForStockData{value:msg.value}();

        stock = name_ofStock;
        add = sender;
        (string memory a, address b, int c) = c1.add(name_ofStock, sender);
         _id = c1.id();
        return (a,b,c,success);
    }

    function get() public view returns(string memory, address, int){
        return(stock,add, _id);
    }

    function retreiveData(uint id) public view returns(string memory, string memory,string memory){
        return c1.getStockData(id);
    }
}