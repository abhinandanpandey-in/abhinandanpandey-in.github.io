const TOOLS = [
  { name: "get_research_profile", description: "Returns the public AI security research profile.", inputSchema: { type: "object", properties: {}, additionalProperties: false } },
  { name: "list_publications", description: "Lists public research papers and technical writeups.", inputSchema: { type: "object", properties: {}, additionalProperties: false } }
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
    { title: "Prompt Injection and Tool Hijacking in Agentic Large Language Model Systems (v1)", type: "paper", version: "v1", url: "https://abhinandanpandey-in.github.io/research_paper-1.pdf" },
    { title: "Prompt Injection and Tool Hijacking in Agentic LLMs (v2 - Extended Edition)", type: "paper", version: "v2-extended", url: "https://abhinandanpandey-in.github.io/research_paper-2.pdf" },
    { title: "Building Guardrails That Don't Rely on the Model Behaving", type: "article", url: "https://abhinandanpandey-in.github.io/healthcare-rag-guardrails.html" },
    { title: "Why I Fine-Tuned a LoRA Adapter Instead of Just Prompting", type: "article", url: "https://abhinandanpandey-in.github.io/threat-intel-lora.html" }
  ]
};

const MAX_BODY_BYTES = 4096;
const PROTOCOL_VERSION = "2025-03-26";
const ALLOWED_ORIGIN = "https://abhinandanpandey-in.github.io";
const HEADERS = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Vary": "Origin",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version",
  "Access-Control-Expose-Headers": "MCP-Protocol-Version",
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff"
};

function response(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), { status, headers: { ...HEADERS, ...extra } });
}
function error(id, code, message, status = 200) {
  return response({ jsonrpc: "2.0", id: id ?? null, error: { code, message } }, status);
}
function object(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function validEnvelope(value) {
  if (!object(value) || value.jsonrpc !== "2.0") return false;
  if (typeof value.method !== "string" || value.method.length === 0) return false;
  if (value.params !== undefined && !object(value.params)) return false;
  if (Object.hasOwn(value, "id")) {
    const id = value.id;
    if (!(id === null || typeof id === "string" || (typeof id === "number" && Number.isFinite(id)))) return false;
  }
  return true;
}
async function readLimited(request) {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("BODY_TOO_LARGE");
      }
      chunks.push(part.value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}
function dispatch(message) {
  const hasId = Object.hasOwn(message, "id");
  const id = hasId ? message.id : null;
  const params = message.params || {};

  // JSON-RPC notifications do not receive a JSON-RPC response.
  if (!hasId) return new Response(null, { status: 202, headers: HEADERS });

  if (message.method === "initialize") {
    if (typeof params.protocolVersion !== "string") return error(id, -32602, "Invalid initialize parameters");
    return response({
      jsonrpc: "2.0", id,
      result: {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "abhinandan-pandey-portfolio", version: "1.1.0" }
      }
    }, 200, { "MCP-Protocol-Version": PROTOCOL_VERSION });
  }
  if (message.method === "ping") return response({ jsonrpc: "2.0", id, result: {} });
  if (message.method === "tools/list") return response({ jsonrpc: "2.0", id, result: { tools: TOOLS } });
  if (message.method === "tools/call") {
    if (typeof params.name !== "string") return error(id, -32602, "tools/call requires a tool name");
    if (params.arguments !== undefined && !object(params.arguments)) return error(id, -32602, "Tool arguments must be an object");
    let data;
    if (params.name === "get_research_profile") data = PROFILE;
    else if (params.name === "list_publications") data = PUBLICATIONS;
    else return error(id, -32602, "Unknown tool");
    return response({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text: JSON.stringify(data, null, 2) }], isError: false } });
  }
  return error(id, -32601, "Method not found");
}

export async function onRequestOptions({ request }) {
  const origin = request.headers.get("Origin");
  if (origin && origin !== ALLOWED_ORIGIN) return new Response(null, { status: 403, headers: { "Vary": "Origin" } });
  return new Response(null, { status: 204, headers: HEADERS });
}
export async function onRequestPost({ request }) {
  const origin = request.headers.get("Origin");
  if (origin && origin !== ALLOWED_ORIGIN) return error(null, -32600, "Origin not allowed", 403);

  const type = (request.headers.get("Content-Type") || "").split(";")[0].trim().toLowerCase();
  if (type !== "application/json") return error(null, -32600, "Content-Type must be application/json", 415);

  const length = request.headers.get("Content-Length");
  if (length !== null && (!/^\d+$/.test(length) || Number(length) > MAX_BODY_BYTES)) {
    return error(null, -32600, "Invalid or oversized Content-Length", 413);
  }

  let raw;
  try { raw = await readLimited(request); }
  catch (e) {
    if (e && e.message === "BODY_TOO_LARGE") return error(null, -32600, "Request body too large", 413);
    return error(null, -32700, "Invalid request body", 400);
  }

  let message;
  try { message = JSON.parse(raw); }
  catch { return error(null, -32700, "Parse error", 400); }
  if (!validEnvelope(message)) return error(null, -32600, "Invalid JSON-RPC request", 400);
  return dispatch(message);
}
