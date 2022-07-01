const { NFTStorage, File } = require("nft.storage");
const mime = require("mime");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} imagePath the path to an image file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */

async function storeNFTs(imagesPath) {
  const fullImagesPath = path.resolve(imagesPath);
  const files = fs.readdirSync(fullImagesPath);
  let responses = [];
  for (fileIndex in files) {
    const image = await fileFromPath(`${fullImagesPath}/${files[fileIndex]}`);
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    const dogName = files[fileIndex].replace(".png", "");
    const response = await nftstorage.store({
      image,
      name: dogName,
      description: `An adorable ${dogName}`,
    });
    responses.push(response);
  }
  return responses;
}