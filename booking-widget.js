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

  // Comprehensive World Country Codes: [ISO, Name, DialCode, minDigits?, maxDigits?]
  const COUNTRIES = [
    ["IN","India","+91",10,10],
    ["US","United States","+1",10,10],
    ["GB","United Kingdom","+44",10,10],
    ["CA","Canada","+1",10,10],
    ["AU","Australia","+61",9,9],
    ["AE","United Arab Emirates","+971",9,9],
    ["SG","Singapore","+65",8,8],
    ["DE","Germany","+49",7,12],
    ["AF","Afghanistan","+93",9,9],
    ["AL","Albania","+355",8,9],
    ["DZ","Algeria","+213",9,9],
    ["AD","Andorra","+376",6,9],
    ["AO","Angola","+244",9,9],
    ["AG","Antigua and Barbuda","+1-268",7,7],
    ["AR","Argentina","+54",10,11],
    ["AM","Armenia","+374",8,8],
    ["AT","Austria","+43",7,13],
    ["AZ","Azerbaijan","+994",9,9],
    ["BS","Bahamas","+1-242",7,7],
    ["BH","Bahrain","+973",8,8],
    ["BD","Bangladesh","+880",10,10],
    ["BB","Barbados","+1-246",7,7],
    ["BY","Belarus","+375",9,9],
    ["BE","Belgium","+32",8,9],
    ["BZ","Belize","+501",7,7],
    ["BJ","Benin","+229",8,8],
    ["BT","Bhutan","+975",8,8],
    ["BO","Bolivia","+591",8,8],
    ["BA","Bosnia and Herzegovina","+387",8,9],
    ["BW","Botswana","+267",7,8],
    ["BR","Brazil","+55",10,11],
    ["BN","Brunei","+673",7,7],
    ["BG","Bulgaria","+359",8,9],
    ["BF","Burkina Faso","+226",8,8],
    ["BI","Burundi","+257",8,8],
    ["CV","Cabo Verde","+238",7,7],
    ["KH","Cambodia","+855",8,9],
    ["CM","Cameroon","+237",9,9],
    ["CF","Central African Republic","+236",8,8],
    ["TD","Chad","+235",8,8],
    ["CL","Chile","+56",9,9],
    ["CN","China","+86",11,11],
    ["CO","Colombia","+57",10,10],
    ["KM","Comoros","+269",7,7],
    ["CG","Congo","+242",9,9],
    ["CD","Congo (DRC)","+243",9,9],
    ["CR","Costa Rica","+506",8,8],
    ["CI","Cote d'Ivoire","+225",10,10],
    ["HR","Croatia","+385",8,9],
    ["CU","Cuba","+53",8,8],
    ["CY","Cyprus","+357",8,8],
    ["CZ","Czechia","+420",9,9],
    ["DK","Denmark","+45",8,8],
    ["DJ","Djibouti","+253",8,8],
    ["DM","Dominica","+1-767",7,7],
    ["DO","Dominican Republic","+1-809",7,10],
    ["EC","Ecuador","+593",9,9],
    ["EG","Egypt","+20",10,10],
    ["SV","El Salvador","+503",8,8],
    ["GQ","Equatorial Guinea","+240",9,9],
    ["ER","Eritrea","+291",7,7],
    ["EE","Estonia","+372",7,8],
    ["SZ","Eswatini","+268",8,8],
    ["ET","Ethiopia","+251",9,9],
    ["FJ","Fiji","+679",7,7],
    ["FI","Finland","+358",7,11],
    ["FR","France","+33",9,9],
    ["GA","Gabon","+241",7,8],
    ["GM","Gambia","+220",7,7],
    ["GE","Georgia","+995",9,9],
    ["GH","Ghana","+233",9,9],
    ["GR","Greece","+30",10,10],
    ["GD","Grenada","+1-473",7,7],
    ["GT","Guatemala","+502",8,8],
    ["GN","Guinea","+224",9,9],
    ["GW","Guinea-Bissau","+245",7,9],
    ["GY","Guyana","+592",7,7],
    ["HT","Haiti","+509",8,8],
    ["HN","Honduras","+504",8,8],
    ["HK","Hong Kong","+852",8,8],
    ["HU","Hungary","+36",8,9],
    ["IS","Iceland","+354",7,7],
    ["ID","Indonesia","+62",9,12],
    ["IR","Iran","+98",10,10],
    ["IQ","Iraq","+964",10,10],
    ["IE","Ireland","+353",9,9],
    ["IL","Israel","+972",9,9],
    ["IT","Italy","+39",9,11],
    ["JM","Jamaica","+1-876",7,7],
    ["JP","Japan","+81",10,10],
    ["JO","Jordan","+962",9,9],
    ["KZ","Kazakhstan","+7",10,10],
    ["KE","Kenya","+254",9,9],
    ["KI","Kiribati","+686",5,8],
    ["KP","North Korea","+850",8,10],
    ["KR","South Korea","+82",9,11],
    ["KW","Kuwait","+965",8,8],
    ["KG","Kyrgyzstan","+996",9,9],
    ["LA","Laos","+856",8,10],
    ["LV","Latvia","+371",8,8],
    ["LB","Lebanon","+961",7,8],
    ["LS","Lesotho","+266",8,8],
    ["LR","Liberia","+231",7,9],
    ["LY","Libya","+218",9,9],
    ["LI","Liechtenstein","+423",7,9],
    ["LT","Lithuania","+370",8,8],
    ["LU","Luxembourg","+352",8,11],
    ["MO","Macau","+853",8,8],
    ["MG","Madagascar","+261",9,9],
    ["MW","Malawi","+265",7,9],
    ["MY","Malaysia","+60",9,10],
    ["MV","Maldives","+960",7,7],
    ["ML","Mali","+223",8,8],
    ["MT","Malta","+356",8,8],
    ["MH","Marshall Islands","+692",7,7],
    ["MR","Mauritania","+222",8,8],
    ["MU","Mauritius","+230",7,8],
    ["MX","Mexico","+52",10,10],
    ["FM","Micronesia","+691",7,7],
    ["MD","Moldova","+373",8,8],
    ["MC","Monaco","+377",8,9],
    ["MN","Mongolia","+976",8,8],
    ["ME","Montenegro","+382",8,8],
    ["MA","Morocco","+212",9,9],
    ["MZ","Mozambique","+258",9,9],
    ["MM","Myanmar","+95",7,10],
    ["NA","Namibia","+264",8,9],
    ["NR","Nauru","+674",7,7],
    ["NP","Nepal","+977",10,10],
    ["NL","Netherlands","+31",9,9],
    ["NZ","New Zealand","+64",8,10],
    ["NI","Nicaragua","+505",8,8],
    ["NE","Niger","+227",8,8],
    ["NG","Nigeria","+234",10,10],
    ["MK","North Macedonia","+389",8,8],
    ["NO","Norway","+47",8,8],
    ["OM","Oman","+968",8,8],
    ["PK","Pakistan","+92",10,10],
    ["PW","Palau","+680",7,7],
    ["PS","Palestine","+970",9,9],
    ["PA","Panama","+507",8,8],
    ["PG","Papua New Guinea","+675",7,8],
    ["PY","Paraguay","+595",9,9],
    ["PE","Peru","+51",9,9],
    ["PH","Philippines","+63",10,10],
    ["PL","Poland","+48",9,9],
    ["PT","Portugal","+351",9,9],
    ["PR","Puerto Rico","+1-787",7,10],
    ["QA","Qatar","+974",8,8],
    ["RO","Romania","+40",9,9],
    ["RU","Russia","+7",10,10],
    ["RW","Rwanda","+250",9,9],
    ["KN","Saint Kitts and Nevis","+1-869",7,7],
    ["LC","Saint Lucia","+1-758",7,7],
    ["VC","Saint Vincent and the Grenadines","+1-784",7,7],
    ["WS","Samoa","+685",6,7],
    ["SM","San Marino","+378",6,10],
    ["ST","Sao Tome and Principe","+239",7,7],
    ["SA","Saudi Arabia","+966",9,9],
    ["SN","Senegal","+221",9,9],
    ["RS","Serbia","+381",8,9],
    ["SC","Seychelles","+248",7,7],
    ["SL","Sierra Leone","+232",8,8],
    ["SK","Slovakia","+421",9,9],
    ["SI","Slovenia","+386",8,8],
    ["SB","Solomon Islands","+677",5,7],
    ["SO","Somalia","+252",8,9],
    ["ZA","South Africa","+27",9,9],
    ["SS","South Sudan","+211",9,9],
    ["ES","Spain","+34",9,9],
    ["LK","Sri Lanka","+94",9,9],
    ["SD","Sudan","+249",9,9],
    ["SR","Suriname","+597",6,7],
    ["SE","Sweden","+46",7,10],
    ["CH","Switzerland","+41",9,9],
    ["SY","Syria","+963",9,9],
    ["TW","Taiwan","+886",9,9],
    ["TJ","Tajikistan","+992",9,9],
    ["TZ","Tanzania","+255",9,9],
    ["TH","Thailand","+66",9,9],
    ["TL","Timor-Leste","+670",7,8],
    ["TG","Togo","+228",8,8],
    ["TO","Tonga","+676",5,7],
    ["TT","Trinidad and Tobago","+1-868",7,7],
    ["TN","Tunisia","+216",8,8],
    ["TR","Turkey","+90",10,10],
    ["TM","Turkmenistan","+993",8,8],
    ["TV","Tuvalu","+688",5,6],
    ["UG","Uganda","+256",9,9],
    ["UA","Ukraine","+380",9,9],
    ["UY","Uruguay","+598",8,8],
    ["UZ","Uzbekistan","+998",9,9],
    ["VU","Vanuatu","+678",5,7],
    ["VA","Vatican City","+379",6,10],
    ["VE","Venezuela","+58",10,10],
    ["VN","Vietnam","+84",9,10],
    ["YE","Yemen","+967",9,9],
    ["ZM","Zambia","+260",9,9],
    ["ZW","Zimbabwe","+263",9,9]
  ].map(([iso, name, dial, min = 6, max = 14]) => ({ iso, name, dial, min, max }));

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

    /* Compact Floating Booking Popup (Fixed Top Bar + Scrollable Body) */
    .abhi-book-popup {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      z-index: 2147483644 !important;
      width: 470px;
      max-width: calc(100vw - 24px);
      max-height: 84vh;
      display: none;
      flex-direction: column;
      overflow: hidden;
      background: #0d0d11;
      border: 1px solid rgba(212, 175, 55, 0.55);
      border-radius: 14px;
      box-shadow: 0 18px 48px rgba(0, 0, 0, 0.88), 0 0 0 1px rgba(212, 175, 55, 0.15);
      font-family: 'JetBrains Mono', 'Space Mono', monospace;
      color: #f4f4f5;
      text-align: left;
      cursor: default !important;
      pointer-events: auto !important;
      box-sizing: border-box;
    }
    .abhi-book-popup.open {
      display: flex;
    }

    /* Pinned Header Bar so Close X is ALWAYS visible */
    .abhi-popup-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 0.78rem 1rem 0.68rem 1.2rem;
      background: #0d0d11;
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
      flex-shrink: 0;
    }

    .abhi-popup-body {
      overflow-y: auto;
      padding: 1rem 1.2rem 1.25rem;
      flex: 1;
      scrollbar-width: thin;
      scrollbar-color: #d4af37 #09090b;
    }

    /* Gold Slider + Black Track Scrollbar */
    .abhi-popup-body::-webkit-scrollbar,
    .abhi-date-strip::-webkit-scrollbar,
    .abhi-cc-list::-webkit-scrollbar,
    .abhi-book-popup textarea::-webkit-scrollbar {
      width: 7px;
      height: 6px;
    }
    .abhi-popup-body::-webkit-scrollbar-track,
    .abhi-date-strip::-webkit-scrollbar-track,
    .abhi-cc-list::-webkit-scrollbar-track,
    .abhi-book-popup textarea::-webkit-scrollbar-track {
      background: #09090b;
      border-radius: 999px;
    }
    .abhi-popup-body::-webkit-scrollbar-thumb,
    .abhi-date-strip::-webkit-scrollbar-thumb,
    .abhi-cc-list::-webkit-scrollbar-thumb,
    .abhi-book-popup textarea::-webkit-scrollbar-thumb {
      background: #d4af37;
      border-radius: 999px;
      border: 1px solid #09090b;
    }
    .abhi-popup-body::-webkit-scrollbar-thumb:hover,
    .abhi-date-strip::-webkit-scrollbar-thumb:hover,
    .abhi-cc-list::-webkit-scrollbar-thumb:hover,
    .abhi-book-popup textarea::-webkit-scrollbar-thumb:hover {
      background: #f5c542;
    }
    .abhi-popup-body::-webkit-scrollbar-corner,
    .abhi-date-strip::-webkit-scrollbar-corner {
      background: #09090b;
    }

    .abhi-modal-close {
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      border-radius: 8px;
      border: 1px solid rgba(212, 175, 55, 0.45);
      background: #16161b;
      color: #f5c542;
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 1;
      cursor: pointer !important;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    .abhi-modal-close:hover {
      background: #d4af37;
      color: #09090b;
    }
    .abhi-badge {
      display: inline-block;
      font-size: 0.62rem;
      letter-spacing: 0.08em;
      color: #d4af37;
      border: 1px solid rgba(212, 175, 55, 0.4);
      padding: 0.2rem 0.58rem;
      border-radius: 999px;
    }
    .abhi-book-popup h2 {
      margin: 0 0 0.35rem;
      font-size: 1.06rem;
      color: #f5c542;
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
    .abhi-form { display: flex; flex-direction: column; gap: 0.72rem; margin-top: 0.7rem; }
    .abhi-field { position: relative; }
    .abhi-field label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 0.7rem;
      color: #d4d4d8;
      margin-bottom: 0.25rem;
    }
    .abhi-tag-req {
      color: #ef4444;
      font-weight: 700;
      font-size: 0.68rem;
      letter-spacing: 0.02em;
    }
    .abhi-tag-opt {
      color: #4ade80;
      font-weight: 700;
      font-size: 0.68rem;
      letter-spacing: 0.02em;
    }
    .abhi-contact-note {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 0.48rem 0.65rem;
      border-radius: 7px;
      background: rgba(212, 175, 55, 0.08);
      border: 1px solid rgba(212, 175, 55, 0.3);
      font-size: 0.67rem;
      line-height: 1.4;
      color: #e4e4e7;
    }
    .abhi-contact-note.err {
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
      color: #fca5a5;
    }

    /* Country Code Picker + Adjacent Phone Input */
    .abhi-phone-row {
      display: flex;
      gap: 0.45rem;
      align-items: stretch;
    }
    .abhi-cc-wrap {
      position: relative;
      flex-shrink: 0;
    }
    .abhi-cc-btn {
      height: 100%;
      min-width: 108px;
      padding: 0.52rem 0.6rem;
      background: #09090b;
      border: 1px solid #2e2e36;
      border-radius: 7px;
      color: #f5c542;
      font-family: inherit;
      font-size: 0.74rem;
      font-weight: 700;
      cursor: pointer !important;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      white-space: nowrap;
    }
    .abhi-cc-btn:hover { border-color: #d4af37; }
    .abhi-cc-btn.placeholder { color: #9ca3af; font-weight: 400; }

    .abhi-cc-menu {
      position: absolute;
      top: calc(100% + 5px);
      left: 0;
      width: 280px;
      max-width: calc(100vw - 64px);
      background: #0b0b0f;
      border: 1px solid rgba(212, 175, 55, 0.55);
      border-radius: 9px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.9);
      z-index: 40;
      display: none;
      flex-direction: column;
      overflow: hidden;
    }
    .abhi-cc-menu.open { display: flex; }
    .abhi-cc-search {
      width: 100%;
      box-sizing: border-box;
      border: none;
      border-bottom: 1px solid rgba(212, 175, 55, 0.25);
      background: #121218;
      color: #fff;
      font-family: inherit;
      font-size: 0.72rem;
      padding: 0.5rem 0.65rem;
      outline: none;
      cursor: text !important;
    }
    .abhi-cc-list {
      max-height: 180px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #d4af37 #09090b;
    }
    .abhi-cc-item {
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      padding: 0.45rem 0.65rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      color: #e4e4e7;
      font-family: inherit;
      font-size: 0.71rem;
      text-align: left;
      cursor: pointer !important;
    }
    .abhi-cc-item:hover, .abhi-cc-item.selected {
      background: rgba(212, 175, 55, 0.16);
      color: #f5c542;
    }
    .abhi-cc-dial {
      color: #f5c542;
      font-weight: 700;
      flex-shrink: 0;
    }
    .abhi-cc-empty {
      padding: 0.65rem;
      font-size: 0.7rem;
      color: #9ca3af;
      text-align: center;
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
      transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;
    }
    .abhi-field input:focus, .abhi-field textarea:focus {
      outline: none;
      border-color: #f5c542;
    }

    /* Strict Red Error State for Inputs & Text */
    .abhi-input-error {
      border-color: #ef4444 !important;
      color: #f87171 !important;
      background: rgba(239, 68, 68, 0.08) !important;
    }
    .abhi-input-error::placeholder {
      color: rgba(248, 113, 113, 0.65) !important;
    }
    .abhi-field-err {
      display: none;
      margin-top: 0.28rem;
      font-size: 0.67rem;
      line-height: 1.35;
      color: #ef4444;
      font-weight: 600;
    }
    .abhi-field-err.show {
      display: block;
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
    .abhi-status.err { color: #ef4444; font-weight: 600; }

    /* Confirmation View with Live Countdown */
    .abhi-success-box {
      display: none;
      text-align: center;
      padding: 1.25rem 0.4rem 0.45rem;
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
      .abhi-book-popup { width: calc(100vw - 20px); max-height: 84vh; }
      .abhi-cc-btn { min-width: 96px; font-size: 0.7rem; }
    }
  `;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "abhiBookingRoot";
  document.body.appendChild(root);

  // 2. Compact Floating Booking Popup (Pinned Close Button + Scrollable Body)
  const popupWindow = document.createElement("div");
  popupWindow.className = "abhi-book-popup";
  popupWindow.id = "abhiBookPopup";
  popupWindow.setAttribute("role", "dialog");
  popupWindow.setAttribute("aria-labelledby", "abhiModalTitle");
  popupWindow.innerHTML = `
    <div class="abhi-popup-topbar">
      <span class="abhi-badge">DAILY • 10 AM–3 PM &amp; 8 PM–12 AM IST</span>
      <button type="button" class="abhi-modal-close" id="abhiModalCloseTop" aria-label="Close booking popup">&times;</button>
    </div>

    <div class="abhi-popup-body">
      <div id="abhiFormView">
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

          <div class="abhi-field" id="abhiNameWrap">
            <label for="abhiName">
              <span>Full Name</span>
              <span class="abhi-tag-req">Required *</span>
            </label>
            <input type="text" id="abhiName" placeholder="Your full name" maxlength="80" autocomplete="name">
            <div class="abhi-field-err" id="abhiNameErr"></div>
          </div>

          <div class="abhi-contact-note" id="abhiContactNote">
            <span>Provide at least one contact method: Phone Number or Email.</span>
            <span class="abhi-tag-req" style="flex-shrink:0;">Required *</span>
          </div>

          <div class="abhi-field" id="abhiPhoneWrap">
            <label for="abhiPhone">
              <span>WhatsApp / Phone Number</span>
              <span class="abhi-tag-req">Phone or Email *</span>
            </label>
            <div class="abhi-phone-row">
              <div class="abhi-cc-wrap">
                <button type="button" class="abhi-cc-btn placeholder" id="abhiCcBtn" aria-haspopup="listbox" aria-expanded="false">
                  <span id="abhiCcLabel">Code</span>
                  <span>&#9662;</span>
                </button>
                <div class="abhi-cc-menu" id="abhiCcMenu" role="listbox">
                  <input type="text" class="abhi-cc-search" id="abhiCcSearch" placeholder="Search country or +code...">
                  <div class="abhi-cc-list" id="abhiCcList"></div>
                </div>
              </div>
              <input type="tel" id="abhiPhone" placeholder="Enter local phone number" maxlength="15" inputmode="numeric" autocomplete="tel-national">
            </div>
            <div class="abhi-field-err" id="abhiPhoneErr"></div>
          </div>

          <div class="abhi-field" id="abhiEmailWrap">
            <label for="abhiEmail">
              <span>Email Address</span>
              <span class="abhi-tag-req">Phone or Email *</span>
            </label>
            <input type="email" id="abhiEmail" placeholder="you@example.com" maxlength="100" autocomplete="email">
            <div class="abhi-field-err" id="abhiEmailErr"></div>
          </div>

          <div class="abhi-field" id="abhiReasonWrap">
            <label for="abhiReason">
              <span>Reason for Contact</span>
              <span class="abhi-tag-opt">Optional</span>
            </label>
            <textarea id="abhiReason" rows="2" placeholder="Briefly share what you would like to discuss..." maxlength="400"></textarea>
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
  root.appendChild(popupWindow);

  let closeTimer = null;
  let dockEl = null;

  // Booking State
  const state = {
    mode: "WhatsApp Chat",
    dateISO: "",
    dateLabel: "",
    timeSlot: "",
    country: null
  };

  const modeGrid = popupWindow.querySelector("#abhiModeGrid");
  const dateStrip = popupWindow.querySelector("#abhiDateStrip");
  const slotContainer = popupWindow.querySelector("#abhiSlotContainer");
  const form = popupWindow.querySelector("#abhiBookingForm");
  const statusEl = popupWindow.querySelector("#abhiStatus");
  const contactNote = popupWindow.querySelector("#abhiContactNote");

  const nameInput = popupWindow.querySelector("#abhiName");
  const nameErr = popupWindow.querySelector("#abhiNameErr");
  const phoneInput = popupWindow.querySelector("#abhiPhone");
  const phoneErr = popupWindow.querySelector("#abhiPhoneErr");
  const emailInput = popupWindow.querySelector("#abhiEmail");
  const emailErr = popupWindow.querySelector("#abhiEmailErr");

  const ccBtn = popupWindow.querySelector("#abhiCcBtn");
  const ccLabel = popupWindow.querySelector("#abhiCcLabel");
  const ccMenu = popupWindow.querySelector("#abhiCcMenu");
  const ccSearch = popupWindow.querySelector("#abhiCcSearch");
  const ccList = popupWindow.querySelector("#abhiCcList");

  function setStatus(msg, cls) {
    statusEl.textContent = msg;
    statusEl.className = "abhi-status " + (cls || "");
  }

  function setFieldError(elements, errEl, msg) {
    const list = Array.isArray(elements) ? elements : [elements];
    if (msg) {
      list.forEach((el) => el.classList.add("abhi-input-error"));
      errEl.textContent = msg;
      errEl.classList.add("show");
    } else {
      list.forEach((el) => el.classList.remove("abhi-input-error"));
      errEl.textContent = "";
      errEl.classList.remove("show");
    }
  }

  function clearAllErrors() {
    setFieldError(nameInput, nameErr, "");
    setFieldError([ccBtn, phoneInput], phoneErr, "");
    setFieldError(emailInput, emailErr, "");
    contactNote.classList.remove("err");
    setStatus("", "");
  }

  function closeCountryMenu() {
    ccMenu.classList.remove("open");
    ccBtn.setAttribute("aria-expanded", "false");
  }

  function renderCountryList(query = "") {
    const q = query.trim().toLowerCase();
    const filtered = COUNTRIES.filter((c) => {
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        c.dial.toLowerCase().includes(q) ||
        c.dial.replace(/[^0-9]/g, "").includes(q.replace(/[^0-9]/g, "") || "__nomatch__")
      );
    });

    ccList.innerHTML = "";
    if (!filtered.length) {
      ccList.innerHTML = `<div class="abhi-cc-empty">No matching country found</div>`;
      return;
    }

    const frag = document.createDocumentFragment();
    filtered.forEach((c) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "abhi-cc-item" + (state.country && state.country.iso === c.iso ? " selected" : "");
      item.innerHTML = `<span>${c.name} (${c.iso})</span><span class="abhi-cc-dial">${c.dial}</span>`;
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        state.country = c;
        ccLabel.textContent = `${c.iso} ${c.dial}`;
        ccBtn.classList.remove("placeholder");
        closeCountryMenu();
        validatePhoneField(false);
        phoneInput.focus();
      });
      frag.appendChild(item);
    });
    ccList.appendChild(frag);
  }

  ccBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = ccMenu.classList.contains("open");
    if (isOpen) {
      closeCountryMenu();
    } else {
      ccSearch.value = "";
      renderCountryList("");
      ccMenu.classList.add("open");
      ccBtn.setAttribute("aria-expanded", "true");
      setTimeout(() => {
        ccSearch.focus();
        ccMenu.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }, 20);
    }
  });

  ccSearch.addEventListener("input", () => renderCountryList(ccSearch.value));
  ccMenu.addEventListener("click", (e) => e.stopPropagation());

  function validateNameField() {
    const val = nameInput.value.trim();
    if (val.length < 2) {
      setFieldError(nameInput, nameErr, "Full Name is required (at least 2 characters).");
      return false;
    }
    setFieldError(nameInput, nameErr, "");
    return true;
  }

  function validatePhoneField(isSubmit) {
    const raw = phoneInput.value.trim();
    const hasCountry = Boolean(state.country);

    if (!raw) {
      if (hasCountry && isSubmit && !emailInput.value.trim()) {
        setFieldError(phoneInput, phoneErr, "Please enter your phone number for the selected country code.");
        return { valid: false, provided: false };
      }
      setFieldError([ccBtn, phoneInput], phoneErr, "");
      return { valid: true, provided: false };
    }

    if (raw.includes("+")) {
      setFieldError(phoneInput, phoneErr, "Select country code on the left and enter only the local number here.");
      return { valid: false, provided: true };
    }

    if (/[^\d\s-]/.test(raw)) {
      setFieldError(phoneInput, phoneErr, "Phone number must contain digits only.");
      return { valid: false, provided: true };
    }

    const digits = raw.replace(/\D/g, "");

    if (!hasCountry) {
      setFieldError([ccBtn, phoneInput], phoneErr, "Please select a country code before submitting your phone number.");
      return { valid: false, provided: true };
    }

    const { name, dial, min, max } = state.country;
    if (digits.length < min || digits.length > max) {
      const expected = min === max ? `${min} digits` : `${min}-${max} digits`;
      setFieldError(phoneInput, phoneErr, `Incomplete or invalid number: ${name} (${dial}) requires ${expected}.`);
      ccBtn.classList.remove("abhi-input-error");
      return { valid: false, provided: true };
    }

    setFieldError([ccBtn, phoneInput], phoneErr, "");
    return { valid: true, provided: true, formatted: `${dial} ${digits}` };
  }

  function validateEmailField() {
    const raw = emailInput.value.trim();
    if (!raw) {
      setFieldError(emailInput, emailErr, "");
      return { valid: true, provided: false };
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(raw)) {
      setFieldError(emailInput, emailErr, "Invalid email format. Example: name@example.com");
      return { valid: false, provided: true };
    }

    setFieldError(emailInput, emailErr, "");
    return { valid: true, provided: true, value: raw };
  }

  // Real-time validation on typing & blur
  nameInput.addEventListener("input", () => {
    if (nameErr.classList.contains("show")) validateNameField();
  });
  nameInput.addEventListener("blur", validateNameField);

  phoneInput.addEventListener("input", () => {
    contactNote.classList.remove("err");
    validatePhoneField(false);
  });
  phoneInput.addEventListener("blur", () => validatePhoneField(false));

  emailInput.addEventListener("input", () => {
    contactNote.classList.remove("err");
    validateEmailField();
  });
  emailInput.addEventListener("blur", validateEmailField);

  function clearCountdown() {
    if (closeTimer) {
      clearInterval(closeTimer);
      closeTimer = null;
    }
  }

  function resetCountryState() {
    state.country = null;
    ccLabel.textContent = "Code";
    ccBtn.classList.add("placeholder");
    closeCountryMenu();
  }

  function resetToFormView() {
    clearCountdown();
    popupWindow.querySelector("#abhiSuccessView").classList.remove("active");
    popupWindow.querySelector("#abhiFormView").style.display = "block";
    popupWindow.querySelector(".abhi-popup-body").scrollTop = 0;
    clearAllErrors();
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
    closeCountryMenu();
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
  popupWindow.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!e.target.closest(".abhi-cc-wrap")) closeCountryMenu();
  });

  document.addEventListener("click", (e) => {
    if (popupWindow.classList.contains("open") && !popupWindow.contains(e.target)) {
      closeBookingPopup();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (ccMenu.classList.contains("open")) {
        closeCountryMenu();
      } else if (popupWindow.classList.contains("open")) {
        closeBookingPopup();
      }
    }
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

  // 5. Date & Slot Renderers
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
  });

  // 6. Strict Submit Handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (popupWindow.querySelector("#abhiHp").value.trim()) return;

    contactNote.classList.remove("err");
    setStatus("", "");

    if (!state.dateISO || !state.timeSlot) {
      setStatus("Please select a date and time slot first.", "err");
      return;
    }

    const nameOk = validateNameField();
    const phoneCheck = validatePhoneField(true);
    const emailCheck = validateEmailField();

    const hasValidContact = (phoneCheck.provided && phoneCheck.valid) || (emailCheck.provided && emailCheck.valid);

    if (!phoneCheck.provided && !emailCheck.provided) {
      contactNote.classList.add("err");
      setFieldError([ccBtn, phoneInput], phoneErr, "Enter a phone number with country code, or provide your email below.");
      setFieldError(emailInput, emailErr, "Enter a valid email address, or provide your phone number above.");
      setStatus("At least one contact method (Phone Number or Email) is mandatory.", "err");
      return;
    }

    if (!nameOk || !phoneCheck.valid || !emailCheck.valid || !hasValidContact) {
      setStatus("Please fix the highlighted red fields before submitting.", "err");
      const firstErr = popupWindow.querySelector(".abhi-input-error");
      if (firstErr) firstErr.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    const name = nameInput.value.trim();
    const reason = popupWindow.querySelector("#abhiReason").value.trim();

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
          Full_Name: name,
          Country: state.country ? `${state.country.name} (${state.country.dial})` : "N/A",
          Phone_or_WhatsApp: phoneCheck.provided ? phoneCheck.formatted : "N/A",
          Visitor_Email: emailCheck.provided ? emailCheck.value : "N/A",
          Reason: reason || "N/A"
        })
      });

      if (!res.ok) throw new Error("Request failed");

      popupWindow.querySelector("#abhiSuccessSummary").textContent =
        `Your ${state.mode} request for ${state.dateLabel} at ${state.timeSlot} IST has been sent. You will receive a confirmation shortly.`;
      popupWindow.querySelector("#abhiFormView").style.display = "none";
      popupWindow.querySelector("#abhiSuccessView").classList.add("active");
      popupWindow.querySelector(".abhi-popup-body").scrollTop = 0;
      form.reset();
      resetCountryState();
      clearAllErrors();
      state.timeSlot = "";
      renderSlots();
      startCloseCountdown();
    } catch {
      setStatus("Unable to submit right now. Please try again in a moment.", "err");
    } finally {
      submitBtn.disabled = false;
    }
  });

  renderDates();
  renderSlots();
  elevateCustomCursors();
  setTimeout(elevateCustomCursors, 800);
})();