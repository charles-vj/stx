require('@nomiclabs/hardhat-waffle')

require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-ethers')
require('dotenv').config()
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

const accounts = [process.env.PRIVATE_KEY]

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.9',
  networks: {
    mumbai: {
      url: 'https://matic-mumbai.chainstacklabs.com',
      chainId: 80001,
      accounts,
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161	',
      chainId: 5,
      accounts,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN,
  },
}
