// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract StockDataContract {

    struct StockData {
        string open;
        string high;
        string low;
    }

    event stock(string name_stock);

    mapping (string => StockData) public stockData;

    function updateWeather(string memory name_stock, string memory _open, string memory _high, string memory _low) public {
        stockData[name_stock].open = _open;
        stockData[name_stock].high = _high;
        stockData[name_stock].low = _low;
    }

    function requestStock(string memory name_stock) public returns(string memory) {
        emit stock(name_stock);
        return "Successfully requested stock details for Your detail!";
    }

    function getStock(string memory name_stock) public view returns(string memory, string memory, string memory){
        StockData memory currentstockData = stockData[name_stock];
        return (currentstockData.open, currentstockData.high, currentstockData.low);
    }
}


