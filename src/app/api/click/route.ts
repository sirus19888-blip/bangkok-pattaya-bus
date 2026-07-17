import { after } from "next/server";

const GA4_MEASUREMENT_ID = "G-0DYTH1TLGB";
// A fixed client ID keeps server-side click events from inflating GA4 user counts.
const SERVER_CLIENT_ID = "bpb-server-click-logger";

const allowedProviders = new Set(["12go", "agoda", "ttg"]);

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};

  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return new Response(null, { status: 400 });
  }

  const provider = typeof body.provider === "string" ? body.provider : "";

  if (!allowedProviders.has(provider)) {
    return new Response(null, { status: 400 });
  }

  const event = {
    name: "affiliate_click_srv",
    params: {
      provider,
      cta_position: String(body.cta_position ?? "").slice(0, 64),
      route_id: String(body.route_id ?? "").slice(0, 64),
      lang: String(body.lang ?? "").slice(0, 8),
      to: String(body.to ?? "").slice(0, 64),
    },
  };

  after(async () => {
    const apiSecret = process.env.GA4_MP_API_SECRET;

    if (!apiSecret) {
      console.log("[affiliate_click_srv]", JSON.stringify(event.params));
      return;
    }

    try {
      await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${apiSecret}`,
        {
          method: "POST",
          body: JSON.stringify({ client_id: SERVER_CLIENT_ID, events: [event] }),
        },
      );
    } catch (error) {
      console.error("[affiliate_click_srv] MP error", error);
    }
  });

  return new Response(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  });
}
