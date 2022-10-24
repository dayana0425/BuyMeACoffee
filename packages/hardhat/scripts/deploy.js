const hre = require("hardhat");
const fs = require("fs");

const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

async function main() {
  // Get wallet information using your mnemonic or private key
  const wallet = (process.env.MNEMONIC && process.env.MNEMONIC.length > 0) ? 
  ethers.Wallet.fromMnemonic(process.env.MNEMONIC) : 
  new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
  console.log(`Using address ${wallet.address}`);
  // Provider: Alchemy
  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.MUMBAI_ALCHEMY_KEY
  );
  // Get Signer
  const signer = wallet.connect(provider);
  // Get Wallet Balance
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  // If not enough Matic, throw error
  if (balance < 0.01) {
    throw new Error("Not enough Matic");
  }

  // Get an Instance of your Smart Contract
  const BuyMeCoffee = await hre.ethers.getContractFactory("BuyMeCoffee");
  // Deploy that Instance
  const buyMeCoffee = await BuyMeCoffee.deploy();

  console.log("Deploying contract...");
  console.log("Awaiting confirmations");

  // Whenever you send a transaction you always need to 'await' for that transaction to finalize.
  await buyMeCoffee.deployed();

  console.log("Completed!");
  console.log("BuyMeCoffee.sol deployed to:", buyMeCoffee.address);

  /* 
  Everytime you deploy your contract using this script, 
  the new contract address is saved automatically in the utils folder on the front-end
  */
  fs.writeFileSync(
    "../next-app/utils/contractAddress.js",
    `export const contractAddress = "${buyMeCoffee.address}"`
  );
  console.log("Contract Address Saved At ../next-app/utils/contractAddress.js");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
