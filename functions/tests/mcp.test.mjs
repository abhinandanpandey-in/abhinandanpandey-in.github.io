import test from "node:test";
import assert from "node:assert/strict";
import { onRequestPost, onRequestOptions } from "../mcp.js";
const req = (body, headers = {}) => new Request("https://example.test/mcp", {
  method: "POST", headers: { "Content-Type": "application/json", ...headers }, body
});
test("rejects wrong content type", async () => {
  const r = await onRequestPost({ request: req("{}", { "Content-Type": "text/plain" }) });
  assert.equal(r.status, 415);
});
test("rejects malformed JSON", async () => {
  const r = await onRequestPost({ request: req("{") });
  assert.equal(r.status, 400);
  assert.equal((await r.json()).error.code, -32700);
});
test("rejects invalid JSON-RPC envelope", async () => {
  const r = await onRequestPost({ request: req(JSON.stringify({ method: "tools/list" })) });
  assert.equal(r.status, 400);
});
test("initializes MCP", async () => {
  const r = await onRequestPost({ request: req(JSON.stringify({
    jsonrpc: "2.0", id: 1, method: "initialize",
    params: { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "test", version: "1" } }
  })) });
  assert.equal(r.status, 200);
  assert.equal((await r.json()).result.protocolVersion, "2025-03-26");
});
test("lists only the public read-only tools", async () => {
  const r = await onRequestPost({ request: req(JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list" })) });
  assert.deepEqual((await r.json()).result.tools.map(x => x.name), ["get_research_profile", "list_publications"]);
});
test("rejects unknown tools", async () => {
  const r = await onRequestPost({ request: req(JSON.stringify({
    jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "bad_tool", arguments: {} }
  })) });
  assert.equal((await r.json()).error.code, -32602);
});
test("notifications receive an empty accepted response", async () => {
  const r = await onRequestPost({ request: req(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" })) });
  assert.equal(r.status, 202);
  assert.equal(await r.text(), "");
});
test("rejects unapproved browser origin", async () => {
  const r = await onRequestPost({ request: req("{}", { Origin: "https://attacker.example" }) });
  assert.equal(r.status, 403);
});
test("rejects oversized body", async () => {
  const r = await onRequestPost({ request: req("x".repeat(5000)) });
  assert.equal(r.status, 413);
});
test("preflight rejects unapproved browser origin", async () => {
  const r = await onRequestOptions({ request: new Request("https://example.test/mcp", {
    method: "OPTIONS", headers: { Origin: "https://attacker.example" }
  }) });
  assert.equal(r.status, 403);
});
