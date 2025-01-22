import { DeployFunction } from "hardhat-deploy/types";
import { typedDeployments } from "@utils";

const migrate: DeployFunction = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = typedDeployments(deployments);
  const { deployer, admin, operator } = await getNamedAccounts();

  const tokenAddress = "0x55d398326f99059fF775485246999027B3197955";

  await deploy("Rubyscore_Sponsor_Deposit", {
    from: deployer,
    args: [admin, operator, tokenAddress],
    log: true,
  });
  console.log("Ready \n");
};

migrate.tags = ["depos"];

export default migrate;
