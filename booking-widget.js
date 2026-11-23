(() => {
  if (document.getElementById("book-slot")) return;

  const TARGET_EMAIL = "masternarenpandey@gmail.com";
  const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

  // Every day available: 10 AM - 3 PM & 8 PM - 12 AM (IST)
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
      title: "Night (8 PM - 12 AM IST)",
      slots: [
        { hour: 20, label: "08:00 PM" },
        { hour: 21, label: "09:00 PM" },
        { hour: 22, label: "10:00 PM" },
        { hour: 23, label: "11:00 PM" },
        { hour: 24, label: "12:00 AM" }
      ]
    }
  ];

  // 1. Inject Styles (Black & Gold Theme)
  const style = document.createElement("style");
  style.textContent = `
    .abhi-nav-book-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      margin-left: 10px;
      border-radius: 999px;
      border: 1px solid #d4af37;
      background: rgba(212, 175, 55, 0.14);
      color: #f5c542 !important;
      font-family: 'JetBrains Mono', 'Space Mono', monospace;
      font-size: 0.78rem;
      font-weight: 700;
      text-decoration: none !important;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .abhi-nav-book-btn:hover {
      background: linear-gradient(135deg, #d4af37, #f5c542);
      color: #09090b !important;
    }

    .abhi-float-popup {
      position: fixed;
      right: 18px;
      bottom: 88px;
      z-index: 9998;
      width: 265px;
      background: #111114;
      border: 1px solid rgba(212, 175, 55, 0.55);
      border-radius: 12px;
      padding: 12px 14px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.75);
      font-family: 'JetBrains Mono', 'Space Mono', monospace;
      color: #f4f4f5;
      animation: abhiPopIn 0.35s ease;
    }
    @keyframes abhiPopIn {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .abhi-float-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .abhi-float-dot {
      font-size: 0.68rem;
      color: #f5c542;
      letter-spacing: 0.08em;
      font-weight: 700;
    }
    .abhi-float-close {
      background: transparent;
      border: none;
      color: #9ca3af;
      font-size: 1rem;
      cursor: pointer;
      line-height: 1;
      padding: 0 4px;
    }
    .abhi-float-close:hover { color: #fff; }
    .abhi-float-text {
      font-size: 0.76rem;
      line-height: 1.45;
      color: #d4d4d8;
      margin: 0 0 10px;
    }
    .abhi-float-cta {
      display: block;
      width: 100%;
      text-align: center;
      padding: 8px 10px;
      border-radius: 8px;
      background: linear-gradient(135deg, #d4af37, #f5c542);
      color: #09090b !important;
      font-size: 0.78rem;
      font-weight: 700;
      text-decoration: none !important;
      box-sizing: border-box;
    }

    .abhi-book-wrap {
      font-family: 'JetBrains Mono', 'Space Mono', monospace;
      background: #09090b;
      color: #f4f4f5;
      padding: 2.5rem 1rem 2rem;
      display: flex;
      justify-content: center;
      border-top: 1px solid rgba(212, 175, 55, 0.25);
      text-align: left;
    }
    .abhi-book-card {
      width: 100%;
      max-width: 720px;
      background: #111114;
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-radius: 14px;
      padding: 1.8rem;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.65);
    }
    .abhi-badge {
      display: inline-block;
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      color: #d4af37;
      border: 1px solid rgba(212, 175, 55, 0.45);
      padding: 0.25rem 0.65rem;
      border-radius: 999px;
      margin-bottom: 0.75rem;
    }
    .abhi-book-card h2 {
      margin: 0 0 0.5rem;
      font-size: 1.4rem;
      color: #f5c542;
    }
    .abhi-sub {
      margin: 0 0 1.4rem;
      font-size: 0.86rem;
      line-height: 1.6;
      color: #b5b5c0;
    }
    .abhi-step { margin-bottom: 1.3rem; }
    .abhi-label {
      display: block;
      font-size: 0.8rem;
      color: #d4af37;
      margin-bottom: 0.55rem;
      font-weight: 700;
    }
    .abhi-slot-sub {
      font-size: 0.72rem;
      color: #9ca3af;
      margin: 0.6rem 0 0.4rem;
    }
    .abhi-mode-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
      gap: 0.55rem;
    }
    .abhi-mode-btn, .abhi-date-btn, .abhi-slot-btn {
      background: #18181d;
      color: #e4e4e7;
      border: 1px solid #2b2b33;
      border-radius: 8px;
      padding: 0.6rem 0.7rem;
      font-family: inherit;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.18s ease;
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
      gap: 0.5rem;
      overflow-x: auto;
      padding-bottom: 0.35rem;
    }
    .abhi-date-btn {
      min-width: 78px;
      text-align: center;
      flex-shrink: 0;
    }
    .abhi-date-btn small { display: block; color: #9ca3af; font-size: 0.68rem; }
    .abhi-slot-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(102px, 1fr));
      gap: 0.5rem;
    }
    .abhi-slot-btn:disabled {
      opacity: 0.32;
      cursor: not-allowed;
      text-decoration: line-through;
    }
    .abhi-form { display: flex; flex-direction: column; gap: 0.9rem; margin-top: 1rem; }
    .abhi-field label {
      display: block;
      font-size: 0.78rem;
      color: #d4d4d8;
      margin-bottom: 0.3rem;
    }
    .abhi-field input, .abhi-field textarea {
      width: 100%;
      box-sizing: border-box;
      background: #0d0d10;
      border: 1px solid #2e2e36;
      border-radius: 8px;
      padding: 0.68rem 0.8rem;
      color: #fff;
      font-family: inherit;
      font-size: 0.84rem;
    }
    .abhi-field input:focus, .abhi-field textarea:focus {
      outline: none;
      border-color: #f5c542;
    }
    .abhi-submit-btn {
      width: 100%;
      padding: 0.85rem 1rem;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #d4af37, #f5c542);
      color: #09090b;
      font-family: inherit;
      font-size: 0.86rem;
      font-weight: 700;
      cursor: pointer;
    }
    .abhi-submit-btn:disabled { opacity: 0.6; cursor: wait; }
    .abhi-status { font-size: 0.8rem; min-height: 1.1rem; }
    .abhi-status.ok { color: #4ade80; }
    .abhi-status.err { color: #f87171; }

    @media (max-width: 600px) {
      .abhi-float-popup { right: 12px; bottom: 82px; width: 235px; }
      .abhi-book-card { padding: 1.25rem; }
    }
  `;
  document.head.appendChild(style);

  // 2. Add "Book Call / Meet" Button in Navbar
  const navContainer =
    document.querySelector("nav ul") ||
    document.querySelector("header nav") ||
    document.querySelector("nav");

  if (navContainer && !document.querySelector(".abhi-nav-book-btn")) {
    const link = document.createElement("a");
    link.href = "#book-slot";
    link.className = "abhi-nav-book-btn";
    link.textContent = "Book Call / Meet";
    if (navContainer.tagName === "UL") {
      const li = document.createElement("li");
      li.style.listStyle = "none";
      li.appendChild(link);
      navContainer.appendChild(li);
    } else {
      navContainer.appendChild(link);
    }
  }

  // 3. Add Small Floating Popup on Screen
  const popup = document.createElement("div");
  popup.className = "abhi-float-popup";
  popup.innerHTML = `
    <div class="abhi-float-top">
      <span class="abhi-float-dot">● AVAILABLE DAILY</span>
      <button type="button" class="abhi-float-close" aria-label="Close popup">&times;</button>
    </div>
    <p class="abhi-float-text">
      Bina jhijhak aur sharam ke WhatsApp chat, call, Google Meet ya Teams par slot book karein.
    </p>
    <a href="#book-slot" class="abhi-float-cta">Book a Call / Meeting</a>
  `;
  popup.querySelector(".abhi-float-close").addEventListener("click", () => popup.remove());
  document.body.appendChild(popup);

  // 4. Build Booking Section inside Footer
  const section = document.createElement("section");
  section.id = "book-slot";
  section.className = "abhi-book-wrap";
  section.innerHTML = `
    <div class="abhi-book-card">
      <span class="abhi-badge">OPEN EVERY DAY • 10 AM–3 PM &amp; 8 PM–12 AM IST</span>
      <h2>Bina Jhijhak Connect Karein</h2>
      <p class="abhi-sub">
        Koi bhi sawaal ho, project ya opportunity discuss karni ho, ya bas tech par baat karni ho —
        <strong>bina kisi jhijhak ya sharam ke</strong> aap WhatsApp chat, phone call, Google Meet ya
        MS Teams par apna slot book kar sakte hain.
      </p>

      <div class="abhi-step">
        <label class="abhi-label">1. Mode select karein</label>
        <div class="abhi-mode-grid" id="abhiModeGrid">
          <button type="button" class="abhi-mode-btn active" data-mode="WhatsApp Chat">WhatsApp Chat</button>
          <button type="button" class="abhi-mode-btn" data-mode="Phone Call">Phone Call</button>
          <button type="button" class="abhi-mode-btn" data-mode="Google Meet">Google Meet</button>
          <button type="button" class="abhi-mode-btn" data-mode="MS Teams">MS Teams</button>
        </div>
      </div>

      <div class="abhi-step">
        <label class="abhi-label">2. Date select karein (Every Day Open)</label>
        <div class="abhi-date-strip" id="abhiDateStrip"></div>
      </div>

      <div class="abhi-step">
        <label class="abhi-label">3. Available Time Slot (IST)</label>
        <div id="abhiSlotContainer"></div>
      </div>

      <form id="abhiBookingForm" class="abhi-form" novalidate>
        <input type="text" id="abhiHp" style="display:none" tabindex="-1" autocomplete="off">

        <div class="abhi-field" id="abhiPhoneWrap">
          <label for="abhiPhone">Aapka WhatsApp / Phone Number *</label>
          <input type="tel" id="abhiPhone" placeholder="+91 98765 43210" maxlength="16">
        </div>

        <div class="abhi-field" id="abhiNameWrap">
          <label for="abhiName" id="abhiNameLabel">Full Name (Optional)</label>
          <input type="text" id="abhiName" placeholder="Aapka poora naam" maxlength="80">
        </div>

        <div class="abhi-field" id="abhiReasonWrap">
          <label for="abhiReason" id="abhiReasonLabel">Contact karne ka reason (Optional)</label>
          <textarea id="abhiReason" rows="3" placeholder="Short mein batayein kis baare mein baat karni hai..." maxlength="400"></textarea>
        </div>

        <div class="abhi-field" id="abhiEmailWrap" style="display:none;">
          <label for="abhiEmail">Aapka Email (Meeting link bhejne ke liye - Optional)</label>
          <input type="email" id="abhiEmail" placeholder="you@example.com" maxlength="100">
        </div>

        <div id="abhiStatus" class="abhi-status" aria-live="polite"></div>

        <button type="submit" class="abhi-submit-btn" id="abhiSubmitBtn">Confirm &amp; Book Slot</button>
      </form>
    </div>
  `;

  const footer = document.querySelector("footer");
  if (footer) {
    footer.prepend(section);
  } else {
    document.body.appendChild(section);
  }

  // 5. Booking State & Logic
  const state = {
    mode: "WhatsApp Chat",
    dateISO: "",
    dateLabel: "",
    timeSlot: ""
  };

  const modeGrid = section.querySelector("#abhiModeGrid");
  const dateStrip = section.querySelector("#abhiDateStrip");
  const slotContainer = section.querySelector("#abhiSlotContainer");
  const form = section.querySelector("#abhiBookingForm");
  const statusEl = section.querySelector("#abhiStatus");
  const phoneWrap = section.querySelector("#abhiPhoneWrap");
  const emailWrap = section.querySelector("#abhiEmailWrap");
  const nameLabel = section.querySelector("#abhiNameLabel");
  const reasonLabel = section.querySelector("#abhiReasonLabel");

  const isCallOrWA = (m) => m === "WhatsApp Chat" || m === "Phone Call";

  function updateFields() {
    if (isCallOrWA(state.mode)) {
      phoneWrap.style.display = "block";
      emailWrap.style.display = "none";
      nameLabel.textContent = "Full Name (Optional)";
      reasonLabel.textContent = "Contact karne ka reason (Optional)";
    } else {
      phoneWrap.style.display = "none";
      emailWrap.style.display = "block";
      nameLabel.textContent = "Full Name *";
      reasonLabel.textContent = "Contact karne ka reason *";
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
    if (section.querySelector("#abhiHp").value.trim()) return;

    const phone = section.querySelector("#abhiPhone").value.trim();
    const name = section.querySelector("#abhiName").value.trim();
    const reason = section.querySelector("#abhiReason").value.trim();
    const email = section.querySelector("#abhiEmail").value.trim();

    if (!state.dateISO || !state.timeSlot) {
      return setStatus("Please pehle date aur time slot select karein.", "err");
    }

    if (isCallOrWA(state.mode)) {
      if (!/^[+\d][\d\s-]{8,15}$/.test(phone)) {
        return setStatus("Please valid WhatsApp / Phone number enter karein.", "err");
      }
    } else {
      if (name.length < 2) {
        return setStatus("Google Meet / MS Teams ke liye Full Name zaroori hai.", "err");
      }
      if (reason.length < 5) {
        return setStatus("Please short mein contact karne ka reason likhein.", "err");
      }
    }

    const submitBtn = section.querySelector("#abhiSubmitBtn");
    submitBtn.disabled = true;
    setStatus("Slot book kiya ja raha hai...", "");

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
      setStatus("Slot book ho gaya! Details Abhinandan ke mail par bhej di gayi hain.", "ok");
      form.reset();
    } catch {
      setStatus("Network issue aaya — please thodi der baad try karein ya directly mail karein.", "err");
    } finally {
      submitBtn.disabled = false;
    }
  });

  updateFields();
  renderDates();
  renderSlots();
})();