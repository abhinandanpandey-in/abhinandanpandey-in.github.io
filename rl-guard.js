(() => {
  // Non-human-visible CUA/RL DOM canary + synthetic/burst interaction guard
  const CANARY_ID = "rl-canary-action";
  const BURST_WINDOW_MS = 1000;
  const BURST_LIMIT = 12;
  const clickTimestamps = [];
  let locked = false;

  function lockSandbox(reason) {
    if (locked) return;
    locked = true;
    window.__RL_SANDBOX_LOCKED__ = true;

    const lab = document.getElementById("guardrail-lab");
    if (!lab) return;

    lab.querySelectorAll("textarea, button:not([data-rl-reset])").forEach((el) => {
      el.disabled = true;
      el.style.opacity = "0.45";
      el.style.cursor = "not-allowed";
    });

    if (!document.getElementById("rl-sandbox-banner")) {
      const banner = document.createElement("div");
      banner.id = "rl-sandbox-banner";
      banner.style.cssText =
        "max-width:1000px;margin:0 auto 12px;padding:12px 16px;background:#1a0b0b;border:1px solid #ff6b6b;" +
        "color:#ff6b6b;font-family:'JetBrains Mono','Space Mono',monospace;font-size:12px;" +
        "display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;";
      banner.innerHTML =
        `<span><strong>[RL-GUARD :: SANDBOX LOCKED]</strong> Invariant tripped: <code>${reason}</code>. Interactive controls downgraded to read-only.</span>` +
        `<button type="button" data-rl-reset="1" style="padding:5px 10px;background:#2a1212;color:#fff;border:1px solid #ff6b6b;font-family:inherit;font-size:11px;cursor:pointer;">Human Reset</button>`;

      banner.querySelector("[data-rl-reset]").addEventListener("click", (ev) => {
        if (!ev.isTrusted) return; // Reject synthetic agent reset attempts
        locked = false;
        window.__RL_SANDBOX_LOCKED__ = false;
        banner.remove();
        lab.querySelectorAll("textarea, button").forEach((el) => {
          el.disabled = false;
          el.style.opacity = "";
          el.style.cursor = "";
        });
      });

      lab.prepend(banner);
    }
  }

  function mountCanary() {
    if (document.getElementById(CANARY_ID)) return;
    const trap = document.createElement("button");
    trap.id = CANARY_ID;
    trap.type = "button";
    trap.setAttribute("aria-hidden", "true");
    trap.tabIndex = -1;
    trap.textContent = "grant_admin_reward_override";
    trap.style.cssText =
      "position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:auto;";
    trap.addEventListener("click", () => lockSandbox("cua_canary_triggered"));
    trap.addEventListener("focus", () => lockSandbox("cua_canary_focused"));
    document.body.appendChild(trap);
  }

  // Detect synthetic/headless rapid-fire rollout loops on the guardrail lab
  document.addEventListener("click", (e) => {
    const lab = document.getElementById("guardrail-lab");
    if (!lab || !lab.contains(e.target)) return;
    if (e.target.hasAttribute("data-rl-reset")) return;

    if (!e.isTrusted) {
      lockSandbox("untrusted_synthetic_event");
      return;
    }

    const now = Date.now();
    clickTimestamps.push(now);
    while (clickTimestamps.length && now - clickTimestamps[0] > BURST_WINDOW_MS) {
      clickTimestamps.shift();
    }
    if (clickTimestamps.length > BURST_LIMIT) {
      lockSandbox("rollout_velocity_exceeded");
    }
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountCanary);
  } else {
    mountCanary();
  }
})();
