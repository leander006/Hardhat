/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle')
const ALCHEMY_API_KEY="8-kSLYBjwpv2byGm7XEnu-5piqCIdp19";
const ROPSTEN_PRIVATE_KEY="64030b23951961ad8457ea9975cbef330602fbd2e1c59164bd2659a2159fe6e1";

module.exports = {
  solidity: "0.8.9",

  networks:{
    ropsten:{
      url:`https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
