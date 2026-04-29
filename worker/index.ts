/**
 * Cloudflare Worker — Groq LLM proxy for News_doc dashboard
 */

interface Env {
  GROQ_API_KEY: string;
}

const ALLOWED_ORIGINS = new Set<string>([
  "https://yonchelee.github.io",
  "http://localhost:8000",
  "http://localhost:8765",
  "http://127.0.0.1:8000",
  "http://127.0.0.1:8765",
]);

function corsHeaders(origin: string | null): HeadersInit {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(body: unknown, init: ResponseInit & { origin?: string | null } = {}) {
  const { origin = null, ...rest } = init;
  return new Response(JSON.stringify(body), {
    ...rest,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(origin),
      ...(rest.headers || {}),
    },
  });
}

export default {
  async fetch(req: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);
    const origin = req.headers.get("Origin");

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (req.method === "GET" && url.pathname === "/") {
      return json({ ok: true, service: "news-doc-llm-proxy" }, { origin });
    }

    // 진단용: 키 메타 (값 노출 X, prefix와 length만)
    if (req.method === "GET" && url.pathname === "/_debug" && origin && ALLOWED_ORIGINS.has(origin)) {
      const k = (env.GROQ_API_KEY || "").trim();
      return json({
        keyPresent: k.length > 0,
        keyLength: k.length,
        keyPrefix: k.slice(0, 4),
        keyHasWhitespace: k !== env.GROQ_API_KEY,
      }, { origin });
    }

    if (!origin || !ALLOWED_ORIGINS.has(origin)) {
      return json({ error: "Forbidden: origin not allowed" }, { status: 403, origin });
    }

    if (req.method !== "POST" || url.pathname !== "/chat") {
      return json({ error: "Not found" }, { status: 404, origin });
    }

    const apiKey = (env.GROQ_API_KEY || "").trim();
    if (!apiKey) {
      return json({ error: "Worker secret GROQ_API_KEY not configured" }, { status: 500, origin });
    }

    let payload: any;
    try {
      payload = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, { status: 400, origin });
    }

    if (!payload.model) {
      payload.model = "llama-3.3-70b-versatile";
    }
    payload.stream = false;

    const groqUrl = "https://api.groq.com/openai/v1/chat/completions";
    let upstream: Response;
    try {
      upstream = await fetch(groqUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "User-Agent": "news-doc-llm-proxy/1.0",
        },
        body: JSON.stringify(payload),
      });
    } catch (e: any) {
      return json({ error: "Upstream fetch failed", detail: String(e?.message || e) }, { status: 502, origin });
    }

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") || "application/json",
        ...corsHeaders(origin),
        // 디버그: 업스트림 status를 헤더로 노출 (값 그대로)
        "X-Upstream-Status": String(upstream.status),
      },
    });
  },
};
