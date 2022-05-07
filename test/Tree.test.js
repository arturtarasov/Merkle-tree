const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Tree", function () {
  let acc1
  let acc2
  let tree

  beforeEach(async function() {
    [acc1, acc2] = await ethers.getSigners()
    const Tree = await ethers.getContractFactory("Tree", acc1)
    tree = await Tree.deploy()
    await tree.deployed()
    console.log(tree)
  })

  it("should be deployed", async function() {
    expect(tree.address).to.be.properAddress
  })
})