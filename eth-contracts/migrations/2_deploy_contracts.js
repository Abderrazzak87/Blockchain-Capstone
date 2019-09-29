// migrating the appropriate contracts
var Verifier = artifacts.require("./Verifier.sol");
var CapstoneERC721Token = artifacts.require("./CapstoneERC721Token.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async (deployer) => {
  await deployer.deploy(Verifier);
  await deployer.deploy(CapstoneERC721Token, "SS_ERC721MintableToken", "SS_721M");
  await deployer.deploy(SolnSquareVerifier, Verifier.address, "SS_ERC721MintableToken", "SS_721M");
};