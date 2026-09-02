import { x402Client, x402HTTPClient } from "@x402/core/client";
import { ExactAvmScheme } from "@x402/avm/exact/client";
import { createPeraSigner } from "./peraSigner";

const ALGORAND_TESTNET_CAIP2 =
    "algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=";

export function createX402Client(peraWallet, address) {
    const signer = createPeraSigner(peraWallet, address);

    const scheme = new ExactAvmScheme(signer);

    const client = new x402Client();

    client.register(ALGORAND_TESTNET_CAIP2, scheme);

    const httpClient = new x402HTTPClient(client);

    return {
        client,
        httpClient,
    };
}