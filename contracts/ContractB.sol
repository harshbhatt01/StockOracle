// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "./Oracle.sol";

contract Contract2 {
    Oracle c1;
    bool payment;


    constructor(address _c1) public {
        c1 = Oracle(_c1);
    }

    string public stock_symbol;
    address public sender_address;
    int public _id;

    function requestStockData(string memory _stock_symbol, address payable _sender_address) public payable returns (string memory, address, int, bool){
        (bool success) = c1.payForStockData{value:msg.value}();

        stock_symbol = _stock_symbol;
        sender_address = _sender_address;
        (string memory symbol, address sender, int id) = c1.addingStockData(_stock_symbol, _sender_address);
         _id = c1.id();
        return (symbol,sender,id,success);
    }

    function getData() public view returns(string memory, address, int){
        return(stock_symbol,sender_address, _id);
    }

    function retreiveData(uint id) public view returns(string memory, string memory,string memory){
        return c1.getStockData(id);
    }
}