const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
require("dotenv").config();


module.exports = {
  // contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://rinkeby.infura.io/v3/7d413b10034342858d6575865d559bc7`),
      network_id: 4, // eslint-disable-line camelcase
      // gas: 5500000, // Ropsten has a lower block limit than mainnet
      // confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    }
  },
  api_keys: {
    etherscan: process.env.API_KEY,
  },
  plugins: ["truffle-plugin-verify"],
   // Configure your compilers
   compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};
