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

  // Ensure any custom portfolio cursor stays visible above the popup & modal
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

    /* Subtle Low-Profile Bottom-Right Popup */
    .abhi-float-pill {
      position: fixed !important;
      right: 18px !important;
      bottom: 98px !important;
      z-index: 2147483640 !important;
      pointer-events: auto !important;
      cursor: pointer !important;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(14, 14, 18, 0.82);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(212, 175, 55, 0.28);
      border-radius: 999px;
      padding: 6px 10px 6px 12px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
      font-family: 'JetBrains Mono', 'Space Mono', monospace;
      color: #c8c8d0;
      font-size: 0.72rem;
      opacity: 0.82;
      transition: opacity 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    }
    .abhi-float-pill:hover {
      opacity: 1;
      border-color: rgba(212, 175, 55, 0.7);
      transform: translateY(-1px);
    }
    .abhi-pill-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4ade80;
      flex-shrink: 0;
    }
    .abhi-pill-open {
      background: rgba(212, 175, 55, 0.14);
      color: #f5c542;
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 999px;
      padding: 3px 10px;
      font-family: inherit;
      font-size: 0.7rem;
      font-weight: 700;
      cursor: pointer !important;
      pointer-events: auto !important;
    }
    .abhi-pill-open:hover {
      background: #d4af37;
      color: #09090b;
    }
    .abhi-pill-close {
      background: transparent;
      border: none;
      color: #9ca3af;
      font-size: 0.95rem;
      line-height: 1;
      cursor: pointer !important;
      padding: 2px 5px;
      pointer-events: auto !important;
    }
    .abhi-pill-close:hover { color: #fff; }

    /* Modal Backdrop & Window */
    .abhi-modal-backdrop {
      position: fixed !important;
      inset: 0 !important;
      z-index: 2147483645 !important;
      pointer-events: auto !important;
      cursor: default !important;
      background: rgba(5, 5, 8, 0.82);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      overflow-y: auto;
    }
    .abhi-modal-backdrop.open {
      display: flex;
    }

    /* Booking Card Inside Modal */
    .abhi-book-card {
      position: relative;
      width: 100%;
      max-width: 660px;
      max-height: 90vh;
      overflow-y: auto;
      background: #111114;
      border: 1px solid rgba(212, 175, 55, 0.45);
      border-radius: 14px;
      padding: 1.65rem;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.85);
      font-family: 'JetBrains Mono', 'Space Mono', monospace;
      color: #f4f4f5;
      text-align: left;
      cursor: default !important;
      pointer-events: auto !important;
    }
    .abhi-modal-close {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: 1px solid #2e2e36;
      background: #18181d;
      color: #d4d4d8;
      font-size: 1.2rem;
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
      font-size: 0.68rem;
      letter-spacing: 0.1em;
      color: #d4af37;
      border: 1px solid rgba(212, 175, 55, 0.4);
      padding: 0.22rem 0.65rem;
      border-radius: 999px;
      margin-bottom: 0.65rem;
    }
    .abhi-book-card h2 {
      margin: 0 0 0.45rem;
      font-size: 1.3rem;
      color: #f5c542;
      padding-right: 2.2rem;
    }
    .abhi-sub {
      margin: 0 0 1.2rem;
      font-size: 0.82rem;
      line-height: 1.55;
      color: #b5b5c0;
    }
    .abhi-step { margin-bottom: 1.15rem; }
    .abhi-label {
      display: block;
      font-size: 0.78rem;
      color: #d4af37;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }
    .abhi-slot-sub {
      font-size: 0.7rem;
      color: #9ca3af;
      margin: 0.55rem 0 0.35rem;
    }
    .abhi-mode-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 0.5rem;
    }
    .abhi-mode-btn, .abhi-date-btn, .abhi-slot-btn {
      background: #18181d;
      color: #e4e4e7;
      border: 1px solid #2b2b33;
      border-radius: 8px;
      padding: 0.55rem 0.65rem;
      font-family: inherit;
      font-size: 0.78rem;
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
      gap: 0.45rem;
      overflow-x: auto;
      padding-bottom: 0.3rem;
    }
    .abhi-date-btn {
      min-width: 74px;
      text-align: center;
      flex-shrink: 0;
    }
    .abhi-date-btn small { display: block; color: #9ca3af; font-size: 0.66rem; }
    .abhi-slot-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
      gap: 0.45rem;
    }
    .abhi-slot-btn:disabled {
      opacity: 0.32;
      cursor: not-allowed !important;
      text-decoration: line-through;
    }
    .abhi-form { display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.9rem; }
    .abhi-field label {
      display: block;
      font-size: 0.76rem;
      color: #d4d4d8;
      margin-bottom: 0.28rem;
    }
    .abhi-field input, .abhi-field textarea {
      width: 100%;
      box-sizing: border-box;
      background: #0d0d10;
      border: 1px solid #2e2e36;
      border-radius: 8px;
      padding: 0.62rem 0.75rem;
      color: #fff;
      font-family: inherit;
      font-size: 0.82rem;
      cursor: text !important;
    }
    .abhi-field input:focus, .abhi-field textarea:focus {
      outline: none;
      border-color: #f5c542;
    }
    .abhi-submit-btn {
      width: 100%;
      padding: 0.8rem 1rem;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #d4af37, #f5c542);
      color: #09090b;
      font-family: inherit;
      font-size: 0.84rem;
      font-weight: 700;
      cursor: pointer !important;
    }
    .abhi-submit-btn:disabled { opacity: 0.6; cursor: wait !important; }
    .abhi-status { font-size: 0.78rem; min-height: 1rem; }
    .abhi-status.ok { color: #4ade80; }
    .abhi-status.err { color: #f87171; }

    /* Confirmation View with Live Countdown */
    .abhi-success-box {
      display: none;
      text-align: center;
      padding: 1.75rem 0.5rem 0.75rem;
    }
    .abhi-success-box.active { display: block; }
    .abhi-success-box h3 {
      color: #4ade80;
      margin: 0 0 0.55rem;
      font-size: 1.2rem;
    }
    .abhi-success-box p {
      color: #d4d4d8;
      font-size: 0.84rem;
      line-height: 1.55;
      margin: 0 0 1.4rem;
    }
    .abhi-success-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .abhi-countdown-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0.65rem 1rem;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid #2e2e36;
      color: #d4d4d8;
      font-size: 0.8rem;
    }
    .abhi-countdown-num {
      color: #f5c542;
      font-weight: 700;
      min-width: 14px;
      text-align: center;
    }
    .abhi-btn-book-again {
      padding: 0.7rem 1.2rem;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #d4af37, #f5c542);
      color: #09090b;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer !important;
    }

    @media (max-width: 600px) {
      .abhi-float-pill { right: 12px !important; bottom: 90px !important; font-size: 0.68rem; }
      .abhi-book-card { padding: 1.2rem; }
    }
  `;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "abhiBookingRoot";
  document.body.appendChild(root);

  // 2. Modal Popup HTML
  const modal = document.createElement("div");
  modal.className = "abhi-modal-backdrop";
  modal.id = "abhiBookModal";
  modal.innerHTML = `
    <div class="abhi-book-card" role="dialog" aria-modal="true" aria-labelledby="abhiModalTitle">
      <button type="button" class="abhi-modal-close" id="abhiModalCloseTop" aria-label="Close booking window">&times;</button>

      <div id="abhiFormView">
        <span class="abhi-badge">AVAILABLE DAILY • 10 AM–3 PM &amp; 8 PM–12 AM IST</span>
        <h2 id="abhiModalTitle">Schedule a Call or Meeting</h2>
        <p class="abhi-sub">
          Have a question, project idea, or collaboration in mind? Feel free to reach out
          <strong>without any hesitation</strong> — book a slot for a WhatsApp chat, phone call,
          Google Meet, or MS Teams session.
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
    </div>
  `;
  root.appendChild(modal);

  let closeTimer = null;

  function clearCountdown() {
    if (closeTimer) {
      clearInterval(closeTimer);
      closeTimer = null;
    }
  }

  function resetToFormView() {
    clearCountdown();
    modal.querySelector("#abhiSuccessView").classList.remove("active");
    modal.querySelector("#abhiFormView").style.display = "block";
    setStatus("", "");
  }

  function openBookingModal() {
    elevateCustomCursors();
    resetToFormView();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeBookingModal() {
    clearCountdown();
    modal.classList.remove("open");
    document.body.style.overflow = "";
    resetToFormView();
  }

  function startCloseCountdown() {
    clearCountdown();
    let seconds = 5;
    const numEl = modal.querySelector("#abhiCountdownNum");
    numEl.textContent = String(seconds);

    closeTimer = setInterval(() => {
      seconds -= 1;
      if (seconds <= 0) {
        closeBookingModal();
      } else {
        numEl.textContent = String(seconds);
      }
    }, 1000);
  }

  modal.querySelector("#abhiModalCloseTop").addEventListener("click", closeBookingModal);
  modal.querySelector("#abhiBookAnother").addEventListener("click", resetToFormView);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeBookingModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeBookingModal();
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
    btn.addEventListener("click", openBookingModal);
    if (navContainer.tagName === "UL") {
      const li = document.createElement("li");
      li.style.listStyle = "none";
      li.appendChild(btn);
      navContainer.appendChild(li);
    } else {
      navContainer.appendChild(btn);
    }
  }

  // 4. Low-Profile Bottom-Right Floating Popup (Entire pill clickable)
  if (!sessionStorage.getItem("abhiPillDismissed")) {
    const pill = document.createElement("div");
    pill.className = "abhi-float-pill";
    pill.innerHTML = `
      <span class="abhi-pill-dot"></span>
      <span>Need to talk?</span>
      <button type="button" class="abhi-pill-open">Book Call / Meet</button>
      <button type="button" class="abhi-pill-close" aria-label="Dismiss">&times;</button>
    `;
    pill.addEventListener("click", (e) => {
      if (e.target.closest(".abhi-pill-close")) return;
      openBookingModal();
    });
    pill.querySelector(".abhi-pill-close").addEventListener("click", (e) => {
      e.stopPropagation();
      sessionStorage.setItem("abhiPillDismissed", "1");
      pill.remove();
    });
    root.appendChild(pill);
  }

  // 5. Booking State & Logic
  const state = {
    mode: "WhatsApp Chat",
    dateISO: "",
    dateLabel: "",
    timeSlot: ""
  };

  const modeGrid = modal.querySelector("#abhiModeGrid");
  const dateStrip = modal.querySelector("#abhiDateStrip");
  const slotContainer = modal.querySelector("#abhiSlotContainer");
  const form = modal.querySelector("#abhiBookingForm");
  const statusEl = modal.querySelector("#abhiStatus");
  const phoneWrap = modal.querySelector("#abhiPhoneWrap");
  const emailWrap = modal.querySelector("#abhiEmailWrap");
  const nameLabel = modal.querySelector("#abhiNameLabel");
  const reasonLabel = modal.querySelector("#abhiReasonLabel");

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
    if (modal.querySelector("#abhiHp").value.trim()) return;

    const phone = modal.querySelector("#abhiPhone").value.trim();
    const name = modal.querySelector("#abhiName").value.trim();
    const reason = modal.querySelector("#abhiReason").value.trim();
    const email = modal.querySelector("#abhiEmail").value.trim();

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

    const submitBtn = modal.querySelector("#abhiSubmitBtn");
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

      modal.querySelector("#abhiSuccessSummary").textContent =
        `Your ${state.mode} request for ${state.dateLabel} at ${state.timeSlot} IST has been sent. You will receive a confirmation shortly.`;
      modal.querySelector("#abhiFormView").style.display = "none";
      modal.querySelector("#abhiSuccessView").classList.add("active");
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