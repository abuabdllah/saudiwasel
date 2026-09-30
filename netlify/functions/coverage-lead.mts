import type { Config } from "@netlify/functions";
import { getDatabase } from "../../db/index.js";
import { coverageLeads } from "../../db/schema.js";
import { validateLead } from "../../lib/lead-validation.js";

export default async function handler(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (request.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405, headers: { ...headers, Allow: "POST" } });
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return Response.json({ error: "Invalid origin" }, { status: 403, headers });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return Response.json({ error: "JSON required" }, { status: 415, headers });
  if (Number(request.headers.get("content-length")) > 6000) return Response.json({ error: "Payload too large" }, { status: 413, headers });
  let payload;
  try {
    const body = await request.text();
    if (body.length > 6000) return Response.json({ error: "Payload too large" }, { status: 413, headers });
    payload = JSON.parse(body);
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400, headers });
  }
  const result = validateLead(payload);
  if (!result.ok || !result.lead) return Response.json({ error: result.error }, { status: 400, headers });
  try {
    await getDatabase().insert(coverageLeads).values(result.lead).onConflictDoNothing({ target: coverageLeads.submissionId });
    return Response.json({ accepted: true, reference: result.lead.submissionId, coverage: "pending_verification" }, { status: 201, headers });
  } catch {
    return Response.json({ error: "Request could not be saved. Please retry or contact us on WhatsApp." }, { status: 503, headers });
  }
}

export const config: Config = {
  path: "/api/coverage-lead",
  rateLimit: { windowSize: 60, windowLimit: 5, aggregateBy: ["ip", "domain"] },
};
