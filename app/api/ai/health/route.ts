import { NextResponse } from "next/server";

type AiHealthStatus = "ai_aktif" | "missing_env" | "provider_error" | "fallback_local";

export async function GET() {
  const provider = process.env.AI_PROVIDER;
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL;

  if (provider !== "openrouter") {
    return NextResponse.json({
      ok: true,
      status: "fallback_local" as AiHealthStatus,
      message: "Provider AI tidak aktif, mode fallback lokal digunakan.",
    });
  }

  if (!apiKey || !model) {
    return NextResponse.json({
      ok: true,
      status: "missing_env" as AiHealthStatus,
      message: "Environment variable OpenRouter belum lengkap.",
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "https://fitbitedemo.vercel.app",
        "X-Title": process.env.OPENROUTER_APP_NAME || "Fitbite",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json({
        ok: true,
        status: "provider_error" as AiHealthStatus,
        message: "OpenRouter merespons error, fallback lokal tetap tersedia.",
      });
    }

    return NextResponse.json({
      ok: true,
      status: "ai_aktif" as AiHealthStatus,
      message: "OpenRouter aktif dan siap dipakai.",
    });
  } catch {
    return NextResponse.json({
      ok: true,
      status: "provider_error" as AiHealthStatus,
      message: "Gagal menjangkau OpenRouter, fallback lokal tetap tersedia.",
    });
  }
}
