import { expect } from "chai";
import { ethers } from "hardhat";
import { EncryptedAgeGate } from "../types";

describe("EncryptedAgeGate", function () {
  let encryptedAgeGate: EncryptedAgeGate;
  let owner: any;
  let user1: any;
  let user2: any;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const EncryptedAgeGateFactory = await ethers.getContractFactory("EncryptedAgeGate");
    encryptedAgeGate = await EncryptedAgeGateFactory.deploy();
    await encryptedAgeGate.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(await encryptedAgeGate.getAddress()).to.be.properAddress;
    });
  });

  describe("Age Submission", function () {
    it("Should allow user to submit encrypted age", async function () {
      // Mock encrypted age data (in real scenario, this would be encrypted with FHE)
      const mockEncryptedAge = ethers.toUtf8Bytes("25"); // Mock encrypted data
      const mockProof = ethers.toUtf8Bytes("proof"); // Mock proof

      await expect(encryptedAgeGate.connect(user1).submitEncryptedAge(mockEncryptedAge, mockProof))
        .to.emit(encryptedAgeGate, "AgeSubmitted")
        .withArgs(user1.address);

      expect(await encryptedAgeGate.hasUserSubmitted(user1.address)).to.be.true;
    });

    it("Should prevent duplicate submissions", async function () {
      const mockEncryptedAge = ethers.toUtf8Bytes("30");
      const mockProof = ethers.toUtf8Bytes("proof");

      await encryptedAgeGate.connect(user1).submitEncryptedAge(mockEncryptedAge, mockProof);

      await expect(
        encryptedAgeGate.connect(user1).submitEncryptedAge(mockEncryptedAge, mockProof)
      ).to.be.revertedWith("Age already submitted");
    });
  });

  describe("Age Verification", function () {
    beforeEach(async function () {
      // Submit age for user1
      const mockEncryptedAge = ethers.toUtf8Bytes("25");
      const mockProof = ethers.toUtf8Bytes("proof");
      await encryptedAgeGate.connect(user1).submitEncryptedAge(mockEncryptedAge, mockProof);
    });

    it("Should verify age eligibility correctly", async function () {
      // In a real FHE scenario, this would perform homomorphic comparison
      // For testing, we'll mock the behavior
      const minAge = 21;
      const isEligible = await encryptedAgeGate.connect(user1).verifyAge(minAge);

      expect(isEligible).to.be.true; // Mock result for testing
    });

    it("Should reject verification for non-submitted users", async function () {
      const minAge = 18;
      await expect(
        encryptedAgeGate.connect(user2).verifyAge(minAge)
      ).to.be.revertedWith("Age not submitted");
    });
  });

  describe("Statistics", function () {
    it("Should track user statistics", async function () {
      // Submit multiple users
      const users = [user1, user2];
      for (const user of users) {
        const mockEncryptedAge = ethers.toUtf8Bytes(Math.floor(Math.random() * 50 + 18).toString());
        const mockProof = ethers.toUtf8Bytes("proof");
        await encryptedAgeGate.connect(user).submitEncryptedAge(mockEncryptedAge, mockProof);
      }

      const stats = await encryptedAgeGate.getEncryptedStats();
      expect(stats.totalUsers).to.not.be.undefined;
      expect(stats.averageAge).to.not.be.undefined;
      expect(stats.minAge).to.not.be.undefined;
      expect(stats.maxAge).to.not.be.undefined;
    });
  });
});
