const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CoinFlip", function () {
  let CoinFlip;
  let coinflip;
  let owner;
  let addr1;

  beforeEach(async function () {
    CoinFlip = await ethers.getContractFactory("CoinFlip");
    [owner, addr1] = await ethers.getSigners();
    coinflip = await CoinFlip.deploy();
    await coinflip.deployed();
  });

  it("Should let player flip and win or lose", async function () {
    const betAmount = ethers.utils.parseEther("1");
    await coinflip.connect(addr1).flip(true, { value: betAmount });
    
    const contractBalance = await ethers.provider.getBalance(coinflip.address);
    expect(contractBalance).to.be.equal(betAmount);  // Contract should hold the bet if lost
  });

  it("Owner should be able to withdraw", async function () {
    const betAmount = ethers.utils.parseEther("1");
    await coinflip.connect(addr1).flip(true, { value: betAmount });
    await coinflip.withdraw();
    
    const contractBalance = await ethers.provider.getBalance(coinflip.address);
    expect(contractBalance).to.be.equal(0);  // Withdrawn, balance should be zero
  });
});
