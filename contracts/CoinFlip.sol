// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CoinFlip {
    address public owner;

    event CoinFlipped(address indexed player, uint256 amount, bool won);

    constructor() {
        owner = msg.sender;
    }

    function flip(bool _heads) public payable {
        require(msg.value > 0, "Must bet some ETH");

        // Simple pseudo-randomness (Not suitable for production)
        bool result = (block.timestamp % 2 == 0);

        if (result == _heads) {
            payable(msg.sender).transfer(msg.value * 2);
            emit CoinFlipped(msg.sender, msg.value, true);
        } else {
            emit CoinFlipped(msg.sender, msg.value, false);
        }
    }

    // Withdraw contract balance (Owner only)
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    // Fallback function to accept ETH
    receive() external payable {}
}
