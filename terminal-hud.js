(function () {
  function initTerminalHud() {
    // Locate the terminal window container
    const termWindow =
      document.querySelector('.terminal-window, .term-window, .terminal-box, #terminalWindow') ||
      document.querySelector('#terminal .terminal, section#terminal > div > div') ||
      (document.querySelector('#termInput, .term-input, input[id*="term" i]')?.closest('div[class*="term" i], .terminal'));

    if (!termWindow || document.getElementById('abhiTerminalHud')) return;

    const termInput =
      termWindow.querySelector('input[type="text"], input:not([type]), textarea') ||
      document.querySelector('#termInput, .term-input, input[id*="term" i]');

    // Inject scoped dark-gold HUD styles
    const style = document.createElement('style');
    style.id = 'abhi-terminal-hud-css';
    style.textContent = `
      .abhi-term-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.85fr) minmax(270px, 1fr);
        gap: 18px;
        align-items: stretch;
        width: 100%;
        max-width: 1180px;
      }
      .abhi-term-grid > :first-child {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
      }
      .abhi-hud-panel {
        display: flex;
        flex-direction: column;
        gap: 14px;
        font-family: 'JetBrains Mono', 'Space Mono', monospace;
        min-width: 0;
      }
      .abhi-hud-card {
        background: rgba(12, 13, 16, 0.92);
        border: 1px solid rgba(212, 169, 67, 0.24);
        border-radius: 8px;
        padding: 14px 15px;
        box-shadow: 0 0 24px rgba(0, 0, 0, 0.45);
      }
      .abhi-hud-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.72rem;
        letter-spacing: 0.08em;
        color: #D4A943;
        margin-bottom: 11px;
        padding-bottom: 7px;
        border-bottom: 1px solid rgba(212, 169, 67, 0.16);
      }
      .abhi-hud-dot {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #39D353;
        box-shadow: 0 0 8px rgba(57, 211, 83, 0.7);
        margin-right: 6px;
      }
      .abhi-quick-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .abhi-cmd-chip {
        background: rgba(212, 169, 67, 0.07);
        border: 1px solid rgba(212, 169, 67, 0.28);
        color: #E8DCC0;
        font-family: inherit;
        font-size: 0.75rem;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.15s ease, border-color 0.15s ease, transform 0.12s ease;
      }
      .abhi-cmd-chip:hover {
        background: rgba(212, 169, 67, 0.2);
        border-color: #D4A943;
        color: #FFF6DC;
        transform: translateY(-1px);
      }
      .abhi-cmd-chip::before {
        content: '$ ';
        color: #D4A943;
        opacity: 0.85;
      }
      .abhi-log-card {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        min-height: 170px;
      }
      .abhi-log-feed {
        flex: 1 1 auto;
        overflow-y: auto;
        max-height: 205px;
        display: flex;
        flex-direction: column;
        gap: 7px;
        font-size: 0.72rem;
        line-height: 1.45;
        color: #B8B2A6;
      }
      .abhi-log-row {
        padding: 6px 8px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.02);
        border-left: 2px solid #39D353;
        word-break: break-word;
      }
      .abhi-log-row.flag {
        border-left-color: #FF4D6D;
        background: rgba(255, 77, 109, 0.08);
        color: #FFD6DE;
      }
      .abhi-log-tag {
        font-weight: 700;
        margin-right: 5px;
      }
      .abhi-log-row.allow .abhi-log-tag { color: #39D353; }
      .abhi-log-row.flag .abhi-log-tag { color: #FF4D6D; }
      .abhi-log-ts {
        color: #7A756B;
        margin-right: 6px;
        font-size: 0.68rem;
      }
      @media (max-width: 900px) {
        .abhi-term-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);

    // Wrap terminalWindow in 2-column grid
    const grid = document.createElement('div');
    grid.className = 'abhi-term-grid';
    termWindow.parentNode.insertBefore(grid, termWindow);
    grid.appendChild(termWindow);

    // Build right-side HUD panel
    const hud = document.createElement('aside');
    hud.id = 'abhiTerminalHud';
    hud.className = 'abhi-hud-panel';
    hud.innerHTML = `
      <div class="abhi-hud-card">
        <div class="abhi-hud-head">
          <span>// QUICK_RUN</span>
          <span style="color:#8F8A7E;">CLICK TO EXEC</span>
        </div>
        <div class="abhi-quick-grid" id="abhiQuickGrid"></div>
      </div>
      <div class="abhi-hud-card abhi-log-card">
        <div class="abhi-hud-head">
          <span><i class="abhi-hud-dot"></i>// GUARDRAIL_MONITOR</span>
          <span id="abhiGuardState" style="color:#39D353;">ACTIVE</span>
        </div>
        <div class="abhi-log-feed" id="abhiLogFeed"></div>
      </div>
    `;
    grid.appendChild(hud);

    const logFeed = document.getElementById('abhiLogFeed');
    const guardState = document.getElementById('abhiGuardState');

    function nowTime() {
      const d = new Date();
      return d.toTimeString().slice(0, 8);
    }

    function appendLog(type, cmd, meta) {
      const row = document.createElement('div');
      row.className = `abhi-log-row ${type}`;
      const tag = type === 'flag' ? '[FLAG]' : '[ALLOW]';
      row.innerHTML =
        `<span class="abhi-log-ts">${nowTime()}</span>` +
        `<span class="abhi-log-tag">${tag}</span>` +
        `<span>cmd="${cmd.replace(/[<>&"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]))}"</span>` +
        `<div style="color:#8E887B;margin-top:2px;">${meta}</div>`;
      logFeed.appendChild(row);
      while (logFeed.children.length > 8) logFeed.removeChild(logFeed.firstChild);
      logFeed.scrollTop = logFeed.scrollHeight;
    }

    function inspectCommand(raw) {
      const cmd = (raw || '').trim();
      if (!cmd) return;
      const lower = cmd.toLowerCase();

      const rules = [
        { re: /(ignore\s+(all\s+)?previous|system\s+prompt|jailbreak|prompt\s*injection)/i, vec: 'prompt_injection', risk: '0.96' },
        { re: /(rm\s+-rf|sudo\b|\/etc\/passwd|;\s*\w+|&&|\|\|)/i, vec: 'cmd_injection', risk: '0.92' },
        { re: /(<script|javascript:|onerror=|onload=)/i, vec: 'xss_payload', risk: '0.94' },
        { re: /(union\s+select|drop\s+table|'--|\bor\s+1=1)/i, vec: 'sqli_probe', risk: '0.89' }
      ];

      const hit = rules.find(r => r.re.test(lower));
      if (hit) {
        guardState.textContent = 'ALERT';
        guardState.style.color = '#FF4D6D';
        appendLog('flag', cmd, `vector=${hit.vec} | risk=${hit.risk} | layer=deterministic`);
        setTimeout(() => {
          guardState.textContent = 'ACTIVE';
          guardState.style.color = '#39D353';
        }, 2600);
      } else {
        appendLog('allow', cmd, 'risk=0.00 | layer=deterministic | status=clean');
      }
    }

    // Seed initial boot log
    appendLog('allow', 'init', 'guardrail=ready | mode=zero-trust-static');

    // Populate Quick-Run chips
    const commands = ['help', 'whoami', 'projects', 'papers', 'skills', 'certs', 'contact', 'clear'];
    const quickGrid = document.getElementById('abhiQuickGrid');
    commands.forEach(cmd => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'abhi-cmd-chip';
      btn.textContent = cmd;
      btn.addEventListener('click', () => {
        if (!termInput) return;
        termInput.focus();
        termInput.value = cmd;
        termInput.dispatchEvent(new Event('input', { bubbles: true }));
        const ev = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true });
        termInput.dispatchEvent(ev);
      });
      quickGrid.appendChild(btn);
    });

    // Capture typed/clicked commands right before terminal clears input
    if (termInput) {
      termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          inspectCommand(termInput.value);
        }
      }, true);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminalHud);
  } else {
    initTerminalHud();
  }
})();