require('@nomiclabs/hardhat-ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.18",
  defaultNetwork : "sepolia",
  networks: {
    hardhat:{},
    sepolia: {
      url:process.env.url,
      accounts: [process.env.accounts],
    },
  },
};
//0x5FbDB2315678afecb367f032d93F642f64180aa3