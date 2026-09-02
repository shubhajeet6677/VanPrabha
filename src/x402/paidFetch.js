export async function fetchPaidSensorData(httpClient, client) {
    // First request — expect a 402 payment requirement.
    const response = await fetch(
        "http://localhost:4021/api/sensor-data"
    );

    if (response.ok) {
        return response.json();
    }

    if (response.status !== 402) {
        throw new Error(
            `Sensor API returned HTTP ${response.status}`
        );
    }

    // Read the x402 payment requirements.
    const paymentRequired =
        httpClient.getPaymentRequiredResponse(
            (name) => response.headers.get(name)
        );

    // Create and sign the payment through Pera.
    const paymentPayload =
        await client.createPaymentPayload(paymentRequired);

    // Encode the payment into the x402 header.
    const paymentSignature =
        httpClient.encodePaymentSignatureHeader(
            paymentPayload
        );

    // Immediately retry with the signed payment.
    const paidResponse = await fetch(
        "http://localhost:4021/api/sensor-data",
        {
            headers: paymentSignature,
        }
    );

    if (!paidResponse.ok) {
        throw new Error(
            `Paid sensor API request failed: HTTP ${paidResponse.status}`
        );
    }

    return paidResponse.json();
}