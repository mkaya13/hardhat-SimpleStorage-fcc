// imports
const { ethers, run, network } = require("hardhat") // instead of const{ethers} = require("ethers")

// async main
async function main() {
    /* Now if we pulled from ethers in the import instead of hardhat, the package ethers doesnt know about the contracts folder that holds
  our compilation files (artifacts/contracts/SimpleStorage.sol/SimpleStorage.json) So hardhat does know we already compiled our solidity file */

    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    console.log("Deploying the contract: ")

    const SimpleStorage = await SimpleStorageFactory.deploy()
    await SimpleStorage.deployed() // To wait make sure it is deployed!

    console.log(SimpleStorage)

    // Where is the private key? // If we use hardhat built-in BC, we automatically use the PK and RPC_URL we are provided.
    // Where is the RPC_URL?

    console.log("SimpleStorage Smart Contract address:")

    console.log(SimpleStorage.address)

    console.log(network.config)

    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block txes...")
        await SimpleStorage.deployTransaction.wait(6) // Waits for 6 block confirmations!
        await verify(SimpleStorage.address, [])
    }

    const currentValue = await SimpleStorage.retrieve()
    console.log(`Current value is: ${currentValue}`)

    // Update the current value
    const updateValue = await SimpleStorage.store("53")
    await updateValue.wait(1)

    const updatedCurrentValue = await SimpleStorage.retrieve()

    console.log(`Updated value is: ${updatedCurrentValue.toString()}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
