import {
    readdirSync,
    statSync,
    readFileSync,
    writeFileSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getDirectories(path) {
    return readdirSync(path).filter(function(file) {
        return statSync(path + "/" + file).isDirectory();
    });
}

function main() {
    const current_path_to_broadcast = join(
        __dirname,
        "..",
        "foundry",
        "broadcast/Deploy.s.sol"
    );

    const chains = getDirectories(current_path_to_broadcast);

    const allGeneratedContracts = {};

    chains.forEach((chain) => {
        allGeneratedContracts[chain] = {};
        const broadCastObject = JSON.parse(
            readFileSync(`${current_path_to_broadcast}/${chain}/run-latest.json`)
        );
        const transactionsCreate = broadCastObject.transactions.filter(
            (transaction) => transaction.transactionType == "CREATE"
        );
        transactionsCreate.forEach((transaction) => {
            allGeneratedContracts[chain][transaction.contractName] = transaction.contractAddress
        });
    });

    const TARGET_DIR = "../nextjs/generated/";
    if (!existsSync(TARGET_DIR)) {
        mkdirSync(TARGET_DIR);
    }
    writeFileSync(
        `${TARGET_DIR}address.ts`,
        `export const address = ${JSON.stringify(allGeneratedContracts)} as const;`,
    );
}

try {
    main();
} catch (error) {
    console.error(error);
    process.exitCode = 1;
}
