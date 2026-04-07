import { JWT } from "google-auth-library";

export default async function handler(req: any, res: any) {

    if (!process.env.GOOGLE_PRIVATE_KEY) {
        throw new Error("Missing GOOGLE_PRIVATE_KEY");
    }

    try {
        const client = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
            key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
        });

        const tokens = await client.authorize();
        console.log(tokens)
        const access_token = tokens.access_token;

        const PROPERTY_ID = process.env.GA_PROPERTY_ID!;

        const fetchData = async (url: string, body: any) => {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            return response.json();
        };

        const realtime = await fetchData(
            `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runRealtimeReport`,
            {
                metrics: [{ name: "activeUsers" }],
                dimensions: [
                    { name: "city" },
                    { name: "unifiedPageScreenName" }
                ],
            }
        );

        const history = await fetchData(
            `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
            {
                dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
                dimensions: [{ name: "date" }],
                metrics: [
                    { name: "sessions" },
                    { name: "activeUsers" },
                    { name: "averageSessionDuration" },
                    { name: "engagementRate" },
                    { name: "eventCount" },
                ],
                orderBys: [
                    { dimension: { dimensionName: "date" }, desc: false },
                ],
            }
        );

        const devices = await fetchData(
            `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
            {
                dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
                dimensions: [{ name: "deviceCategory" }],
                metrics: [{ name: "sessions" }],
            }
        );

        res.status(200).json({ realtime, history, devices });

    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}