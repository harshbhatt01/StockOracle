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

    function callEmitEvent(string memory name_ofStock, address sender) public returns (string memory, address) {
        stock = name_ofStock;
        add = sender;
        c1.add(name_ofStock,sender);
        return c1.add(name_ofStock,sender);
    }

    function get() public view returns(string memory, address){
        return(stock,add);
    }
}