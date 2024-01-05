// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const dotenv = require('dotenv');
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = { 
  solidity: "0.8.18",
  networks: {
    infura: {
      url: "https://goerli.infura.io/v3/7e173d4b8e214008a851bd204b19de68",
      accounts: [process.env.REACT_APP_PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: {
      goerli: 'HN237U89ZCXXQNQPIC78B9DJZGXT9SD2Q9' // Replace with your actual API key
    },
  },
};
