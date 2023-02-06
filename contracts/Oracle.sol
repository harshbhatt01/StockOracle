// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
contract Oracle {

    struct dataStruct {
        string _open;
        string _high;      
        string _low;
    }

    mapping(uint => dataStruct) public data;

    struct Co_ordinates{
        string name_ofStock;
        address sender;
    }

    uint public id = 0;
    event Updatedinput(string name_ofStock, address sender, uint id);

    
    Co_ordinates[] public people;

    function add(string memory name_ofStock, address sender) public returns (string memory,address,uint){
        people.push(Co_ordinates({name_ofStock : name_ofStock,sender : sender}));
        id++;
        emit Updatedinput(name_ofStock,sender,id);
        return (name_ofStock,sender,id);
    }

    function storeStockData(string memory open, string memory high, string memory low, uint _id) public {
        data[_id] = dataStruct(open,high,low);
    }

    function getStockData(uint _id) public view returns (string memory, string memory, string memory){
        return( data[_id]._open, data[_id]._high, data[_id]._low);
    }
}