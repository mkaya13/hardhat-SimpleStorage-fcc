require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number.js")
require("hardhat-gas-reporter")
require("solidity-coverage")

// This is a simple hardhat task. To learn more how to create your own tasks go to
// https://hardhat.org/guides/create-task.html

task(
    "accounts",
    "Prints the list of accounts in Hardhat BC",
    async (taskArgs, hre) => {
        const accounts = await hre.ethers.getSigners()

        for (const account of accounts) {
            console.log(account.address)
        }
    }
)

/** @type import('hardhat/config').HardhatUserConfig */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-rinkeby"
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY || "0xkey"

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "key"
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY || "key"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [RINKEBY_PRIVATE_KEY],
            chainId: 4,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [GOERLI_PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts: Thanks hardhat for configuring for us!
            chainId: 31337,
        },
    },
    solidity: "0.8.7",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },
}
