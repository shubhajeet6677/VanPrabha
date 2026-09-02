import { config } from "dotenv";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

import {
    paymentMiddleware,
    x402ResourceServer,
} from "@x402/hono";

import { HTTPFacilitatorClient } from "@x402/core/server";
import type { ResourceServerExtension } from "@x402/core/types";

import { ExactAvmScheme } from "@x402/avm/exact/server";

import {
    USDC_TESTNET_ASA_ID,
} from "@x402/avm";

const ALGORAND_TESTNET_CAIP2 =
    "algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=";

import {
    declareDiscoveryExtension,
    bazaarResourceServerExtension,
} from "@x402-avm/extensions";

config();

const avmAddress = process.env.AVM_ADDRESS;
const facilitatorUrl = process.env.FACILITATOR_URL;

if (!avmAddress || !facilitatorUrl) {
    console.error(
        "Missing environment variables: AVM_ADDRESS or FACILITATOR_URL"
    );
    process.exit(1);
}

// Connect to the hosted x402 facilitator
const facilitatorClient = new HTTPFacilitatorClient({
    url: facilitatorUrl,
});

// Initialize the x402 resource server
const server = new x402ResourceServer(facilitatorClient);

// Register Algorand TestNet payment scheme
const avmServerScheme = new ExactAvmScheme();

server.register(
    ALGORAND_TESTNET_CAIP2,
    avmServerScheme
);

// Register Bazaar discovery extension
server.registerExtension(
    bazaarResourceServerExtension as unknown as ResourceServerExtension
);

// Describe the sensor-data response
const sensorDiscovery = declareDiscoveryExtension({
    output: {
        example: {
            status: "success",
            sensors: [
                {
                    id: "SENSOR-01",
                    location: "Sanjay Van",
                    temperature: 27.4,
                    humidity: 61,
                    airQuality: "Good",
                    status: "online",
                },
            ],
        },
    },
});

const app = new Hono();

app.use(
    "*",
    cors({
        origin: "http://localhost:5173",
        allowHeaders: ["Content-Type", "PAYMENT-SIGNATURE"],
        allowMethods: ["GET", "OPTIONS"],
        exposeHeaders: ["PAYMENT-REQUIRED", "PAYMENT-RESPONSE"],
    })
);

app.onError((err, c) => {
    console.error("X402 ERROR:", err);
    return c.json(
        {
            error: "Internal Server Error",
            message: err.message,
        },
        500
    );
});

// x402-protected endpoint
app.use(
    paymentMiddleware(
        {
            "GET /api/sensor-data": {
                accepts: [
                    {
                        scheme: "exact",
                        price: "$0.01",
                        network: ALGORAND_TESTNET_CAIP2,
                        payTo: avmAddress,
                        extra: {
                            asset: USDC_TESTNET_ASA_ID,
                        },
                    },
                ],
                description: "VanPrabha smart forest sensor data",
                mimeType: "application/json",
                extensions: sensorDiscovery,
            },
        },
        server
    )
);

// Sensor data
app.get("/api/sensor-data", (c) => {
    return c.json({
        status: "success",
        timestamp: new Date().toISOString(),
        sensors: [
            {
                id: "SENSOR-01",
                location: "Sanjay Van",
                temperature: 27.4,
                humidity: 61,
                airQuality: "Good",
                status: "online",
            },
            {
                id: "SENSOR-02",
                location: "Jahanpanah City Forest",
                temperature: 28.1,
                humidity: 58,
                airQuality: "Good",
                status: "online",
            },
            {
                id: "SENSOR-03",
                location: "Kamla Nehru Ridge",
                temperature: 26.8,
                humidity: 64,
                airQuality: "Moderate",
                status: "online",
            },
        ],
    });
});

// Free health-check endpoint
app.get("/", (c) => {
    return c.json({
        service: "VanPrabha x402 API",
        status: "online",
        network: "Algorand TestNet",
        payment: "USDC",
    });
});

// Start server
serve(
    {
        fetch: app.fetch,
        port: 4021,
    },
    () => {
        console.log(
            "VanPrabha x402 server running at http://localhost:4021"
        );
    }
);