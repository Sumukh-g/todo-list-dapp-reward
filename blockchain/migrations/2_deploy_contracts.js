const Todos = artifacts.require("Todos");
const TaskFactory = artifacts.require("TaskFactory");

module.exports = async function (deployer) {
  // Deploy Todos contract which inherits from TaskFactory
  // TaskFactory already includes Financable and Prizable through inheritance
  await deployer.deploy(Todos);
};
