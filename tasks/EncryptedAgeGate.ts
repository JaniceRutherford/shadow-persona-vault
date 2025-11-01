import { task } from "hardhat/config";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy-encrypted-age-gate", "Deploy EncryptedAgeGate contract")
  .setAction(async (taskArgs, hre) => {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const EncryptedAgeGate = await hre.ethers.getContractFactory("EncryptedAgeGate");
    const encryptedAgeGate = await EncryptedAgeGate.deploy();

    await encryptedAgeGate.waitForDeployment();
    const contractAddress = await encryptedAgeGate.getAddress();

    console.log("EncryptedAgeGate deployed to:", contractAddress);

    // Save deployment info
    const fs = require("fs");
    const deployments = {
      EncryptedAgeGate: {
        address: contractAddress,
        deployer: deployer.address,
        network: hre.network.name,
        deploymentTime: new Date().toISOString()
      }
    };

    fs.writeFileSync(
      `./deployments/${hre.network.name}/EncryptedAgeGate.json`,
      JSON.stringify(deployments, null, 2)
    );

    console.log(`Deployment info saved to ./deployments/${hre.network.name}/EncryptedAgeGate.json`);
  });

task("verify-age-gate", "Verify age eligibility for an address")
  .addParam("address", "The address to verify")
  .addParam("minage", "The minimum age requirement")
  .setAction(async (taskArgs, hre) => {
    const deployment = require(`../deployments/${hre.network.name}/EncryptedAgeGate.json`);
    const contractAddress = deployment.EncryptedAgeGate.address;

    const EncryptedAgeGate = await hre.ethers.getContractFactory("EncryptedAgeGate");
    const contract = EncryptedAgeGate.attach(contractAddress);

    const hasSubmitted = await contract.hasUserSubmitted(taskArgs.address);
    console.log(`Address ${taskArgs.address} has submitted age:`, hasSubmitted);

    if (hasSubmitted) {
      const isEligible = await contract.verifyAge(taskArgs.minage);
      console.log(`Address ${taskArgs.address} is eligible for age ${taskArgs.minage}:`, isEligible);
    }
  });
