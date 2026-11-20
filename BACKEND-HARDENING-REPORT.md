# Backend-only hardening report

Backup: _backend_backup_20261120-205318

## Changed
- functions/mcp.js: strict JSON-RPC envelope validation, bounded streaming body read, content-type and content-length checks, notification handling, tool argument validation, restricted browser Origin, no-store and nosniff headers.
- functions/tests/mcp.test.mjs: Node built-in regression tests.

## Not changed
No frontend HTML, CSS, browser JavaScript, README, PDFs or visual assets were touched.

## Verify
Run: node --test functions/tests/mcp.test.mjs

## Limitations
The MCP tools expose public read-only portfolio data, so no authentication was added. CORS is not authentication. Rego policies remain reference files and are not evaluated by the Cloudflare handler. Run a deployed Cloudflare Pages smoke test before calling this production-verified.
