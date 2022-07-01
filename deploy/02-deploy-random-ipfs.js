const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
const { storeImages } = require("../utils/uploadToPinata");

const imagesLocation = "./images/randomNft";

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  let tokenUris;

  if (process.env.UPLOAD_TO_PINATA == "true") {
    tokenUris = await handleTokenUris();
  }

  let vrfCoordinatorV2Address, subscriptionId;

  if (developmentChains.includes(network.name)) {
    const VRFCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
    vrfCoordinatorV2Address = VRFCoordinatorV2Mock.address;
    const tx = await VRFCoordinatorV2Mock.createSubscription();
    const txReceipt = await tx.wait(1);
    subscriptionId = txReceipt.events[0].args.subId;
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2;
    subscriptionId = networkConfig[chainId].subscriptionId;
  }

  log("-----------------------------");
  await storeImages(imagesLocation);
  // const args = [
  //   vrfCoordinatorV2Address, subscriptionId, networkConfig[chainId].gasLane, networkConfig[chainId].mintFee, networkConfig[chainId].callbackGasLimit, /*dogTokenUris*/, mintFee
  // ];
}

async function handleTokenUris() {
  tokenUris = [];



  return tokenUris;
}

module.exports.tags = ["all", "randomipfs", "main"];