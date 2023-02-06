// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
contract Oracle {
    
    string _open;
    string _high ;      
    string _low;

    struct Co_ordinates{
        string name_ofStock;
        address sender;
    }

    event Updatedinput(string name_ofStock, address sender);

    
    Co_ordinates[] public people;

    function add(string memory name_ofStock, address sender) public returns (string memory,address){
        people.push(Co_ordinates({name_ofStock : name_ofStock,sender : sender}));
       
        emit Updatedinput(name_ofStock,sender);
        return (name_ofStock,sender);
    }

    function storeStockData(string memory name_ofStock, string memory open, string memory high, string memory low) public {
        _open = open;
        _high = high;
        _low = low;
    }

    function getStockData(string memory name_ofStock) public view returns (string memory, string memory, string memory){
        return(_open,_high,_low);
    }

}