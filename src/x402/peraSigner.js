import algosdk from "algosdk";

export function createPeraSigner(peraWallet, address) {
    return {
        address,

        async signTransactions(txns, indexesToSign = []) {
            const transactionGroups = [
                txns.map((txnBytes, index) => ({
                    txn: algosdk.decodeUnsignedTransaction(txnBytes),
                    signers: indexesToSign.includes(index)
                        ? [address]
                        : [],
                })),
            ];

            console.log("x402 transactions sent to Pera:", transactionGroups);

            const peraSignedTxns = await peraWallet.signTransaction(
                transactionGroups
            );

            console.log(
                "Pera returned signed transactions:",
                peraSignedTxns
            );

            // Pera returns only the transactions that it actually signed.
            // x402 expects an array aligned with the original transaction indexes.
            const signedTxns = txns.map(() => null);

            let signedIndex = 0;

            for (const index of indexesToSign) {
                signedTxns[index] = peraSignedTxns[signedIndex] ?? null;
                signedIndex++;
            }

            console.log(
                "x402 aligned signed transactions:",
                signedTxns
            );

            return signedTxns;
        },
    };
}