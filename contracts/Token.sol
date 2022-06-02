// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 < 0.9.0;
import "hardhat/console.sol";
contract Token
{
    string public name="Knock Token";
    string public symbol="kO$";
    uint256 public totalSupply = 10000;
    
    address public owner;
    mapping(address => uint256) balances;

    constructor()
    {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amt) external
    {

        console.log(" **Sender is sending %s token to %s address ** ",amt,to);
        console.log(" **Sender balance is %s token ** ", balances[msg.sender]); 
        require(balances[msg.sender] >= amt,"Not enough token");
        balances[msg.sender]-= amt;
        balances[to]+=amt;
    }

    function balance( address account) external view returns (uint256)
    {
        return balances[account];
    }

}