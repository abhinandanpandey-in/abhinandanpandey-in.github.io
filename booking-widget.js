(() => {
  if (document.getElementById("abhiBookingRoot")) return;

  const TARGET_EMAIL = "masternarenpandey@gmail.com";
  const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

  // Available daily: 10 AM - 3 PM & 8 PM - 12 AM (IST)
  const SLOT_GROUPS = [
    {
      title: "Morning & Afternoon (10 AM - 3 PM IST)",
      slots: [
        { hour: 10, label: "10:00 AM" },
        { hour: 11, label: "11:00 AM" },
        { hour: 12, label: "12:00 PM" },
        { hour: 13, label: "01:00 PM" },
        { hour: 14, label: "02:00 PM" },
        { hour: 15, label: "03:00 PM" }
      ]
    },
    {
      title: "Evening & Night (8 PM - 12 AM IST)",
      slots: [
        { hour: 20, label: "08:00 PM" },
        { hour: 21, label: "09:00 PM" },
        { hour: 22, label: "10:00 PM" },
        { hour: 23, label: "11:00 PM" },
        { hour: 24, label: "12:00 AM" }
      ]
    }
  ];

  // Keep custom portfolio cursor above all widgets without blocking clicks
  function elevateCustomCursors() {
    document.querySelectorAll('[id*="cursor" i], [class*="cursor" i]').forEach((el) => {
      if (el.closest("#abhiBookingRoot")) return;
      const cs = window.getComputedStyle(el);
      if (cs.position === "fixed" || cs.position === "absolute") {
        el.style.setProperty("z-index", "2147483647", "important");
        el.style.setProperty("pointer-events", "none", "important");
      }
    });
  }

  // 1. Inject Styles
  const style = document.createElement("style");
  style.textContent = `
    .abhi-nav-book-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      margin-left: 10px;
      border-radius: 999px;
      border: 1px solid rgba(212, 175, 55, 0.65);
      background: rgba(212, 175, 55, 0.1);
      color: #f5c542 !important;
      font-family: 'JetBrains Mono', 'Space Mono', monospace;
      font-size: 0.76rem;
      font-weight: 600;
      text-decoration: none !important;
      cursor: pointer !important;
      transition: all 0.2s ease;
      white-space: nowrap;
      pointer-events: auto !important;
    }
    .abhi-nav-book-btn:hover {
      background: rgba(212, 175, 55, 0.24);
      border-color: #f5c542;
    }

    /* Bottom-Left Stack (Right above Native Android App bar) */
    .abhi-left-dock {
      position: fixed !important;
      left: 18px !important;
      bottom: 84px !important;
      z-index: 2147483640 !important;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      width: 365px;
      max-width: calc(100vw - 32px);
      pointer-events: none;
      font-family: 'JetBrains Mono', 'Space Mono', monospace;
    }

    /* Mini Cute Robot Tip Bubble */
    .abhi-robot-tip {
      pointer-events: auto !important;
      cursor: pointer !important;
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 9px;
      background: rgba(17, 17, 22, 0.92);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(212, 175, 55, 0.36);
      border-radius: 12px;
      padding: 8px 24px 8px 10px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
      color: #d4d4d8;
      font-size: 0.69rem;
      line-height: 1.45;
      max-width: 340px;
      transition: border-color 0.2s ease, transform 0.2s ease;
    }
    .abhi-robot-tip:hover {
      border-color: rgba(245, 197, 66, 0.78);
      transform: translateY(-1px);
    }
    .abhi-robot-face {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: rgba(212, 175, 55, 0.14);
      border: 1px solid rgba(212, 175, 55, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1px;
    }
    .abhi-robot-tip strong {
      color: #f5c542;
      font-weight: 700;
    }
    .abhi-mini-close {
      position: absolute;
      top: 5px;
      right: 6px;
      background: transparent;
      border: none;
      color: #8b8b96;
      font-size: 0.9rem;
      line-height: 1;
      cursor: pointer !important;
      padding: 2px 4px;
      pointer-events: auto !important;
    }
    .abhi-mini-close:hover { color: #f5c542; }

    /* Main Bottom-Left Connect Popup */
    .abhi-connect-card {
      pointer-events: auto !important;
      cursor: pointer !important;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      background: rgba(14, 14, 18, 0.88);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(212, 175, 55, 0.34);
      border-radius: 12px;
      padding: 11px 13px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.55);
      color: #d4d4d8;
      transition: border-color 0.2s ease, transform 0.2s ease;
    }
    .abhi-connect-card:hover {
      border-color: rgba(245, 197, 66, 0.78);
      transform: translateY(-1px);
    }
    .abhi-connect-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    .abhi-connect-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.67rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: #f5c542;
    }
    .abhi-pill-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4ade80;
      flex-shrink: 0;
    }
    .abhi-connect-text {
      margin: 0 0 9px;
      font-size: 0.72rem;
      line-height: 1.5;
      color: #c8c8d2;
    }
    .abhi-connect-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 6px 13px;
      border-radius: 8px;
      border: 1px solid rgba(212, 175, 55, 0.55);
      background: rgba(212, 175, 55, 0.16);
      color: #f5c542;
      font-family: inherit;
      font-size: 0.73rem;
      font-weight: 700;
      cursor: pointer !important;
      pointer-events: auto !important;
      transition: all 0.18s ease;
    }
    .abhi-connect-cta:hover {
      background: linear-gradient(135deg, #d4af37, #f5c542);
      color: #09090b;
    }
    .abhi-pill-close {
      background: transparent;
      border: none;
      color: #9ca3af;
      font-size: 1rem;
      line-height: 1;
      cursor: pointer !important;
      padding: 0 4px;
      pointer-events: auto !important;
    }
    .abhi-pill-close:hover { color: #fff; }

    /* Compact Floating Booking Popup (NO full-screen backdrop!) */
    .abhi-book-popup {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      z-index: 2147483644 !important;
      width: 455px;
      max-width: calc(100vw - 28px);
      max-height: 80vh;
      overflow-y: auto;
      display: none;
      background: #0d0d11;
      border: 1px solid rgba(212, 175, 55, 0.55);
      border-radius: 14px;
      padding: 1.25rem 1.3rem;
      box-shadow: 0 18px 48px rgba(0, 0, 0, 0.88), 0 0 0 1px rgba(212, 175, 55, 0.15);
      font-family: 'JetBrains Mono', 'Space Mono', monospace;
      color: #f4f4f5;
      text-align: left;
      cursor: default !important;
      pointer-events: auto !important;
      box-sizing: border-box;
      scrollbar-width: thin;
      scrollbar-color: #d4af37 #09090b;
    }
    .abhi-book-popup.open {
      display: block;
    }

    /* Gold Slider + Black Track Scrollbar (Replaces White/Gray Browser Scrollbars) */
    .abhi-book-popup::-webkit-scrollbar,
    .abhi-date-strip::-webkit-scrollbar,
    .abhi-book-popup textarea::-webkit-scrollbar {
      width: 7px;
      height: 6px;
    }
    .abhi-book-popup::-webkit-scrollbar-track,
    .abhi-date-strip::-webkit-scrollbar-track,
    .abhi-book-popup textarea::-webkit-scrollbar-track {
      background: #09090b;
      border-radius: 999px;
    }
    .abhi-book-popup::-webkit-scrollbar-thumb,
    .abhi-date-strip::-webkit-scrollbar-thumb,
    .abhi-book-popup textarea::-webkit-scrollbar-thumb {
      background: #d4af37;
      border-radius: 999px;
      border: 1px solid #09090b;
    }
    .abhi-book-popup::-webkit-scrollbar-thumb:hover,
    .abhi-date-strip::-webkit-scrollbar-thumb:hover,
    .abhi-book-popup textarea::-webkit-scrollbar-thumb:hover {
      background: #f5c542;
    }
    .abhi-book-popup::-webkit-scrollbar-corner,
    .abhi-date-strip::-webkit-scrollbar-corner {
      background: #09090b;
    }

    .abhi-modal-close {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 28px;
      height: 28px;
      border-radius: 7px;
      border: 1px solid #2e2e36;
      background: #16161b;
      color: #d4d4d8;
      font-size: 1.1rem;
      line-height: 1;
      cursor: pointer !important;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
    .abhi-modal-close:hover {
      border-color: #f5c542;
      color: #f5c542;
    }
    .abhi-badge {
      display: inline-block;
      font-size: 0.62rem;
      letter-spacing: 0.08em;
      color: #d4af37;
      border: 1px solid rgba(212, 175, 55, 0.4);
      padding: 0.18rem 0.55rem;
      border-radius: 999px;
      margin-bottom: 0.5rem;
    }
    .abhi-book-popup h2 {
      margin: 0 0 0.35rem;
      font-size: 1.08rem;
      color: #f5c542;
      padding-right: 2rem;
    }
    .abhi-sub {
      margin: 0 0 0.9rem;
      font-size: 0.74rem;
      line-height: 1.5;
      color: #b5b5c0;
    }
    .abhi-step { margin-bottom: 0.85rem; }
    .abhi-label {
      display: block;
      font-size: 0.72rem;
      color: #d4af37;
      margin-bottom: 0.4rem;
      font-weight: 700;
    }
    .abhi-slot-sub {
      font-size: 0.66rem;
      color: #9ca3af;
      margin: 0.45rem 0 0.3rem;
    }
    .abhi-mode-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.4rem;
    }
    .abhi-mode-btn, .abhi-date-btn, .abhi-slot-btn {
      background: #15151a;
      color: #e4e4e7;
      border: 1px solid #2b2b33;
      border-radius: 7px;
      padding: 0.45rem 0.55rem;
      font-family: inherit;
      font-size: 0.72rem;
      cursor: pointer !important;
      transition: all 0.15s ease;
    }
    .abhi-mode-btn:hover, .abhi-date-btn:hover, .abhi-slot-btn:hover:not(:disabled) {
      border-color: #d4af37;
    }
    .abhi-mode-btn.active, .abhi-date-btn.active, .abhi-slot-btn.active {
      background: rgba(212, 175, 55, 0.18);
      border-color: #f5c542;
      color: #f5c542;
      font-weight: 700;
    }
    .abhi-date-strip {
      display: flex;
      gap: 0.4rem;
      overflow-x: auto;
      padding-bottom: 0.45rem;
      scrollbar-width: thin;
      scrollbar-color: #d4af37 #09090b;
    }
    .abhi-date-btn {
      min-width: 68px;
      text-align: center;
      flex-shrink: 0;
    }
    .abhi-date-btn small { display: block; color: #9ca3af; font-size: 0.62rem; }
    .abhi-slot-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.4rem;
    }
    .abhi-slot-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed !important;
      text-decoration: line-through;
    }
    .abhi-form { display: flex; flex-direction: column; gap: 0.65rem; margin-top: 0.7rem; }
    .abhi-field label {
      display: block;
      font-size: 0.7rem;
      color: #d4d4d8;
      margin-bottom: 0.22rem;
    }
    .abhi-field input, .abhi-field textarea {
      width: 100%;
      box-sizing: border-box;
      background: #09090b;
      border: 1px solid #2e2e36;
      border-radius: 7px;
      padding: 0.52rem 0.65rem;
      color: #fff;
      font-family: inherit;
      font-size: 0.76rem;
      cursor: text !important;
      scrollbar-width: thin;
      scrollbar-color: #d4af37 #09090b;
    }
    .abhi-field input:focus, .abhi-field textarea:focus {
      outline: none;
      border-color: #f5c542;
    }
    .abhi-submit-btn {
      width: 100%;
      padding: 0.68rem 0.9rem;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #d4af37, #f5c542);
      color: #09090b;
      font-family: inherit;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer !important;
    }
    .abhi-submit-btn:disabled { opacity: 0.6; cursor: wait !important; }
    .abhi-status { font-size: 0.72rem; min-height: 0.9rem; }
    .abhi-status.ok { color: #4ade80; }
    .abhi-status.err { color: #f87171; }

    /* Confirmation View with Live Countdown */
    .abhi-success-box {
      display: none;
      text-align: center;
      padding: 1.35rem 0.4rem 0.45rem;
    }
    .abhi-success-box.active { display: block; }
    .abhi-success-box h3 {
      color: #4ade80;
      margin: 0 0 0.45rem;
      font-size: 1.08rem;
    }
    .abhi-success-box p {
      color: #d4d4d8;
      font-size: 0.76rem;
      line-height: 1.5;
      margin: 0 0 1.1rem;
    }
    .abhi-success-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    .abhi-countdown-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 0.55rem 0.85rem;
      border-radius: 8px;
      background: #09090b;
      border: 1px solid #2e2e36;
      color: #d4d4d8;
      font-size: 0.74rem;
    }
    .abhi-countdown-num {
      color: #f5c542;
      font-weight: 700;
      min-width: 12px;
      text-align: center;
    }
    .abhi-btn-book-again {
      padding: 0.58rem 0.95rem;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #d4af37, #f5c542);
      color: #09090b;
      font-family: inherit;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer !important;
    }

    @media (max-width: 600px) {
      .abhi-left-dock { left: 12px !important; bottom: 82px !important; width: calc(100vw - 24px); }
      .abhi-book-popup { width: calc(100vw - 20px); max-height: 82vh; padding: 1.05rem; }
    }
  `;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "abhiBookingRoot";
  document.body.appendChild(root);

  // 2. Compact Floating Booking Popup (Only takes its own card space)
  const popupWindow = document.createElement("div");
  popupWindow.className = "abhi-book-popup";
  popupWindow.id = "abhiBookPopup";
  popupWindow.setAttribute("role", "dialog");
  popupWindow.setAttribute("aria-labelledby", "abhiModalTitle");
  popupWindow.innerHTML = `
    <button type="button" class="abhi-modal-close" id="abhiModalCloseTop" aria-label="Close booking popup">&times;</button>

    <div id="abhiFormView">
      <span class="abhi-badge">DAILY • 10 AM–3 PM &amp; 8 PM–12 AM IST</span>
      <h2 id="abhiModalTitle">Schedule a Call or Meeting</h2>
      <p class="abhi-sub">
        Connect with me on whichever platform you're comfortable with — without any hesitation or shame.
        I'll listen without judging you.
      </p>

      <div class="abhi-step">
        <label class="abhi-label">1. Select Communication Mode</label>
        <div class="abhi-mode-grid" id="abhiModeGrid">
          <button type="button" class="abhi-mode-btn active" data-mode="WhatsApp Chat">WhatsApp Chat</button>
          <button type="button" class="abhi-mode-btn" data-mode="Phone Call">Phone Call</button>
          <button type="button" class="abhi-mode-btn" data-mode="Google Meet">Google Meet</button>
          <button type="button" class="abhi-mode-btn" data-mode="MS Teams">MS Teams</button>
        </div>
      </div>

      <div class="abhi-step">
        <label class="abhi-label">2. Select a Date</label>
        <div class="abhi-date-strip" id="abhiDateStrip"></div>
      </div>

      <div class="abhi-step">
        <label class="abhi-label">3. Select an Available Time Slot (IST)</label>
        <div id="abhiSlotContainer"></div>
      </div>

      <form id="abhiBookingForm" class="abhi-form" novalidate>
        <input type="text" id="abhiHp" style="display:none" tabindex="-1" autocomplete="off">

        <div class="abhi-field" id="abhiPhoneWrap">
          <label for="abhiPhone">WhatsApp / Phone Number *</label>
          <input type="tel" id="abhiPhone" placeholder="+91 98765 43210" maxlength="16">
        </div>

        <div class="abhi-field" id="abhiNameWrap">
          <label for="abhiName" id="abhiNameLabel">Full Name (Optional)</label>
          <input type="text" id="abhiName" placeholder="Your full name" maxlength="80">
        </div>

        <div class="abhi-field" id="abhiReasonWrap">
          <label for="abhiReason" id="abhiReasonLabel">Reason for Contact (Optional)</label>
          <textarea id="abhiReason" rows="2" placeholder="Briefly share what you would like to discuss..." maxlength="400"></textarea>
        </div>

        <div class="abhi-field" id="abhiEmailWrap" style="display:none;">
          <label for="abhiEmail">Email Address (Optional — for meeting invite link)</label>
          <input type="email" id="abhiEmail" placeholder="you@example.com" maxlength="100">
        </div>

        <div id="abhiStatus" class="abhi-status" aria-live="polite"></div>

        <button type="submit" class="abhi-submit-btn" id="abhiSubmitBtn">Confirm Slot</button>
      </form>
    </div>

    <div id="abhiSuccessView" class="abhi-success-box">
      <h3>Slot Confirmed</h3>
      <p id="abhiSuccessSummary"></p>
      <div class="abhi-success-footer">
        <div class="abhi-countdown-pill">
          <span>Form closing in</span>
          <span class="abhi-countdown-num" id="abhiCountdownNum">5</span>
        </div>
        <button type="button" class="abhi-btn-book-again" id="abhiBookAnother">Book Another Call / Meet</button>
      </div>
    </div>
  `;
  root.appendChild(popupWindow);

  let closeTimer = null;
  let dockEl = null;

  function clearCountdown() {
    if (closeTimer) {
      clearInterval(closeTimer);
      closeTimer = null;
    }
  }

  function resetToFormView() {
    clearCountdown();
    popupWindow.querySelector("#abhiSuccessView").classList.remove("active");
    popupWindow.querySelector("#abhiFormView").style.display = "block";
    setStatus("", "");
  }

  function openBookingPopup(e) {
    if (e) e.stopPropagation();
    elevateCustomCursors();
    resetToFormView();
    popupWindow.classList.add("open");
    if (dockEl) dockEl.style.display = "none";
  }

  function closeBookingPopup() {
    clearCountdown();
    popupWindow.classList.remove("open");
    resetToFormView();
    if (dockEl && !sessionStorage.getItem("abhiDockDismissed")) {
      dockEl.style.display = "flex";
    }
  }

  function startCloseCountdown() {
    clearCountdown();
    let seconds = 5;
    const numEl = popupWindow.querySelector("#abhiCountdownNum");
    numEl.textContent = String(seconds);

    closeTimer = setInterval(() => {
      seconds -= 1;
      if (seconds <= 0) {
        closeBookingPopup();
      } else {
        numEl.textContent = String(seconds);
      }
    }, 1000);
  }

  popupWindow.querySelector("#abhiModalCloseTop").addEventListener("click", (e) => {
    e.stopPropagation();
    closeBookingPopup();
  });
  popupWindow.querySelector("#abhiBookAnother").addEventListener("click", (e) => {
    e.stopPropagation();
    resetToFormView();
  });
  popupWindow.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("click", (e) => {
    if (popupWindow.classList.contains("open") && !popupWindow.contains(e.target)) {
      closeBookingPopup();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popupWindow.classList.contains("open")) closeBookingPopup();
  });

  // 3. Navbar Button
  const navContainer =
    document.querySelector("nav ul") ||
    document.querySelector("header nav") ||
    document.querySelector("nav");

  if (navContainer && !document.querySelector(".abhi-nav-book-btn")) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "abhi-nav-book-btn";
    btn.textContent = "Book Call / Meet";
    btn.addEventListener("click", openBookingPopup);
    if (navContainer.tagName === "UL") {
      const li = document.createElement("li");
      li.style.listStyle = "none";
      li.appendChild(btn);
      navContainer.appendChild(li);
    } else {
      navContainer.appendChild(btn);
    }
  }

  // 4. Bottom-Left Dock (Cute Robot Tip Bubble + Wide Main Connect Popup)
  if (!sessionStorage.getItem("abhiDockDismissed")) {
    dockEl = document.createElement("div");
    dockEl.className = "abhi-left-dock";

    if (!sessionStorage.getItem("abhiRobotTipDismissed")) {
      const robotTip = document.createElement("div");
      robotTip.className = "abhi-robot-tip";
      robotTip.innerHTML = `
        <div class="abhi-robot-face" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="2.5" x2="12" y2="5.5" stroke="#f5c542" stroke-width="1.8" stroke-linecap="round"/>
            <circle cx="12" cy="2" r="1.4" fill="#f5c542"/>
            <rect x="4" y="6" width="16" height="13" rx="4" fill="#09090b" stroke="#f5c542" stroke-width="1.6"/>
            <circle cx="9.2" cy="11.5" r="1.5" fill="#f5c542"/>
            <circle cx="14.8" cy="11.5" r="1.5" fill="#f5c542"/>
            <path d="M9.3 15.2C10.1 16.2 13.9 16.2 14.7 15.2" stroke="#f5c542" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div>
          <strong>Did you know?</strong> You can now book a WhatsApp chat with me even for your doubts and knowledge sharing — <strong>book your slot now!</strong>
        </div>
        <button type="button" class="abhi-mini-close" aria-label="Dismiss tip">&times;</button>
      `;
      robotTip.addEventListener("click", (e) => {
        if (e.target.closest(".abhi-mini-close")) return;
        openBookingPopup(e);
      });
      robotTip.querySelector(".abhi-mini-close").addEventListener("click", (e) => {
        e.stopPropagation();
        sessionStorage.setItem("abhiRobotTipDismissed", "1");
        robotTip.remove();
      });
      dockEl.appendChild(robotTip);
    }

    const connectCard = document.createElement("div");
    connectCard.className = "abhi-connect-card";
    connectCard.innerHTML = `
      <div class="abhi-connect-head">
        <span class="abhi-connect-tag"><span class="abhi-pill-dot"></span>NEED TO TALK?</span>
        <button type="button" class="abhi-pill-close" aria-label="Dismiss popup">&times;</button>
      </div>
      <p class="abhi-connect-text">
        Connect with me on whichever platform you're comfortable with — without any hesitation or shame. I'll listen without judging you.
      </p>
      <button type="button" class="abhi-connect-cta">Book Call / Meet</button>
    `;
    connectCard.addEventListener("click", (e) => {
      if (e.target.closest(".abhi-pill-close")) return;
      openBookingPopup(e);
    });
    connectCard.querySelector(".abhi-pill-close").addEventListener("click", (e) => {
      e.stopPropagation();
      sessionStorage.setItem("abhiDockDismissed", "1");
      dockEl.remove();
      dockEl = null;
    });
    dockEl.appendChild(connectCard);

    root.appendChild(dockEl);
  }

  // 5. Booking State & Logic
  const state = {
    mode: "WhatsApp Chat",
    dateISO: "",
    dateLabel: "",
    timeSlot: ""
  };

  const modeGrid = popupWindow.querySelector("#abhiModeGrid");
  const dateStrip = popupWindow.querySelector("#abhiDateStrip");
  const slotContainer = popupWindow.querySelector("#abhiSlotContainer");
  const form = popupWindow.querySelector("#abhiBookingForm");
  const statusEl = popupWindow.querySelector("#abhiStatus");
  const phoneWrap = popupWindow.querySelector("#abhiPhoneWrap");
  const emailWrap = popupWindow.querySelector("#abhiEmailWrap");
  const nameLabel = popupWindow.querySelector("#abhiNameLabel");
  const reasonLabel = popupWindow.querySelector("#abhiReasonLabel");

  const isCallOrWA = (m) => m === "WhatsApp Chat" || m === "Phone Call";

  function updateFields() {
    if (isCallOrWA(state.mode)) {
      phoneWrap.style.display = "block";
      emailWrap.style.display = "none";
      nameLabel.textContent = "Full Name (Optional)";
      reasonLabel.textContent = "Reason for Contact (Optional)";
    } else {
      phoneWrap.style.display = "none";
      emailWrap.style.display = "block";
      nameLabel.textContent = "Full Name *";
      reasonLabel.textContent = "Reason for Contact *";
    }
  }

  function getISTNow() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 5.5 * 3600000);
  }

  function formatISO(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function renderDates() {
    dateStrip.innerHTML = "";
    const istNow = getISTNow();

    for (let i = 0; i < 10; i++) {
      const d = new Date(istNow);
      d.setDate(istNow.getDate() + i);
      const iso = formatISO(d);
      const dayName = d.toLocaleDateString("en-IN", { weekday: "short" });
      const dateNum = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "abhi-date-btn" + (i === 0 ? " active" : "");
      btn.innerHTML = `<small>${i === 0 ? "Today" : dayName}</small>${dateNum}`;
      btn.dataset.iso = iso;
      btn.dataset.label = `${dayName}, ${dateNum}`;

      if (i === 0) {
        state.dateISO = iso;
        state.dateLabel = btn.dataset.label;
      }

      btn.addEventListener("click", () => {
        dateStrip.querySelectorAll(".abhi-date-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.dateISO = btn.dataset.iso;
        state.dateLabel = btn.dataset.label;
        state.timeSlot = "";
        renderSlots();
      });

      dateStrip.appendChild(btn);
    }
  }

  function renderSlots() {
    slotContainer.innerHTML = "";
    const istNow = getISTNow();
    const todayISO = formatISO(istNow);
    const currentHour = istNow.getHours();

    SLOT_GROUPS.forEach((group) => {
      const title = document.createElement("div");
      title.className = "abhi-slot-sub";
      title.textContent = group.title;
      slotContainer.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "abhi-slot-grid";

      group.slots.forEach((slot) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "abhi-slot-btn";
        btn.textContent = slot.label;

        const isPast = state.dateISO === todayISO && slot.hour <= currentHour;
        if (isPast) btn.disabled = true;

        btn.addEventListener("click", () => {
          slotContainer.querySelectorAll(".abhi-slot-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.timeSlot = slot.label;
        });

        grid.appendChild(btn);
      });

      slotContainer.appendChild(grid);
    });
  }

  modeGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".abhi-mode-btn");
    if (!btn) return;
    modeGrid.querySelectorAll(".abhi-mode-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.mode = btn.dataset.mode;
    updateFields();
  });

  function setStatus(msg, cls) {
    statusEl.textContent = msg;
    statusEl.className = "abhi-status " + (cls || "");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (popupWindow.querySelector("#abhiHp").value.trim()) return;

    const phone = popupWindow.querySelector("#abhiPhone").value.trim();
    const name = popupWindow.querySelector("#abhiName").value.trim();
    const reason = popupWindow.querySelector("#abhiReason").value.trim();
    const email = popupWindow.querySelector("#abhiEmail").value.trim();

    if (!state.dateISO || !state.timeSlot) {
      return setStatus("Please select a date and time slot first.", "err");
    }

    if (isCallOrWA(state.mode)) {
      if (!/^[+\d][\d\s-]{8,15}$/.test(phone)) {
        return setStatus("Please enter a valid WhatsApp or phone number.", "err");
      }
    } else {
      if (name.length < 2) {
        return setStatus("Please enter your full name for Google Meet or MS Teams.", "err");
      }
      if (reason.length < 5) {
        return setStatus("Please provide a brief reason for scheduling this meeting.", "err");
      }
    }

    const submitBtn = popupWindow.querySelector("#abhiSubmitBtn");
    submitBtn.disabled = true;
    setStatus("Submitting your booking...", "");

    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `[Slot Booked] ${state.mode} | ${state.dateLabel} @ ${state.timeSlot} IST`,
          _template: "table",
          _captcha: "false",
          Mode: state.mode,
          Date: `${state.dateLabel} (${state.dateISO})`,
          Time: `${state.timeSlot} IST`,
          Phone_or_WhatsApp: phone || "N/A",
          Full_Name: name || "N/A",
          Visitor_Email: email || "N/A",
          Reason: reason || "N/A"
        })
      });

      if (!res.ok) throw new Error("Request failed");

      popupWindow.querySelector("#abhiSuccessSummary").textContent =
        `Your ${state.mode} request for ${state.dateLabel} at ${state.timeSlot} IST has been sent. You will receive a confirmation shortly.`;
      popupWindow.querySelector("#abhiFormView").style.display = "none";
      popupWindow.querySelector("#abhiSuccessView").classList.add("active");
      form.reset();
      state.timeSlot = "";
      renderSlots();
      startCloseCountdown();
    } catch {
      setStatus("Unable to submit right now. Please try again in a moment.", "err");
    } finally {
      submitBtn.disabled = false;
    }
  });

  updateFields();
  renderDates();
  renderSlots();
  elevateCustomCursors();
  setTimeout(elevateCustomCursors, 800);
})();