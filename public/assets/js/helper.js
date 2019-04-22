const Web3 = require("../../../node_modules/web3"); // import web3 v1.0 constructor

// use globally injected web3 to find the currentProvider and wrap with web3 v1.0
const getWeb3 = (provider) => {
    if(provider === undefined)  {
        provider = null;
    }
    const myWeb3 = new Web3(provider);
    return myWeb3;
};

module.exports = {getWeb3};