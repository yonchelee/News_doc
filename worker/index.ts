/**
 * Cloudflare Worker — Groq LLM proxy for News_doc dashboard
 *
 * 단일 엔드포인트: POST /chat
 * - request body: OpenAI-호환 chat completions 페이로드 (Groq forward)
 * - GROQ_API_KEY 는 Worker secret 으로 보관 (클라이언트 노출 X)
 * - CORS: yonchelee.github.io + localhost(개발용) 만 허용
 * - 응답: Groq 응답 그대로 forward
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
  // origin이 허용 목록이면 그 값을 echo, 아니면 빈 헤더 (브라우저가 막음)
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

    // Preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // Health check
    if (req.method === "GET" && url.pathname === "/") {
      return json({ ok: true, service: "news-doc-llm-proxy" }, { origin });
    }

    // Origin 검사 — 외부에서 직접 호출 차단 (CORS와 별개로 서버에서도 거부)
    if (!origin || !ALLOWED_ORIGINS.has(origin)) {
      return json({ error: "Forbidden: origin not allowed" }, { status: 403, origin });
    }

    if (req.method !== "POST" || url.pathname !== "/chat") {
      return json({ error: "Not found" }, { status: 404, origin });
    }

    if (!env.GROQ_API_KEY) {
      return json({ error: "Worker secret GROQ_API_KEY not configured" }, { status: 500, origin });
    }

    let payload: any;
    try {
      payload = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, { status: 400, origin });
    }

    // 기본 모델 강제 (요청에 model 없으면)
    if (!payload.model) {
      payload.model = "llama-3.3-70b-versatile";
    }
    // Streaming 비활성화 (간단화)
    payload.stream = false;

    const groqUrl = "https://api.groq.com/openai/v1/chat/completions";
    let upstream: Response;
    try {
      upstream = await fetch(groqUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
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
      },
    });
  },
};
