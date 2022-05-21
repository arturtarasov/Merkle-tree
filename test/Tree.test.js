const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Tree", function () {
  let acc1
  let tree

  beforeEach(async function() {
    [acc1, acc2] = await ethers.getSigners()
    const Tree = await ethers.getContractFactory("Tree", acc1)
    tree = await Tree.deploy() // send transaction
    await tree.deployed() // upload transaction
  })

  it("should be deployed", async function() {
    expect(tree.address).to.be.properAddress
  })

  // "TX3: John -> Mary"
  // 2
  // 0xa0da473a78c18b28d88660e9e845ae6ff6b0cc3e7e6901a4fc8cad162a6aaba8
  // 0xdca11aec2d04146b1bbc933b1447aee4927d081c9274fcc6d02809b4ee2e56d8
  // 0x58e9a664a4c1e26694e09437cad198aebc6cd3c881ed49daea6e83e79b77fead
  //        ROOT

  //   H1-2      H3-4

  // H1   H2   H3   H4

  // TX1  TX2  TX3  TX4

  it ("should be verify transaction", async () => {
    const isVerify = await tree.verify(
      "TX3: John -> Mary", 
      2, 
      "0xa0da473a78c18b28d88660e9e845ae6ff6b0cc3e7e6901a4fc8cad162a6aaba8",
      ["0xdca11aec2d04146b1bbc933b1447aee4927d081c9274fcc6d02809b4ee2e56d8",
      "0x58e9a664a4c1e26694e09437cad198aebc6cd3c881ed49daea6e83e79b77fead"]
    )
    expect(isVerify).to.be.true
  })

  it ("should be not verify transaction", async () => {
    const isVerify = await tree.verify(
      "TX3: John -> Mary", 
      2, 
      "0xa0da473a78c18b28d88660e9e845ae6ff6b0cc3e7e6901a4fc8cad162a6aaba8",
      ["0xdca11aec2d04146b1bbc933b1447aee4927d081c9274fcc6d02809b4ee2e56d8",
      "0x58e9a664a4c1e26694e09437cad198aebc6cd3c881ed49daea6e83e79b77fea6"]
    )
    expect(isVerify).to.be.false
  })
})