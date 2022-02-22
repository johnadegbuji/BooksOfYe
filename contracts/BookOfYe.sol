// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract BookOfYe{

    uint[] public mintedTokens; 
    mapping(uint => bool) mintedTokenTracker; 

    constructor(){

    }

    function mint(uint id) public{
        require(!mintedTokenTracker[id], "ID has already been minted.");
        mintedTokenTracker[id] = true; 
        mintedTokens.push(id); 
    }


    function getMintedTokens() public view returns(uint[] memory){
        return mintedTokens; 
    }


}