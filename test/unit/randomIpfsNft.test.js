const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Random IPFS NFT Unit Tests", function () {
    let randomIpfsNft, deployer, vrfCoordinatorV2Mock;

    beforeEach(async () => {
      accounts = await ethers.getSigners();
      deployer = accounts[0];
      await deployments.fixture(["mocks", "randomipfs"]);
      console.log("PING")
      randomIpfsNft = await ethers.getContract("RandomIpfsNft");
      vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
    });

    describe("requestNft", () => {
      it("fails if payment isn't sent with request", async function () {
        await expect(randomIpfsNft.requestNft()).to.be.revertedWith("NeedMoreETHSent");
      });
      it("emits an event a kicks off a random word request", async function () {
        const fee = await randomIpfsNft.getMintFee();
        await expect(randomIpfsNft.requestNft({ value: fee.toString() })).to.emit(
          randomIpfsNft,
          "NftRequested"
        );
      });
    });
  });