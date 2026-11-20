# abhinandanpandey-in.github.io

Personal portfolio of Abhinandan Pandey — LLM Security Researcher, Offensive AI Security specialist, and Bug Bounty Hunter. Built as a static HTML/CSS/JavaScript portfolio with no frontend framework or build step. The repository also contains optional Cloudflare Pages Functions and external integrations.

---

## Overview

This repository contains the source for my personal security research portfolio. It documents my published research, vulnerability disclosures, security tooling, internship experience, certifications, and DSA work in one place.

The site uses vanilla HTML, CSS and JavaScript with no React, bundler or build step. It is multi-file and includes external integrations; Cloudflare Pages Functions execute only on Cloudflare Pages, not GitHub Pages.

---

## Sections

| Section | Content |
|---|---|
| Research Papers | Two related papers sharing an experimental foundation; review their methods and limitations before treating them as independent studies |
| Experience | Security and development internships — CodeAlpha, CodeSpaze, CodSoft, GeeksforGeeks, C-DAC |
| Skills | LLM Security, Web App Security, Cloud Security, Network Security, ML, Full-Stack |
| Projects | 35 featured project cards in the current homepage archive; additional repositories/labs should be counted separately and linked |
| DSA | GeeksforGeeks stats — 1071 problems, 182-day streak, GfG 160 certified |
| Certifications | CRTOM, Microsoft/Coursera, C-DAC/IIT Roorkee, GeeksforGeeks, internship LORs |
| Vulnerability Disclosures | 35+ coordinated responsible disclosures across AI platforms, SaaS, and cloud providers |
| Contact | LinkedIn, GitHub, GeeksforGeeks, Email |
| Site Assistant | Client-side chatbot that answers visitor questions using content scraped live from the page DOM — no external AI API, no key exposure |

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

## Site Assistant & Feedback

The floating chat widget (bottom-right) answers visitor questions about the portfolio by reading the live DOM at page load — skills, experience, projects, certifications, research papers, DSA stats, and contact links. No external LLM API is called, so there's no key to expose and no per-message cost. Answers stay in sync automatically whenever the page content is edited.

When a visitor closes the chat after using it, a small feedback popup appears once per session asking for a quick reaction (emoji rating + optional note). Submissions are sent via a [Formspree](https://formspree.io) endpoint straight to email — no database, no backend required.

---

## Tech Stack

| Layer | Detail |
|---|---|
| Structure | HTML5, semantic markup |
| Styling | Vanilla CSS, CSS custom properties, grid layout |
| Fonts | Space Mono, Syne — loaded via Google Fonts |
| JavaScript | Vanilla JS — custom cursor, project filter, scroll behavior, DOM-driven site chatbot, post-interaction feedback widget |
| Feedback | Formspree (external form endpoint) — visitor feedback from the chatbot popup delivered by email, no custom backend |
| Deployment | Static file — no build process required |

---

## Local Usage

No installation required.

```bash
git clone https://github.com/abhinandanpandey-in/abhinandanpandey-in.github.io
cd abhinandanpandey-in.github.io
# Open index.html in any browser
```

GitHub Pages can serve static index.html. The functions/ directory is Cloudflare Pages-specific and will not execute on GitHub Pages. Deploy to Cloudflare Pages if you need those functions.

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

**Copyright © 2026 Abhinandan Pandey. All Rights Reserved.**

No part of this repository—including source code, UI design, assets, or agentic manifests—may be copied, modified, distributed, or deployed without prior explicit written permission. See [LICENSE](./LICENSE) for full terms.

*The open-source security research toolkits linked from this portfolio carry their own individual licenses—refer to each respective repository.*


## Research reproducibility and evaluation status

The current archive does not include the original experiment runner, raw model transcripts, or complete result dataset for the prompt-injection papers. The research/reproducibility directory provides corrected payload fixtures, an evaluation format, and benchmark templates. These are scaffolds, not completed cross-model results. Do not claim measured false-positive/false-negative rates or cross-model performance until actual runs are recorded.

The browser guardrail page contains a YARA-inspired JavaScript signature matcher and a Rego-derived JavaScript policy simulator. These demonstrations do not execute native YARA or OPA runtimes, and the Rego file is not enforced by the current /mcp endpoint.
