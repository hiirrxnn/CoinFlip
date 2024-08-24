async function main() {
  const CoinFlip = await ethers.getContractFactory("CoinFlip");
  const coinflip = await CoinFlip.deploy();
  await coinflip.deployed();
  console.log("CoinFlip deployed to:", coinflip.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
