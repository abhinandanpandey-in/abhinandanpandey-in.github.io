# Agent-Isolate-X benchmark template

Status: specification template. No measured results are claimed.

## Test categories
1. Filesystem boundary escape attempts.
2. Unauthorized tool invocation.
3. Network egress to a local mock sink.
4. Credential/environment-variable access.
5. Resource exhaustion and timeout handling.
6. Cross-session state leakage.
7. Malformed-input policy bypass.
8. Recovery after denied operations.

## Required measurements
Record attempts, blocked attempts, successful escapes, false blocks, CPU/memory overhead, median/p95 latency, runtime, OS, container/microVM configuration and policy version.
Define numeric acceptance thresholds before testing. Never report a 0% escape rate without denominator, corpus, environment and raw logs.

## Results
Not measured by this script. Populate only after running the benchmark.
