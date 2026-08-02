# Security Policy

## About This Repository

This repository hosts my personal portfolio site (`abhinandanpandey-in.github.io`) — a static site with a small amount of client-side JavaScript (a DOM-based site assistant, an interactive terminal, and a couple of third-party integrations for feedback and analytics). There is no backend server and no database.

## Reporting a Vulnerability

If you find a security issue in this site or its code — XSS, exposed secrets, a logic flaw in the client-side scripts, or anything else — I'd genuinely appreciate a responsible disclosure rather than a public issue or social post.

**Preferred contact:**
- HackerOne: [hackerone.com/abhipndy](https://hackerone.com/abhipndy?type=user)
- Email: thisisabhinandanpandey@hotmail.com

Please include:
- A clear description of the issue and its potential impact
- Steps to reproduce (or a PoC, if applicable)
- Any suggested remediation, if you have one

## What to Expect

- I'll acknowledge your report within a reasonable timeframe (best effort — this is a personal project, not a funded product with an SLA).
- I'll keep you updated as I investigate and fix the issue.
- I'm happy to credit reporters who want acknowledgment, unless you'd prefer to stay anonymous.

## Scope Notes

- This site intentionally exposes some playful/interactive elements (a terminal easter egg, a chatbot) — these are client-side only and not connected to any privileged backend, so standard web app findings against them (e.g. "the sudo password is visible in page source") are expected behavior, not vulnerabilities, unless they demonstrate actual impact beyond the sandboxed demo itself.
- Third-party services used on this site (Formspree, CounterAPI, GitHub's public API) are out of scope — please report issues with those services directly to their respective maintainers.

## Why I Take This Seriously

As an independent LLM security researcher and bug bounty hunter, responsible disclosure isn't just a policy here — it's how I do my own work. I'd rather learn about an issue from you, privately, than have it become a public embarrassment. Thank you in advance for reporting responsibly.
