export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const accept = request.headers.get("Accept") || "";
  const isPagesDev = url.hostname.endsWith(".pages.dev");

  const withCommonHeaders = (res) => {
    const out = new Response(res.body, res);
    out.headers.append("Link", '</.well-known/api-catalog>; rel="api-catalog"');
    out.headers.append("Link", '</.well-known/ai-catalog.json>; rel="ai-catalog"');
    out.headers.append("Link", '</.well-known/agent-skills/index.json>; rel="describedby"');
    out.headers.set("X-Content-Type-Options", "nosniff");
    out.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    out.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    out.headers.set("X-Frame-Options", "DENY");
    out.headers.set("TDM-Reservation", "1");
    out.headers.set("X-RL-Environment-Policy", "sandboxed; ai-train=no; reward-oracle=suppressed");
    out.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(self), payment=(), usb=()");
    out.headers.set("Cross-Origin-Opener-Policy", "same-origin");
    out.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://formsubmit.co https://formspree.io https://api.github.com https://api.counterapi.dev; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
    );
    if (isPagesDev) {
      out.headers.set("X-Robots-Tag", "noindex, follow");
    }
    return out;
  };

  // 1. Markdown Negotiation (Level 3 gate)
  if ((url.pathname === "/" || url.pathname === "/index.html") && accept.includes("text/markdown")) {
    const mdRes = await env.ASSETS.fetch(new URL("/index.md", url.origin));
    if (mdRes.ok) {
      const headers = new Headers(mdRes.headers);
      headers.set("Content-Type", "text/markdown; charset=utf-8");
      headers.set("Vary", "Accept");
      return withCommonHeaders(new Response(mdRes.body, { status: 200, headers }));
    }
  }

  // 2. API Catalog (RFC 9727)
  if (url.pathname === "/.well-known/api-catalog") {
    const catalog = {
      linkset: [
        {
          anchor: `${url.origin}/mcp`,
          "service-doc": [
            {
              href: `${url.origin}/.well-known/agent-skills/portfolio-research/SKILL.md`,
              type: "text/markdown"
            }
          ]
        }
      ]
    };
    return withCommonHeaders(
      new Response(JSON.stringify(catalog, null, 2), {
        headers: {
          "Content-Type": "application/linkset+json; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
    );
  }

  // 3. Dynamic Poppy domain binding so pages.dev passes domain verification
  if (url.pathname === "/.well-known/poppy.json") {
    const poppy = {
      protocol_version: "0.1",
      organization: {
        name: "Abhinandan Pandey",
        domain: url.hostname
      },
      web: {}
    };
    return withCommonHeaders(
      new Response(JSON.stringify(poppy, null, 2), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
    );
  }

  // 4. MCP Server Card (SEP-1649)
  if (url.pathname === "/.well-known/mcp/server-card.json") {
    const card = {
      serverInfo: {
        name: "abhinandan-pandey-portfolio",
        version: "1.0.0"
      },
      transport: {
        type: "streamable-http",
        endpoint: `${url.origin}/mcp`
      },
      capabilities: {
        tools: {}
      }
    };
    return withCommonHeaders(
      new Response(JSON.stringify(card, null, 2), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
    );
  }

  const response = await next();
  return withCommonHeaders(response);
}
