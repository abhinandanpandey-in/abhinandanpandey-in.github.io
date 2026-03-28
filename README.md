# abhinandanpandey-in.github.io

Personal portfolio of Abhinandan Pandey — LLM Security Researcher, Offensive AI Security specialist, and Bug Bounty Hunter. Built as a single-file static HTML site with no frameworks or dependencies.

---

## Overview

This repository contains the source for my personal security research portfolio. It documents my published research, vulnerability disclosures, security tooling, internship experience, certifications, and DSA work in one place.

The site is intentionally dependency-free — no React, no bundler, no build step. One HTML file, vanilla CSS, and vanilla JavaScript.

---

## Sections

| Section | Content |
|---|---|
| Research Papers | Two independent published papers on prompt injection and tool hijacking in agentic LLM systems |
| Experience | Security and development internships — CodeAlpha, CodeSpaze, CodSoft, GeeksforGeeks, C-DAC |
| Skills | LLM Security, Web App Security, Cloud Security, Network Security, ML, Full-Stack |
| Projects | 30+ offensive security tools, exploit labs, and research toolkits |
| DSA | GeeksforGeeks stats — 1071 problems, 182-day streak, GfG 160 certified |
| Certifications | CRTOM, Microsoft/Coursera, C-DAC/IIT Roorkee, GeeksforGeeks, internship LORs |
| Vulnerability Disclosures | 35+ coordinated responsible disclosures across AI platforms, SaaS, and cloud providers |
| Contact | LinkedIn, GitHub, GeeksforGeeks, Email |

---

## Research

**Prompt Injection and Tool Hijacking in Agentic Large Language Model Systems**
Attack taxonomy, empirical evaluation across four injection vectors, and two-layer semantic guardrail design. Open-source fuzzing toolkit released alongside the paper.

**Prompt Injection and Tool Hijacking in Agentic LLMs — Empirical Security Analysis**
Formal empirical analysis establishing that system prompts are not a security boundary. Introduces the LLM Agent RedTeam Toolkit with automated fuzzing against tool-bound agentic workflows.

Toolkits:
- [LLM-Agent-RedTeam-Toolkit](https://github.com/abhinandanpandey-in/LLM-Agent-RedTeam-Toolkit)
- [llm-redteam-toolkit](https://github.com/abhinandanpandey-in/llm-redteam-toolkit)
- [Agent-Deception-Fuzzer](https://github.com/abhinandanpandey-in/Agent-Deception-Fuzzer)

---

## Tech Stack

| Layer | Detail |
|---|---|
| Structure | HTML5, semantic markup |
| Styling | Vanilla CSS, CSS custom properties, grid layout |
| Fonts | Space Mono, Syne — loaded via Google Fonts |
| JavaScript | Vanilla JS — custom cursor, project filter, scroll behavior |
| Deployment | Static file — no build process required |

---

## Local Usage

No installation required.

```bash
git clone https://github.com/abhinandanpandey-in/abhinandanpandey-in.github.io
cd abhinandanpandey-in.github.io
# Open portfolio.html in any browser
```

Or deploy directly to GitHub Pages — the repo root serves the file automatically.

---

## Adding Video Demos

Each project card has a `data-video` attribute on the `▶ Video` span. Set it to any URL to activate the button:

```html
<span class="vid-link" data-video="https://youtube.com/watch?v=YOUR_ID" ...>▶ Video</span>
```

When `data-video` is empty the button renders dimmed. When a URL is present it renders at full opacity and opens in a new tab on click.

---

## Vulnerability Disclosure Policy

All vulnerabilities documented in this portfolio were disclosed through coordinated responsible disclosure. No exploitation of production systems for unauthorized access. Research conducted in controlled lab environments or via official bug bounty programs.

---

## Contact

- LinkedIn: [abhinandanpandey-in](https://www.linkedin.com/in/abhinandanpandey-in)
- GitHub: [abhinandanpandey-in](https://github.com/abhinandanpandey-in)
- GeeksforGeeks: [abhinandanpandeysince2006](https://www.geeksforgeeks.org/profile/abhinandanpandeysince2006)

---

## License

This portfolio and its design are not licensed for reuse. The security research toolkits linked from this site carry their own licenses — see individual repositories.
