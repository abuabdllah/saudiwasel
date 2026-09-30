import { cities } from "./cities.js";
import { normalizeSaudiPhone } from "./phone.js";

export function validateLead(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return { ok: false, error: "Invalid request" };
  const text = (key, maximum) => typeof payload[key] === "string" ? payload[key].trim().slice(0, maximum + 1) : "";
  const name = text("name", 100);
  const phone = normalizeSaudiPhone(text("phone", 20));
  const district = text("district", 150);
  const city = text("city", 50);
  const operator = text("operator", 30);
  const buildingType = text("buildingType", 40);
  const service = text("service", 20);
  const sourcePath = text("sourcePath", 250);
  const submissionId = text("submissionId", 36);
  if (payload.website || payload.consent !== true || payload.consentVersion !== "2026-09-30") return { ok: false, error: "Consent required" };
  if (name.length < 2 || name.length > 100 || district.length < 2 || district.length > 150) return { ok: false, error: "Name and neighbourhood are required" };
  if (!/^(?:05\d{8}|\+?9665\d{8})$/.test(phone)) return { ok: false, error: "Valid Saudi mobile number required" };
  if (!cities.some((entry) => entry.slug === city)) return { ok: false, error: "Invalid city" };
  if (!["any", "stc", "salam", "mobily", "zain"].includes(operator)) return { ok: false, error: "Invalid operator" };
  if (!["home", "apartment", "office"].includes(buildingType) || !["fiber", "5g", "compare"].includes(service)) return { ok: false, error: "Invalid service" };
  if (!/^\/[a-z0-9/\-]*$/.test(sourcePath) || sourcePath.length > 250) return { ok: false, error: "Invalid source" };
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) return { ok: false, error: "Invalid submission" };
  return { ok: true, lead: { name, phone, district, city, operator, buildingType, service, sourcePath, submissionId, consent: true, consentVersion: "2026-09-30" } };
}
