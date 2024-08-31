// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";

contract CounterScript is Script {
    Counter public counter;

    function setUp() public {}

    function run() public {
        if (block.chainid == 31337) {
            // anvil private key
            vm.startBroadcast(
                0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
            );
        } else {
            vm.startBroadcast();
        }

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
