const TOOLS = [
  {
    name: "get_research_profile",
    description: "Returns Abhinandan Pandey's AI security research focus, core open-source projects, and public links.",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "list_publications",
    description: "Lists research papers and technical writeups hosted on Abhinandan Pandey's portfolio.",
    inputSchema: { type: "object", properties: {} }
  }
];

const PROFILE = {
  name: "Abhinandan Pandey",
  role: "LLM Security Researcher & AI Red Teamer",
  focus: ["Prompt Injection", "MCP & Tool Hijacking Defense", "Agentic Pipeline Red Teaming", "Privilege Separation & Sandboxing"],
  projects: [
    { name: "LLM-Agent-RedTeam-Toolkit", focus: "Fuzzing & Guardrails", url: "https://github.com/abhinandanpandey-in/LLM-Agent-RedTeam-Toolkit" },
    { name: "mcp-shield", focus: "MCP & Tool Hijacking Defense", url: "https://github.com/abhinandanpandey-in/mcp-shield" },
    { name: "Agent-Isolate-X", focus: "Privilege Separation & Sandboxing", url: "https://github.com/abhinandanpandey-in/Agent-Isolate-X" }
  ],
  links: {
    portfolio: "https://abhinandanpandey-in.github.io/",
    github: "https://github.com/abhinandanpandey-in",
    linkedin: "https://www.linkedin.com/in/abhinandanpandey-in",
    security_txt: "https://abhinandanpandey-in.github.io/.well-known/security.txt"
  }
};

const PUBLICATIONS = {
  publications: [
    { title: "Prompt Injection and Tool Hijacking in Agentic Large Language Model Systems", type: "paper", url: "https://abhinandanpandey-in.github.io/research_paper-1.pdf" },
    { title: "Prompt Injection and Tool Hijacking in Agentic LLMs", type: "paper", url: "https://abhinandanpandey-in.github.io/research_paper-2.pdf" },
    { title: "Building Guardrails That Don't Rely on the Model Behaving", type: "article", url: "https://abhinandanpandey-in.github.io/healthcare-rag-guardrails.html" },
    { title: "Why I Fine-Tuned a LoRA Adapter Instead of Just Prompting", type: "article", url: "https://abhinandanpandey-in.github.io/threat-intel-lora.html" }
  ]
};

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept"
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

async function _origOnRequestPost({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, { status: 400, headers: CORS });
  }

  const { id = null, method, params } = body;

  if (method === "initialize") {
    return Response.json({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2025-03-26",
        capabilities: { tools: {} },
        serverInfo: { name: "abhinandan-pandey-portfolio", version: "1.0.0" }
      }
    }, { headers: CORS });
  }

  if (method === "tools/list") {
    return Response.json({ jsonrpc: "2.0", id, result: { tools: TOOLS } }, { headers: CORS });
  }

  if (method === "tools/call") {
    const name = params?.name;
    if (name === "get_research_profile" || name === "list_publications") {
      const payload = name === "get_research_profile" ? PROFILE : PUBLICATIONS;
      return Response.json({
        jsonrpc: "2.0",
        id,
        result: { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] }
      }, { headers: CORS });
    }
    return Response.json({ jsonrpc: "2.0", id, error: { code: -32602, message: `Unknown tool: ${name}` } }, { status: 400, headers: CORS });
  }

  return Response.json({ jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } }, { status: 404, headers: CORS });
}


// _RL_HARDENED_MCP: Edge guardrails preventing RL reward-oracle probing & payload abuse
const MAX_MCP_BYTES = 4096;

function uniformRpcError(status, code) {
  return new Response(
    JSON.stringify({ jsonrpc: "2.0", id: null, error: { code, message: "Request rejected by guardrail policy" } }),
    {
      status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "TDM-Reservation": "1",
        "X-RL-Environment-Policy": "sandboxed; reward-oracle=suppressed",
      },
    }
  );
}

export async function onRequestPost(context) {
  const ct = (context.request.headers.get("content-type") || "").toLowerCase();
  if (!ct.startsWith("application/json")) {
    return uniformRpcError(415, -32600);
  }

  const cl = Number(context.request.headers.get("content-length") || "0");
  if (Number.isFinite(cl) && cl > MAX_MCP_BYTES) {
    return uniformRpcError(413, -32600);
  }

  const rawBody = await context.request.text();
  if (new TextEncoder().encode(rawBody).length > MAX_MCP_BYTES) {
    return uniformRpcError(413, -32600);
  }

  const clonedReq = new Request(context.request.url, {
    method: "POST",
    headers: context.request.headers,
    body: rawBody,
  });

  const resp = await _origOnRequestPost({ ...context, request: clonedReq });
  const hardened = new Response(resp.body, resp);
  hardened.headers.set("TDM-Reservation", "1");
  hardened.headers.set("X-RL-Environment-Policy", "sandboxed; reward-oracle=suppressed");
  return hardened;
}
