const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let SimpleStorageFactory, SimpleStorage

    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        SimpleStorage = await SimpleStorageFactory.deploy()
        await SimpleStorage.deployed() // To wait make sure it is deployed!
        console.log(SimpleStorage.address)
    })

    it("Should start with a favorite number of 123", async () => {
        const currentValue = await SimpleStorage.retrieve()
        const expectedValue = "123"

        assert.equal(currentValue.toString(), expectedValue) // ==   expect(currentValue.toString()).to.equal(expectedValue)
    })

    it("Should update the favorite number to 18", async () => {
        const update = await SimpleStorage.store("18")
        await update.wait(1)

        const updatedValue = await SimpleStorage.retrieve()
        const expectedValue = "18"

        assert.equal(updatedValue.toString(), expectedValue)
    })

    it("Should add person to personMap", async () => {
        const personMap = await SimpleStorage.addPerson("5", "Mert")
        let updatePersonMap = await SimpleStorage.personMap("Mert")

        assert.equal(updatePersonMap.toString(), "5")
    })

    it("Should add person to peopleArray", async () => {
        const peopleArray = await SimpleStorage.addPerson("5", "Mert")
        let updatedPeopleArray = await SimpleStorage.peopleArray([0])

        assert.equal(updatedPeopleArray[0].toString(), "5")
        assert.equal(updatedPeopleArray[1], "Mert")
    })
})
