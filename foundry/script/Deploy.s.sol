// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";

contract DeployScript is Script {
    Counter public counter;

    function setUp() public {}

    function run() public {
        uint privateKey;
        if (block.chainid == 31337) {
            // anvil private key
            privateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        } else {
            privateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        }

        vm.startBroadcast(privateKey);

        // Deploy your contract

        counter = new Counter();
        console.logString(
            string.concat(
                "!!! YourContract deployed at: ",
                vm.toString(address(counter))
            )
        );

        vm.stopBroadcast();
    }
}
