/* ==========================================================================
   ABHI — EMO-Inspired Interactive Black & Gold Robot Companion
   Zero dependencies | Pure SVG + CSS + Vanilla JS | CSP-Safe
   ========================================================================== */
(function () {
  if (window.__ABHI_EMO_INIT__) return;
  window.__ABHI_EMO_INIT__ = true;

  const REDUCED_MOTION = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    const toggle = document.getElementById('chatToggle');
    const panel = document.getElementById('chatPanel');
    const body = document.getElementById('chatBody');
    const input = document.getElementById('chatInput');
    if (!toggle || !panel) return;

    injectStyles();
    const dom = mountRobot(toggle);
    const engine = createEmoEngine(dom, { toggle, panel, body, input });
    wireVoiceControls(panel, body, input, engine);
    window.AbhiEmo = engine;
  }

  /* ---------------------- 1. STYLES (BLACK & GOLD) ---------------------- */
  function injectStyles() {
    if (document.getElementById('abhiEmoStyles')) return;
    const style = document.createElement('style');
    style.id = 'abhiEmoStyles';
    style.textContent = `
      /* Override circular toggle shell cleanly to host the full miniature robot */
      #chatToggle.emo-host {
        width: 92px !important;
        height: 112px !important;
        padding: 0 !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        overflow: visible !important;
        display: flex !important;
        align-items: flex-end !important;
        justify-content: center !important;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      #chatToggle.emo-host::before,
      #chatToggle.emo-host::after {
        display: none !important;
      }

      .emo-stage {
        position: relative;
        width: 90px;
        height: 110px;
        user-select: none;
        transform-origin: center bottom;
        transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), filter 0.35s ease;
        filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.72)) drop-shadow(0 0 12px rgba(212, 169, 67, 0.18));
      }
      #chatToggle.emo-host:hover .emo-stage {
        transform: translateY(-3px) scale(1.03);
        filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 18px rgba(242, 204, 112, 0.32));
      }
      #chatToggle.emo-host.open .emo-stage {
        transform: translateY(-2px) scale(1.02);
      }

      .emo-svg {
        width: 100%;
        height: 100%;
        overflow: visible;
        display: block;
      }

      /* Head-pat sensor zone on top of head */
      .emo-pat-zone {
        position: absolute;
        top: 2px;
        left: 16px;
        width: 58px;
        height: 22px;
        z-index: 5;
        cursor: grab;
        border-radius: 14px 14px 4px 4px;
      }
      .emo-pat-zone:active { cursor: grabbing; }

      /* Subtle close indicator when chat is open */
      .emo-open-badge {
        position: absolute;
        top: 6px;
        right: -2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #050505;
        border: 1px solid #D4A943;
        color: #F2CC70;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        opacity: 0;
        transform: scale(0.6);
        pointer-events: none;
        transition: opacity 0.25s ease, transform 0.25s ease;
        box-shadow: 0 0 8px rgba(212, 169, 67, 0.45);
      }
      #chatToggle.emo-host.open .emo-open-badge {
        opacity: 1;
        transform: scale(1);
      }

      /* Floating status particles (Zzz, hearts, sparkles) */
      .emo-fx {
        position: absolute;
        top: -10px;
        left: 0;
        width: 100%;
        height: 30px;
        pointer-events: none;
        overflow: visible;
      }
      .emo-particle {
        position: absolute;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-weight: 700;
        color: #F2CC70;
        text-shadow: 0 0 8px rgba(242, 204, 112, 0.85);
        font-size: 12px;
        opacity: 0;
        animation: emoFloatUp 1.5s ease-out forwards;
      }
      @keyframes emoFloatUp {
        0% { opacity: 0; transform: translate(0, 8px) scale(0.7); }
        20% { opacity: 1; }
        100% { opacity: 0; transform: translate(var(--dx, 6px), -26px) scale(1.15); }
      }

      /* SVG Articulated Parts */
      .emo-body-group {
        transform-origin: 60px 115px;
        transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .emo-head-group {
        transform-origin: 60px 76px;
        transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .emo-arm-l {
        transform-origin: 31px 88px;
        transition: transform 0.35s ease;
      }
      .emo-arm-r {
        transform-origin: 89px 88px;
        transition: transform 0.35s ease;
      }
      .emo-eye-group {
        transition: transform 0.16s ease-out;
      }
      .emo-eye-shape {
        fill: #F2CC70;
        transition: d 0.22s ease, opacity 0.2s ease, transform 0.22s ease, fill 0.25s ease;
        transform-box: fill-box;
        transform-origin: center;
      }
      .emo-lid {
        fill: #050505;
        transition: transform 0.14s ease;
        transform-box: fill-box;
        transform-origin: top center;
        transform: scaleY(0);
      }
      .emo-brow {
        stroke: #F2CC70;
        stroke-width: 2.5;
        stroke-linecap: round;
        opacity: 0;
        transition: opacity 0.22s ease, transform 0.22s ease;
        transform-box: fill-box;
        transform-origin: center;
      }
      .emo-mouth-group {
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      .emo-special-layer {
        opacity: 0;
        transition: opacity 0.22s ease, transform 0.25s ease;
        transform-box: fill-box;
        transform-origin: center;
      }
      .emo-core-led {
        fill: #D4A943;
        transition: fill 0.25s ease, opacity 0.25s ease;
      }

      /* ---------------- IDLE BREATHING ---------------- */
      .emo-stage.state-idle .emo-body-group,
      .emo-stage.state-curious .emo-body-group,
      .emo-stage.state-listening .emo-body-group {
        animation: emoBreathe 3.4s ease-in-out infinite;
      }
      @keyframes emoBreathe {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-2.2px); }
      }

      /* Blinking */
      .emo-stage.is-blinking .emo-lid {
        transform: scaleY(1.05);
      }

      /* ---------------- STATE ANIMATIONS ---------------- */
      /* Curious */
      .emo-stage.state-curious .emo-head-group { transform: rotate(-9deg) translateY(-1px); }
      .emo-stage.state-curious .emo-eye-r { transform: scale(1.16); }
      .emo-stage.state-curious .emo-eye-l { transform: scale(0.88); }
      .emo-stage.state-curious .emo-arm-r { transform: rotate(-18deg); }

      /* Happy */
      .emo-stage.state-happy .emo-head-group { transform: translateY(-2px); }
      .emo-stage.state-happy .emo-arm-l { transform: rotate(22deg); }
      .emo-stage.state-happy .emo-arm-r { transform: rotate(-22deg); }
      .emo-stage.state-happy .emo-eyes-normal { opacity: 0; }
      .emo-stage.state-happy .emo-layer-happy { opacity: 1; }
      .emo-stage.state-happy .emo-core-led { fill: #F2CC70; }

      /* Laughing */
      .emo-stage.state-laughing .emo-head-group { animation: emoLaugh 0.28s ease-in-out infinite; }
      .emo-stage.state-laughing .emo-arm-l { transform: rotate(35deg); }
      .emo-stage.state-laughing .emo-arm-r { transform: rotate(-35deg); }
      .emo-stage.state-laughing .emo-eyes-normal { opacity: 0; }
      .emo-stage.state-laughing .emo-layer-happy { opacity: 1; }
      @keyframes emoLaugh {
        0%, 100% { transform: translateY(0) rotate(-3deg); }
        50% { transform: translateY(-4px) rotate(3deg); }
      }

      /* Love / Hearts */
      .emo-stage.state-love .emo-head-group { transform: rotate(6deg) translateY(-2px); }
      .emo-stage.state-love .emo-arm-l { transform: rotate(28deg); }
      .emo-stage.state-love .emo-arm-r { transform: rotate(-28deg); }
      .emo-stage.state-love .emo-eyes-normal { opacity: 0; }
      .emo-stage.state-love .emo-layer-love { opacity: 1; animation: emoHeartPulse 0.7s ease-in-out infinite; }
      @keyframes emoHeartPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.16); }
      }

      /* Celebrate / Dancing */
      .emo-stage.state-celebrate .emo-body-group { animation: emoDance 0.42s ease-in-out infinite; }
      .emo-stage.state-celebrate .emo-arm-l { animation: emoWaveL 0.42s ease-in-out infinite; }
      .emo-stage.state-celebrate .emo-arm-r { animation: emoWaveR 0.42s ease-in-out infinite; }
      .emo-stage.state-celebrate .emo-eyes-normal { opacity: 0; }
      .emo-stage.state-celebrate .emo-layer-happy { opacity: 1; }
      @keyframes emoDance {
        0%, 100% { transform: translateY(0) rotate(-4deg); }
        50% { transform: translateY(-6px) rotate(4deg); }
      }
      @keyframes emoWaveL {
        0%, 100% { transform: rotate(15deg); }
        50% { transform: rotate(55deg); }
      }
      @keyframes emoWaveR {
        0%, 100% { transform: rotate(-15deg); }
        50% { transform: rotate(-55deg); }
      }

      /* Surprised */
      .emo-stage.state-surprised .emo-head-group { transform: translateY(-4px) scale(1.03); }
      .emo-stage.state-surprised .emo-eye-shape { transform: scale(1.22); }
      .emo-stage.state-surprised .emo-arm-l { transform: rotate(36deg); }
      .emo-stage.state-surprised .emo-arm-r { transform: rotate(-36deg); }

      /* Sad */
      .emo-stage.state-sad .emo-head-group { transform: translateY(4px) rotate(-5deg); }
      .emo-stage.state-sad .emo-lid { transform: scaleY(0.35); }
      .emo-stage.state-sad .emo-brow { opacity: 1; }
      .emo-stage.state-sad .emo-brow-l { transform: rotate(-18deg) translateY(-1px); }
      .emo-stage.state-sad .emo-brow-r { transform: rotate(18deg) translateY(-1px); }
      .emo-stage.state-sad .emo-arm-l { transform: rotate(-10deg); }
      .emo-stage.state-sad .emo-arm-r { transform: rotate(10deg); }

      /* Angry (playful pout) */
      .emo-stage.state-angry .emo-head-group { animation: emoShake 0.26s ease-in-out 2; }
      .emo-stage.state-angry .emo-brow { opacity: 1; }
      .emo-stage.state-angry .emo-brow-l { transform: rotate(22deg) translateY(3px); }
      .emo-stage.state-angry .emo-brow-r { transform: rotate(-22deg) translateY(3px); }
      .emo-stage.state-angry .emo-eye-shape { fill: #f59e0b; transform: scaleY(0.75); }
      .emo-stage.state-angry .emo-core-led { fill: #f59e0b; }
      @keyframes emoShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-3px); }
        75% { transform: translateX(3px); }
      }

      /* Sleepy */
      .emo-stage.state-sleepy .emo-head-group { transform: translateY(3px) rotate(4deg); }
      .emo-stage.state-sleepy .emo-lid { transform: scaleY(0.58); }

      /* Sleeping */
      .emo-stage.state-sleeping .emo-head-group { transform: translateY(6px) rotate(7deg); }
      .emo-stage.state-sleeping .emo-body-group { animation: emoSleepBreathe 4.2s ease-in-out infinite; }
      .emo-stage.state-sleeping .emo-eyes-normal { opacity: 0; }
      .emo-stage.state-sleeping .emo-layer-sleep { opacity: 1; }
      .emo-stage.state-sleeping .emo-core-led { opacity: 0.35; }
      @keyframes emoSleepBreathe {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(1.8px); }
      }

      /* Waking */
      .emo-stage.state-waking .emo-head-group { animation: emoWakeNod 0.55s ease-out; }
      @keyframes emoWakeNod {
        0% { transform: translateY(6px) rotate(7deg); }
        55% { transform: translateY(-4px) rotate(-3deg); }
        100% { transform: translateY(0) rotate(0); }
      }

      /* Listening */
      .emo-stage.state-listening .emo-head-group { transform: rotate(-6deg) translateY(-2px); }
      .emo-stage.state-listening .emo-eye-shape { transform: scale(1.1); fill: #F2CC70; }
      .emo-stage.state-listening .emo-ear-ring { animation: emoPulseRing 0.9s ease-in-out infinite; }
      @keyframes emoPulseRing {
        0%, 100% { opacity: 0.45; }
        50% { opacity: 1; }
      }

      /* Thinking */
      .emo-stage.state-thinking .emo-head-group { transform: rotate(8deg) translateY(-1px); }
      .emo-stage.state-thinking .emo-eyes-normal { opacity: 0.35; }
      .emo-stage.state-thinking .emo-layer-think { opacity: 1; }
      .emo-stage.state-thinking .emo-think-dot-1 { animation: emoThinkDot 0.9s infinite 0s; }
      .emo-stage.state-thinking .emo-think-dot-2 { animation: emoThinkDot 0.9s infinite 0.18s; }
      .emo-stage.state-thinking .emo-think-dot-3 { animation: emoThinkDot 0.9s infinite 0.36s; }
      @keyframes emoThinkDot {
        0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
        40% { transform: translateY(-3px); opacity: 1; }
      }

      /* Speaking / Responding */
      .emo-stage.state-speaking .emo-head-group { animation: emoSpeakNod 0.6s ease-in-out infinite; }
      .emo-stage.state-speaking .emo-mouth-group { opacity: 1; }
      .emo-stage.state-speaking .emo-bar-1 { animation: emoBar 0.36s ease-in-out infinite 0s; transform-box: fill-box; transform-origin: center; }
      .emo-stage.state-speaking .emo-bar-2 { animation: emoBar 0.36s ease-in-out infinite 0.09s; transform-box: fill-box; transform-origin: center; }
      .emo-stage.state-speaking .emo-bar-3 { animation: emoBar 0.36s ease-in-out infinite 0.18s; transform-box: fill-box; transform-origin: center; }
      .emo-stage.state-speaking .emo-bar-4 { animation: emoBar 0.36s ease-in-out infinite 0.27s; transform-box: fill-box; transform-origin: center; }
      @keyframes emoBar {
        0%, 100% { transform: scaleY(0.35); }
        50% { transform: scaleY(1.35); }
      }
      @keyframes emoSpeakNod {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-2px); }
      }

      /* Error */
      .emo-stage.state-error .emo-head-group { animation: emoShake 0.28s ease-in-out 2; }
      .emo-stage.state-error .emo-eyes-normal { opacity: 0; }
      .emo-stage.state-error .emo-layer-error { opacity: 1; }

      /* Paused when tab hidden */
      .emo-stage.is-paused * { animation-play-state: paused !important; }

      /* Subtle voice controls inside chat header */
      #chatPanel {
        bottom: 132px !important;
      }
      @media (max-width: 640px) {
        #chatPanel {
          bottom: 108px !important;
        }
      }
      .emo-icon-btn {
        background: transparent;
        border: 1px solid rgba(212, 169, 67, 0.35);
        color: #D4A943;
        width: 30px;
        height: 30px;
        padding: 0;
        border-radius: 6px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
      }
      .emo-icon-btn:hover {
        background: rgba(212, 169, 67, 0.16);
        color: #F2CC70;
        border-color: #F2CC70;
      }
      .emo-icon-btn.active {
        background: rgba(242, 204, 112, 0.22);
        color: #F2CC70;
        border-color: #F2CC70;
        box-shadow: 0 0 8px rgba(242, 204, 112, 0.4);
      }
      .emo-icon-btn.recording {
        background: rgba(245, 158, 11, 0.24);
        color: #F2CC70;
        border-color: #F2CC70;
        animation: emoMicPulse 1s ease-in-out infinite;
      }
      @keyframes emoMicPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(242, 204, 112, 0.55); }
        50% { box-shadow: 0 0 0 6px rgba(242, 204, 112, 0); }
      }
      .emo-icon-btn svg {
        width: 15px;
        height: 15px;
        display: block;
      }
      .emo-close-btn {
        background: rgba(212, 169, 67, 0.14);
        border: 1px solid rgba(212, 169, 67, 0.55);
        color: #F2CC70;
        font-family: inherit;
        font-size: 0.85rem;
        line-height: 1;
        padding: 2px 7px;
        border-radius: 4px;
        cursor: pointer;
      }
      .emo-close-btn:hover {
        background: rgba(242, 204, 112, 0.28);
      }
      .emo-voice-bar {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-left: auto;
        margin-right: 6px;
      }
      .emo-vbtn {
        background: rgba(212, 169, 67, 0.1);
        border: 1px solid rgba(212, 169, 67, 0.38);
        color: #D4A943;
        font-family: inherit;
        font-size: 0.65rem;
        padding: 2px 6px;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.18s ease, color 0.18s ease;
      }
      .emo-vbtn:hover, .emo-vbtn.active {
        background: rgba(242, 204, 112, 0.24);
        color: #F2CC70;
        border-color: #F2CC70;
      }

      @media (max-width: 640px) {
        #chatToggle.emo-host {
          width: 72px !important;
          height: 88px !important;
        }
        .emo-stage {
          width: 72px;
          height: 88px;
        }
        .emo-pat-zone {
          left: 12px;
          width: 48px;
          height: 18px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .emo-stage, .emo-stage * {
          animation: none !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* ---------------------- 2. FULL ROBOT SVG MARKUP ---------------------- */
  function mountRobot(toggle) {
    toggle.classList.add('emo-host');
    toggle.setAttribute('aria-label', 'Toggle ABHI AI Companion');
    toggle.innerHTML = `
      <div class="emo-stage state-idle" id="abhiEmoStage">
        <div class="emo-pat-zone" title="Pat ABHI's head"></div>
        <div class="emo-fx" aria-hidden="true"></div>
        <div class="emo-open-badge" aria-hidden="true">×</div>
        <svg class="emo-svg" viewBox="0 0 120 142" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ABHI Robot Companion">
          <defs>
            <linearGradient id="emoShellGrad" x1="20" y1="14" x2="100" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#222227"/>
              <stop offset="45%" stop-color="#0E0E11"/>
              <stop offset="100%" stop-color="#050505"/>
            </linearGradient>
            <linearGradient id="emoGoldGrad" x1="15" y1="15" x2="105" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#F2CC70"/>
              <stop offset="50%" stop-color="#D4A943"/>
              <stop offset="100%" stop-color="#8B6925"/>
            </linearGradient>
            <linearGradient id="emoVisorGloss" x1="26" y1="24" x2="72" y2="62" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.16"/>
              <stop offset="45%" stop-color="#F2CC70" stop-opacity="0.04"/>
              <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
            </linearGradient>
            <filter id="emoLedGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.1" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <!-- Ground shadow -->
          <ellipse cx="60" cy="136" rx="30" ry="4.5" fill="rgba(0,0,0,0.65)"/>
          <ellipse cx="60" cy="136" rx="22" ry="2.2" fill="rgba(212,169,67,0.16)"/>

          <!-- Feet -->
          <g class="emo-feet">
            <rect x="36" y="121" width="18" height="11" rx="5.5" fill="url(#emoShellGrad)" stroke="#8B6925" stroke-width="1.4"/>
            <rect x="66" y="121" width="18" height="11" rx="5.5" fill="url(#emoShellGrad)" stroke="#8B6925" stroke-width="1.4"/>
            <rect x="40" y="127" width="10" height="2" rx="1" fill="#D4A943" opacity="0.75"/>
            <rect x="70" y="127" width="10" height="2" rx="1" fill="#D4A943" opacity="0.75"/>
          </g>

          <!-- Articulated Upper Body -->
          <g class="emo-body-group">
            <!-- Left & Right Arms -->
            <g class="emo-arm-l">
              <rect x="21" y="84" width="11" height="26" rx="5.5" fill="url(#emoShellGrad)" stroke="#8B6925" stroke-width="1.3"/>
              <circle cx="26.5" cy="91" r="2" fill="#D4A943"/>
            </g>
            <g class="emo-arm-r">
              <rect x="88" y="84" width="11" height="26" rx="5.5" fill="url(#emoShellGrad)" stroke="#8B6925" stroke-width="1.3"/>
              <circle cx="93.5" cy="91" r="2" fill="#D4A943"/>
            </g>

            <!-- Compact Torso -->
            <rect x="34" y="79" width="52" height="44" rx="14" fill="url(#emoShellGrad)" stroke="url(#emoGoldGrad)" stroke-width="1.6"/>
            <path d="M44 92 H76" stroke="#8B6925" stroke-width="1" opacity="0.5"/>
            <!-- Gold Chest Core LED -->
            <rect x="52" y="97" width="16" height="6" rx="3" fill="#050505" stroke="#8B6925" stroke-width="1"/>
            <rect class="emo-core-led" x="54.5" y="98.6" width="11" height="2.8" rx="1.4" filter="url(#emoLedGlow)"/>

            <!-- Neck joint -->
            <rect x="51" y="72" width="18" height="10" rx="3" fill="#111114" stroke="#8B6925" stroke-width="1"/>

            <!-- Articulated EMO Head -->
            <g class="emo-head-group">
              <!-- Top Headband / Headphones -->
              <path d="M22 44 C22 14, 98 14, 98 44" stroke="url(#emoGoldGrad)" stroke-width="4.2" stroke-linecap="round" fill="none"/>
              <!-- Earcups -->
              <rect x="13" y="34" width="10" height="24" rx="5" fill="url(#emoShellGrad)" stroke="url(#emoGoldGrad)" stroke-width="1.5"/>
              <rect class="emo-ear-ring" x="15.5" y="40" width="2.4" height="12" rx="1.2" fill="#F2CC70" filter="url(#emoLedGlow)"/>
              <rect x="97" y="34" width="10" height="24" rx="5" fill="url(#emoShellGrad)" stroke="url(#emoGoldGrad)" stroke-width="1.5"/>
              <rect class="emo-ear-ring" x="102.1" y="40" width="2.4" height="12" rx="1.2" fill="#F2CC70" filter="url(#emoLedGlow)"/>

              <!-- Metallic Head Shell -->
              <rect x="22" y="21" width="76" height="56" rx="16" fill="url(#emoShellGrad)" stroke="url(#emoGoldGrad)" stroke-width="2"/>

              <!-- Deep Black Visor Screen -->
              <rect x="28" y="27" width="64" height="44" rx="11" fill="#050505" stroke="#8B6925" stroke-width="1"/>
              <!-- Subtle Visor Glass Reflection -->
              <path d="M31 37 C36 29, 64 28, 86 30 L86 38 C64 36, 40 38, 31 44 Z" fill="url(#emoVisorGloss)"/>

              <!-- Dynamic Face Layer (tracks cursor) -->
              <g class="emo-eye-group" filter="url(#emoLedGlow)">
                <!-- Standard LED Eyes -->
                <g class="emo-eyes-normal">
                  <rect class="emo-eye-shape emo-eye-l" x="39" y="39" width="14" height="17" rx="5.5"/>
                  <rect class="emo-eye-shape emo-eye-r" x="67" y="39" width="14" height="17" rx="5.5"/>
                  <!-- Eyelids for blinking / sleepy / sad -->
                  <rect class="emo-lid" x="38" y="38" width="16" height="19" rx="4"/>
                  <rect class="emo-lid" x="66" y="38" width="16" height="19" rx="4"/>
                  <!-- Eyebrows for angry / sad -->
                  <line class="emo-brow emo-brow-l" x1="38" y1="36" x2="54" y2="36"/>
                  <line class="emo-brow emo-brow-r" x1="66" y1="36" x2="82" y2="36"/>
                </g>

                <!-- Happy / Laughing / Celebrate Arcs -->
                <g class="emo-special-layer emo-layer-happy">
                  <path d="M38 50 Q46 39 54 50" stroke="#F2CC70" stroke-width="3.6" stroke-linecap="round" fill="none"/>
                  <path d="M66 50 Q74 39 82 50" stroke="#F2CC70" stroke-width="3.6" stroke-linecap="round" fill="none"/>
                </g>

                <!-- Love Heart Eyes -->
                <g class="emo-special-layer emo-layer-love">
                  <path d="M46 54 C46 54 38 49 38 44 C38 41 40.5 39.5 43 41 C44.5 41.8 46 43.5 46 43.5 C46 43.5 47.5 41.8 49 41 C51.5 39.5 54 41 54 44 C54 49 46 54 46 54 Z" fill="#F2CC70"/>
                  <path d="M74 54 C74 54 66 49 66 44 C66 41 68.5 39.5 71 41 C72.5 41.8 74 43.5 74 43.5 C74 43.5 75.5 41.8 77 41 C79.5 39.5 82 41 82 44 C82 49 74 54 74 54 Z" fill="#F2CC70"/>
                </g>

                <!-- Sleeping Closed Eyes -->
                <g class="emo-special-layer emo-layer-sleep">
                  <path d="M39 49 Q46 53 53 49" stroke="#D4A943" stroke-width="2.6" stroke-linecap="round" fill="none"/>
                  <path d="M67 49 Q74 53 81 49" stroke="#D4A943" stroke-width="2.6" stroke-linecap="round" fill="none"/>
                </g>

                <!-- Thinking Dots -->
                <g class="emo-special-layer emo-layer-think">
                  <circle class="emo-think-dot-1" cx="48" cy="48" r="3" fill="#F2CC70"/>
                  <circle class="emo-think-dot-2" cx="60" cy="48" r="3" fill="#F2CC70"/>
                  <circle class="emo-think-dot-3" cx="72" cy="48" r="3" fill="#F2CC70"/>
                </g>

                <!-- Error X Eyes -->
                <g class="emo-special-layer emo-layer-error">
                  <path d="M40 41 L52 53 M52 41 L40 53" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
                  <path d="M68 41 L80 53 M80 41 L68 53" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
                </g>

                <!-- Speaking LED Equalizer Mouth -->
                <g class="emo-mouth-group">
                  <rect class="emo-bar-1" x="50" y="59" width="3" height="6" rx="1.5" fill="#F2CC70"/>
                  <rect class="emo-bar-2" x="56" y="57" width="3" height="10" rx="1.5" fill="#F2CC70"/>
                  <rect class="emo-bar-3" x="62" y="58" width="3" height="8" rx="1.5" fill="#F2CC70"/>
                  <rect class="emo-bar-4" x="68" y="59" width="3" height="6" rx="1.5" fill="#F2CC70"/>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    `;

    const stage = toggle.querySelector('#abhiEmoStage');
    return {
      stage,
      patZone: stage.querySelector('.emo-pat-zone'),
      fx: stage.querySelector('.emo-fx'),
      eyeGroup: stage.querySelector('.emo-eye-group')
    };
  }

  /* ---------------------- 3. STATE & AUTONOMY ENGINE ---------------------- */
  function createEmoEngine(dom, refs) {
    const ALL_STATES = [
      'idle', 'curious', 'happy', 'sad', 'angry', 'surprised', 'sleepy',
      'sleeping', 'waking', 'listening', 'thinking', 'speaking', 'laughing',
      'love', 'celebrate', 'error'
    ];
    let currentState = 'idle';
    let stateTimer = null;
    let blinkTimer = null;
    let idleActionTimer = null;
    let sleepTimer = null;
    let sleepFxTimer = null;
    let patCount = 0;
    let patResetTimer = null;
    let paused = false;

    // Eye tracking lerp state
    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    let rafId = null;

    function setState(next, durationMs) {
      if (!ALL_STATES.includes(next)) return;
      clearTimeout(stateTimer);
      ALL_STATES.forEach(s => dom.stage.classList.remove('state-' + s));
      dom.stage.classList.add('state-' + next);
      currentState = next;

      if (next === 'sleeping') {
        startSleepParticles();
      } else {
        stopSleepParticles();
      }

      if (durationMs && durationMs > 0) {
        stateTimer = setTimeout(() => {
          const isOpen = refs.panel.classList.contains('open');
          setState(isOpen ? 'curious' : 'idle');
        }, durationMs);
      }
    }

    function spawnParticle(symbol, xPct) {
      if (REDUCED_MOTION || paused) return;
      const el = document.createElement('span');
      el.className = 'emo-particle';
      el.textContent = symbol;
      el.style.left = (xPct != null ? xPct : (28 + Math.random() * 44)) + '%';
      el.style.setProperty('--dx', ((Math.random() - 0.5) * 18).toFixed(1) + 'px');
      dom.fx.appendChild(el);
      setTimeout(() => el.remove(), 1550);
    }

    function startSleepParticles() {
      stopSleepParticles();
      if (REDUCED_MOTION) return;
      sleepFxTimer = setInterval(() => {
        if (currentState === 'sleeping' && !paused) spawnParticle('z', 64);
      }, 1700);
    }
    function stopSleepParticles() {
      clearInterval(sleepFxTimer);
      sleepFxTimer = null;
    }

    function resetSleepClock() {
      clearTimeout(sleepTimer);
      if (REDUCED_MOTION) return;
      sleepTimer = setTimeout(() => {
        if (paused || refs.panel.classList.contains('open')) return;
        setState('sleepy');
        sleepTimer = setTimeout(() => {
          if (!paused && !refs.panel.classList.contains('open') && currentState === 'sleepy') {
            setState('sleeping');
          }
        }, 6000);
      }, 45000);
    }

    function wakeUp(nextState) {
      resetSleepClock();
      if (currentState === 'sleeping' || currentState === 'sleepy') {
        setState('waking', 650);
        spawnParticle('✦', 50);
        setTimeout(() => setState(nextState || 'happy', 1300), 650);
        return true;
      }
      return false;
    }

    // Natural randomized blinking
    function scheduleBlink() {
      clearTimeout(blinkTimer);
      if (REDUCED_MOTION) return;
      const delay = 2200 + Math.random() * 3600;
      blinkTimer = setTimeout(() => {
        if (!paused && (currentState === 'idle' || currentState === 'curious' || currentState === 'listening')) {
          dom.stage.classList.add('is-blinking');
          setTimeout(() => dom.stage.classList.remove('is-blinking'), 135);
        }
        scheduleBlink();
      }, delay);
    }

    // Autonomous subtle glances & personality expressions
    function scheduleAutonomy() {
      clearTimeout(idleActionTimer);
      if (REDUCED_MOTION) return;
      const delay = 5500 + Math.random() * 6500;
      idleActionTimer = setTimeout(() => {
        if (!paused && currentState === 'idle' && !refs.panel.classList.contains('open')) {
          const roll = Math.random();
          if (roll < 0.55) {
            // Glance left/right/up/down
            targetX = (Math.random() - 0.5) * 8;
            targetY = (Math.random() - 0.5) * 4.5;
            setTimeout(() => { targetX = 0; targetY = 0; }, 1600);
          } else if (roll < 0.78) {
            setState('curious', 1800);
          } else if (roll < 0.92) {
            setState('happy', 1500);
          } else {
            setState('surprised', 1100);
          }
        }
        scheduleAutonomy();
      }, delay);
    }

    // Smooth 60 FPS cursor eye-tracking loop
    function tickEyes() {
      if (!paused && !REDUCED_MOTION) {
        curX += (targetX - curX) * 0.14;
        curY += (targetY - curY) * 0.14;
        dom.eyeGroup.style.transform = `translate(${curX.toFixed(2)}px, ${curY.toFixed(2)}px)`;
      }
      rafId = requestAnimationFrame(tickEyes);
    }

    if (!REDUCED_MOTION) {
      let lastMove = 0;
      window.addEventListener('pointermove', (e) => {
        const now = performance.now();
        if (now - lastMove < 32 || paused) return;
        lastMove = now;
        if (currentState === 'sleeping') return;
        const rect = dom.stage.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height * 0.42;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < 420) {
          targetX = Math.max(-5.5, Math.min(5.5, dx / 42));
          targetY = Math.max(-3.5, Math.min(3.5, dy / 42));
        } else {
          targetX = 0;
          targetY = 0;
        }
      }, { passive: true });
    }

    // Hover curiosity
    refs.toggle.addEventListener('mouseenter', () => {
      resetSleepClock();
      if (currentState === 'idle') setState('curious');
    });
    refs.toggle.addEventListener('mouseleave', () => {
      if (currentState === 'curious' && !refs.panel.classList.contains('open')) {
        setState('idle');
      }
    });

    // Head-pat playful reactions (does NOT toggle chat panel)
    const PAT_REACTIONS = [
      { state: 'happy', fx: '✦' },
      { state: 'love', fx: '♥' },
      { state: 'laughing', fx: '✧' },
      { state: 'celebrate', fx: '★' },
      { state: 'surprised', fx: '!' },
      { state: 'angry', fx: '⚡' }
    ];
    dom.patZone.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      resetSleepClock();
      if (currentState === 'sleeping' || currentState === 'sleepy') {
        wakeUp('happy');
        return;
      }
      const pick = PAT_REACTIONS[patCount % PAT_REACTIONS.length];
      patCount++;
      clearTimeout(patResetTimer);
      patResetTimer = setTimeout(() => { patCount = 0; }, 5000);
      setState(pick.state, 1800);
      spawnParticle(pick.fx, 35);
      spawnParticle(pick.fx, 65);
    });

    // Click main robot body -> wake & sync with chat panel open/close
    refs.toggle.addEventListener('click', () => {
      resetSleepClock();
      setTimeout(() => {
        const isOpen = refs.panel.classList.contains('open');
        if (isOpen) {
          if (!wakeUp('happy')) {
            setState('happy', 1100);
            spawnParticle('✦', 50);
          }
        } else {
          setState('idle');
        }
      }, 20);
    });

    // React gently to page scrolling
    let scrollTimeout = null;
    window.addEventListener('scroll', () => {
      resetSleepClock();
      if (currentState === 'idle' && !refs.panel.classList.contains('open')) {
        targetY = 2.5;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => { targetY = 0; }, 450);
      }
    }, { passive: true });

    // Watch #chatInput for Listening state
    if (refs.input) {
      refs.input.addEventListener('focus', () => {
        resetSleepClock();
        if (currentState !== 'thinking' && currentState !== 'speaking') setState('listening');
      });
      refs.input.addEventListener('input', () => {
        resetSleepClock();
        if (refs.input.value.trim() && currentState !== 'thinking') setState('listening');
      });
      refs.input.addEventListener('blur', () => {
        if (currentState === 'listening') setState('idle');
      });
    }

    // Watch #chatBody mutations to sync Thinking / Speaking / Error states
    if (refs.body) {
      const obs = new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const node of m.addedNodes) {
            if (!(node instanceof HTMLElement)) continue;
            if (node.classList.contains('typing')) {
              setState('thinking');
            } else if (node.classList.contains('bot')) {
              const txt = (node.textContent || '').trim();
              if (/error|failed/i.test(txt)) {
                setState('error', 1800);
              } else if (/only have knowledge of what's published/i.test(txt)) {
                setState('curious', 2000);
              } else {
                // Speaking animation duration proportional to message length (capped)
                const ms = Math.min(3200, Math.max(1200, txt.length * 16));
                setState('speaking', ms);
              }
              if (window.__ABHI_TTS_ON__ && txt) {
                speakText(txt, engineApi);
              }
            }
          }
        }
      });
      obs.observe(refs.body, { childList: true });
    }

    // Pause CPU/GPU work when tab is hidden
    document.addEventListener('visibilitychange', () => {
      paused = document.hidden;
      dom.stage.classList.toggle('is-paused', paused);
      if (!paused) resetSleepClock();
    });

    const engineApi = { setState, wakeUp, spawnParticle, getState: () => currentState };
    scheduleBlink();
    scheduleAutonomy();
    resetSleepClock();
    if (!REDUCED_MOTION) rafId = requestAnimationFrame(tickEyes);

    return engineApi;
  }

  /* ---------------------- 4. OPTIONAL REAL VOICE / MIC SYNC ---------------------- */
  function playEmoChirp(type) {
    if (!window.__ABHI_TTS_ON__) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const now = ctx.currentTime;
      if (type === 'listen') {
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.09);
      } else {
        osc.frequency.setValueAtTime(640, now);
        osc.frequency.exponentialRampToValueAtTime(920, now + 0.07);
        osc.frequency.exponentialRampToValueAtTime(760, now + 0.14);
      }
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
      setTimeout(() => ctx.close().catch(() => {}), 250);
    } catch (_) {}
  }

  function pickCuteVoice(voices) {
    if (!voices || !voices.length) return null;
    const en = voices.filter(v => /^en/i.test(v.lang));
    return (
      en.find(v => /ana|aria|jenny|samantha|victoria|zira|google us english|female/i.test(v.name)) ||
      en.find(v => !/david|mark|guy|george|male/i.test(v.name)) ||
      en[0] ||
      voices[0]
    );
  }

  function speakText(text, engine) {
    if (!('speechSynthesis' in window) || !text) return;
    try {
      const synth = window.speechSynthesis;
      synth.cancel();
      if (synth.paused) synth.resume();

      const cleanText = text.replace(/->/g, ', ').replace(/\[[^\]]+\]/g, '').replace(/\s+/g, ' ').trim().slice(0, 300);
      if (!cleanText) return;

      playEmoChirp('speak');
      setTimeout(() => {
        const utt = new SpeechSynthesisUtterance(cleanText);
        const voice = pickCuteVoice(synth.getVoices());
        if (voice) utt.voice = voice;
        utt.lang = voice?.lang || 'en-US';
        utt.pitch = 1.45; // Cute EMO-like higher pitch
        utt.rate = 1.08;  // Lively, friendly cadence
        utt.volume = 0.95;
        utt.onstart = () => engine.setState('speaking');
        utt.onend = () => engine.setState('idle');
        utt.onerror = () => engine.setState('idle');
        synth.speak(utt);
      }, 90);
    } catch (_) {}
  }

  const ICON_MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/></svg>';
  const ICON_VOL_OFF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>';
  const ICON_VOL_ON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a9 9 0 0 1 0 14"/></svg>';

  function wireVoiceControls(panel, body, input, engine) {
    const header = panel.querySelector('.chat-header') || panel.firstElementChild;
    const toggle = document.getElementById('chatToggle');
    const sendBtn = document.getElementById('chatSend');
    const inputRow = sendBtn ? sendBtn.parentElement : (input ? input.parentElement : null);

    // 1. Keep header clean: only Close (×) button
    if (header && !header.querySelector('.emo-close-btn')) {
      const bar = document.createElement('div');
      bar.className = 'emo-voice-bar';
      const closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'emo-close-btn';
      closeBtn.textContent = '×';
      closeBtn.title = 'Close chat (Esc)';
      closeBtn.setAttribute('aria-label', 'Close chat');
      closeBtn.addEventListener('click', () => {
        if (panel.classList.contains('open')) {
          if ('speechSynthesis' in window) window.speechSynthesis.cancel();
          toggle?.click();
        }
      });
      bar.appendChild(closeBtn);
      header.appendChild(bar);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        toggle?.click();
      }
    });

    if (!inputRow || inputRow.querySelector('.emo-icon-btn')) return;

    const hasTTS = 'speechSynthesis' in window;
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

    // 2. Sound (TTS) icon button next to SEND
    if (hasTTS) {
      window.speechSynthesis.getVoices();
      const soundBtn = document.createElement('button');
      soundBtn.type = 'button';
      soundBtn.className = 'emo-icon-btn';
      soundBtn.innerHTML = ICON_VOL_OFF;
      soundBtn.title = 'Toggle ABHI voice';
      soundBtn.setAttribute('aria-label', 'Toggle ABHI voice');

      soundBtn.addEventListener('click', () => {
        window.__ABHI_TTS_ON__ = !window.__ABHI_TTS_ON__;
        soundBtn.innerHTML = window.__ABHI_TTS_ON__ ? ICON_VOL_ON : ICON_VOL_OFF;
        soundBtn.classList.toggle('active', window.__ABHI_TTS_ON__);
        if (window.__ABHI_TTS_ON__) {
          const botMsgs = body ? body.querySelectorAll('.chat-msg.bot:not(.typing)') : [];
          const lastMsg = botMsgs.length ? botMsgs[botMsgs.length - 1].textContent : 'Hi! I am ABHI.';
          speakText(lastMsg, engine);
        } else {
          window.speechSynthesis.cancel();
          engine.setState('idle');
        }
      });
      inputRow.insertBefore(soundBtn, sendBtn || null);
    }

    // 3. Mic icon button next to SEND
    if (SpeechRec && input) {
      const micBtn = document.createElement('button');
      micBtn.type = 'button';
      micBtn.className = 'emo-icon-btn';
      micBtn.innerHTML = ICON_MIC;
      micBtn.title = 'Speak to ABHI';
      micBtn.setAttribute('aria-label', 'Voice input');

      const origPlaceholder = input.getAttribute('placeholder') || 'Ask about skills, projects, certs';
      let activeRec = null;

      micBtn.addEventListener('click', async () => {
        if (activeRec) {
          activeRec.stop();
          return;
        }
        // Stop TTS so mic doesn't get blocked
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();

        // Wake up OS/browser microphone and force permission prompt first
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(t => t.stop());
          } catch (err) {
            engine.setState('error', 1200);
            input.placeholder = 'Mic access denied - check Edge/Windows mic';
            setTimeout(() => { input.placeholder = origPlaceholder; }, 3500);
            return;
          }
        }

        const rec = new SpeechRec();
        rec.lang = 'en-US';
        rec.interimResults = true;
        rec.continuous = false;
        rec.maxAlternatives = 1;
        activeRec = rec;

        let finalTranscript = '';

        rec.onstart = () => {
          micBtn.classList.add('recording');
          input.placeholder = 'Listening... speak now';
          engine.setState('listening');
          playEmoChirp('listen');
        };

        rec.onresult = (ev) => {
          let interim = '';
          for (let i = ev.resultIndex; i < ev.results.length; i++) {
            const chunk = ev.results[i][0].transcript;
            if (ev.results[i].isFinal) {
              finalTranscript += chunk;
            } else {
              interim += chunk;
            }
          }
          input.value = (finalTranscript || interim).trim();
        };

        rec.onerror = (ev) => {
          const reason = ev?.error || 'error';
          engine.setState('error', 1100);
          input.placeholder =
            reason === 'not-allowed' ? 'Mic blocked - allow in browser' :
            reason === 'no-speech' ? 'No speech heard - tap mic & speak' :
            `Mic error (${reason}) - type instead`;
          setTimeout(() => { input.placeholder = origPlaceholder; }, 3200);
        };

        rec.onend = () => {
          activeRec = null;
          micBtn.classList.remove('recording');
          if (input.placeholder === 'Listening... speak now') {
            input.placeholder = origPlaceholder;
          }
          if (input.value.trim()) {
            sendBtn?.click();
          } else if (engine.getState() === 'listening') {
            engine.setState('idle');
          }
        };

        try {
          rec.start();
        } catch (_) {
          activeRec = null;
          engine.setState('error', 1000);
        }
      });

      inputRow.insertBefore(micBtn, sendBtn || null);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();