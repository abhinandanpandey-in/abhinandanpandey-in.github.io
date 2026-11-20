# Copyright (c) 2026 Abhinandan Pandey. All Rights Reserved.
# Deterministic OPA policy enforcing privilege separation on the /mcp edge endpoint.

package portfolio.mcp.guardrail

import rego.v1

default allow := false

allowed_methods := {
    "initialize",
    "tools/list",
    "tools/call",
    "ping",
}

allowed_tools := {
    "get_profile",
    "list_publications",
    "list_security_projects",
}

max_payload_bytes := 4096

valid_content_type if {
    startswith(lower(input.headers["content-type"]), "application/json")
}

valid_payload_size if {
    input.content_length <= max_payload_bytes
}

valid_jsonrpc if {
    input.body.jsonrpc == "2.0"
    input.body.method in allowed_methods
}

allow if {
    input.http_method == "POST"
    valid_content_type
    valid_payload_size
    valid_jsonrpc
    input.body.method != "tools/call"
}

allow if {
    input.http_method == "POST"
    valid_content_type
    valid_payload_size
    valid_jsonrpc
    input.body.method == "tools/call"
    input.body.params.name in allowed_tools
}

deny_reason contains "unsupported_media_type" if {
    not valid_content_type
}

deny_reason contains "payload_too_large" if {
    not valid_payload_size
}

deny_reason contains "unauthorized_mcp_method" if {
    not input.body.method in allowed_methods
}

deny_reason contains "unauthorized_tool_invocation" if {
    input.body.method == "tools/call"
    not input.body.params.name in allowed_tools
}
