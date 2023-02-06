// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "./Oracle.sol";
contract Contract2 {
    Oracle c1;

    constructor(address _c1) public {
        c1 = Oracle(_c1);
    }

    string stock;
    address add;
    uint _id;

    function callEmitEvent(string memory name_ofStock, address sender) public returns (string memory, address, uint) {
        stock = name_ofStock;
        add = sender;
        c1.add(name_ofStock,sender);
        _id = c1.id();
        return c1.add(name_ofStock,sender);
    }

    function get() public view returns(string memory, address, uint ){
        return(stock,add, _id);
    }
}