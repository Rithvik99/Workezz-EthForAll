const Users = artifacts.require("Users")
const Jobs = artifacts.require("Jobs")

module.exports = function(deployer) {
    deployer.deploy(Users)
    deployer.deploy(Jobs)
}