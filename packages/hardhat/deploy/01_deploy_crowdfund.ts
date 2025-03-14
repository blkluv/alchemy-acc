import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { deployWithAA } from "../utils/deployWithAA";

/**
 * Deploys a contract named "Crowdfund" using a smart account associated to SIGNING_KEY, if provided,
 * or else a random signing key will be used
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
export const CONTRACT_NAME = "Crowdfund";
const deployCrowdfund: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const factory = await hre.ethers.getContractFactory(CONTRACT_NAME);

  // use account abstraction to deploy the contract, with the gas sponsored for us!
  const crowdfundAddress = await deployWithAA(factory, CONTRACT_NAME, hre);
  console.log("🚀 Crowdfund deployed to:", crowdfundAddress);

  const crowdfund = await hre.ethers.getContractAt(CONTRACT_NAME, crowdfundAddress);
  console.log("📊 Initial number of campaigns:", await crowdfund.numberOfCampaigns());
};

export default deployCrowdfund;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags Crowdfund
deployCrowdfund.tags = ["Crowdfund"];
