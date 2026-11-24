(() => {
  if (document.getElementById("abhiBookingRoot")) return;

  const TARGET_EMAIL = "2e12a1319feb24ee5d95f8e4e30bca31";
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

  const ROBOT_SVG = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="2.5" x2="12" y2="5.5" stroke="#f5c542" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="12" cy="2" r="1.4" fill="#f5c542"/>
      <rect x="4" y="6" width="16" height="13" rx="4" fill="#09090b" stroke="#f5c542" stroke-width="1.6"/>
      <circle cx="9.2" cy="11.5" r="1.5" fill="#f5c542"/>
      <circle cx="14.8" cy="11.5" r="1.5" fill="#f5c542"/>
      <path d="M9.3 15.2C10.1 16.2 13.9 16.2 14.7 15.2" stroke="#f5c542" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;

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
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      pointer-events: auto !important;
    }
    .abhi-nav-book-btn:hover {
      background: rgba(212, 175, 55, 0.24);
      border-color: #f5c542;
    }

    /* Desktop Bottom-Left Stack */
    .abhi-left-dock {
      position: fixed !important;
      left: 18px !important;
      bottom: 84px !important;
      z-index: 9000;
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
      cursor: pointer;
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
      cursor: pointer;
      padding: 2px 4px;
      pointer-events: auto !important;
    }
    .abhi-mini-close:hover { color: #f5c542; }

    /* Main Bottom-Left Connect Popup */
    .abhi-connect-card {
      pointer-events: auto !important;
      cursor: pointer;
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
      background: #f5c542;
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
      cursor: pointer;
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
      cursor: pointer;
      padding: 0 4px;
      pointer-events: auto !important;
    }
    .abhi-pill-close:hover { color: #fff; }

    /* Mobile-Only Dock (Option C: Scroll Trigger -> Option A: 5s Teaser -> Compact Mini Pill) */
    .abhi-mobile-dock {
      display: none;
      position: fixed !important;
      left: 14px !important;
      bottom: 84px !important;
      z-index: 9000;
      max-width: calc(100vw - 88px);
      pointer-events: none;
      font-family: 'JetBrains Mono', 'Space Mono', monospace;
      opacity: 0;
      transform: translateY(14px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .abhi-mobile-dock.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .abhi-mobile-teaser {
      pointer-events: auto !important;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      background: rgba(14, 14, 19, 0.94);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(212, 175, 55, 0.5);
      border-radius: 12px;
      padding: 8px 24px 8px 9px;
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.65);
      color: #d4d4d8;
      font-size: 0.68rem;
      line-height: 1.4;
      max-width: 270px;
    }
    .abhi-mobile-teaser strong { color: #f5c542; }
    .abhi-mobile-pill {
      pointer-events: auto !important;
      cursor: pointer;
      display: none;
      align-items: center;
      gap: 7px;
      padding: 7px 12px 7px 8px;
      border-radius: 999px;
      background: rgba(14, 14, 19, 0.92);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(212, 175, 55, 0.55);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.65);
      color: #f5c542;
      font-family: inherit;
      font-size: 0.72rem;
      font-weight: 700;
    }
    .abhi-mobile-dock.compact .abhi-mobile-teaser { display: none; }
    .abhi-mobile-dock.compact .abhi-mobile-pill { display: inline-flex; }

    /* Mobile Header Fix: Header scrolls away, ONLY hamburger stays fixed top-right */
    @media (max-width: 768px) {
      .abhi-left-dock { display: none !important; }
      .abhi-mobile-dock { display: block; }
      .abhi-mobile-unstick {
        position: relative !important;
        top: auto !important;
        transform: none !important;
        filter: none !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        will-change: auto !important;
        contain: none !important;
      }
      .abhi-mobile-hamburger-pin {
        position: fixed !important;
        top: 14px !important;
        right: 16px !important;
        z-index: 9020 !important;
        background: rgba(12, 12, 16, 0.85) !important;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(212, 175, 55, 0.45) !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.55);
      }
    }

    /* Compact Floating Booking Popup (Fixed Top Bar + Scrollable Body) */
    .abhi-book-popup {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      z-index: 9010;
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
      pointer-events: auto !important;
      box-sizing: border-box;
    }
    .abhi-book-popup.open {
      display: flex;
    }

    /* If portfolio hides native OS cursor, match it seamlessly across our widget */
    body.abhi-hide-native-cursor #abhiBookingRoot,
    body.abhi-hide-native-cursor #abhiBookingRoot *,
    body.abhi-hide-native-cursor .abhi-nav-book-btn {
      cursor: none !important;
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
      cursor: pointer;
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
      cursor: pointer;
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
      cursor: not-allowed;
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
      cursor: pointer;
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
      cursor: text;
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
      cursor: pointer;
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
      cursor: text;
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
      cursor: pointer;
    }
    .abhi-submit-btn:disabled { opacity: 0.6; cursor: wait; }
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
      cursor: pointer;
    }

    @media (max-width: 600px) {
      .abhi-book-popup { width: calc(100vw - 20px); max-height: 84vh; }
      .abhi-cc-btn { min-width: 96px; font-size: 0.7rem; }
    }
  `;
  document.head.appendChild(style);

  // Mobile Header Adjustment: Unstick top bar & pin ONLY the hamburger button
  function setupMobileHeader() {
    const header = document.querySelector("header") || document.querySelector("nav");
    if (!header) return;
    header.classList.add("abhi-mobile-unstick");
    const innerNav = header.querySelector("nav");
    if (innerNav) innerNav.classList.add("abhi-mobile-unstick");

    const hamburger =
      header.querySelector('button[aria-label*="menu" i], button[aria-label*="nav" i], [class*="hamburger" i], [id*="hamburger" i], [class*="menu-toggle" i], [id*="menu-toggle" i], [class*="mobile-menu" i]') ||
      Array.from(header.querySelectorAll("button, [role='button'], .menu-btn, .nav-toggle")).find((b) => !b.classList.contains("abhi-nav-book-btn"));

    if (hamburger) {
      hamburger.classList.add("abhi-mobile-hamburger-pin");
    }
  }

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
          <p class="abhi-privacy-note">Details are sent only to Abhinandan via FormSubmit and not stored on this site.</p>
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
  let mobileDockEl = null;

  // Smart Z-Index & Custom Animated Cursor Layering
  function getApkBarZIndex() {
    let apkZ = 0;
    document.querySelectorAll("div, section, aside, footer, header").forEach((el) => {
      if (el.closest("#abhiBookingRoot")) return;
      const cs = window.getComputedStyle(el);
      if (cs.position === "fixed") {
        const txt = (el.textContent || "").toLowerCase();
        if (txt.includes("native android app") || txt.includes("download apk")) {
          const z = parseInt(cs.zIndex, 10);
          if (!Number.isNaN(z) && z > apkZ) apkZ = z;
        }
      }
    });
    return apkZ;
  }

  function syncCursorLayer(mouseX, mouseY) {
    const apkZ = getApkBarZIndex();
    const dockZ = Math.max(9000, apkZ + 5);
    const popupZ = dockZ + 10;

    if (dockEl) dockEl.style.setProperty("z-index", String(dockZ), "important");
    if (mobileDockEl) mobileDockEl.style.setProperty("z-index", String(dockZ), "important");
    popupWindow.style.setProperty("z-index", String(popupZ), "important");

    const bodyCursor = window.getComputedStyle(document.body).cursor;
    const htmlCursor = window.getComputedStyle(document.documentElement).cursor;
    if (bodyCursor === "none" || htmlCursor === "none") {
      document.body.classList.add("abhi-hide-native-cursor");
    }

    const cursorZ = String(popupZ + 100000);
    const all = document.body.querySelectorAll("*");
    for (let i = 0; i < all.length; i++) {
      const el = all[i];
      if (el.closest("#abhiBookingRoot")) continue;
      const cs = window.getComputedStyle(el);
      if (cs.position !== "fixed" && cs.position !== "absolute") continue;
      if (cs.pointerEvents !== "none") continue;

      const rect = el.getBoundingClientRect();
      const isSmallOverlay = rect.width <= 160 && rect.height <= 160 && (rect.width > 0 || rect.height > 0);
      const isZeroAnchor = rect.width === 0 && rect.height === 0;
      const tag = el.tagName;
      const idClass = `${el.id || ""} ${typeof el.className === "string" ? el.className : ""}`;
      const nameHint = /(cursor|cur|pointer|ring|dot|arrow|mouse|trail|follower)/i.test(idClass);
      const zVal = parseInt(cs.zIndex, 10) || 0;
      const aboveApk = (apkZ > 0 && zVal > apkZ) || zVal >= 9990;
      const nearMouse =
        typeof mouseX === "number" &&
        typeof mouseY === "number" &&
        (isSmallOverlay || isZeroAnchor) &&
        Math.abs(rect.left + rect.width / 2 - mouseX) < 120 &&
        Math.abs(rect.top + rect.height / 2 - mouseY) < 120;

      const isCursorCandidate =
        (cs.position === "fixed" && (isSmallOverlay || nameHint || aboveApk || nearMouse || (tag === "CANVAS" && aboveApk))) ||
        (cs.position === "absolute" && (nameHint || nearMouse) && (isSmallOverlay || isZeroAnchor));

      if (!isCursorCandidate) continue;
      if (tag === "CANVAS" && !nameHint && !aboveApk) continue;

      el.style.setProperty("z-index", cursorZ, "important");
      el.style.setProperty("pointer-events", "none", "important");

      let p = el.parentElement;
      while (p && p !== document.body) {
        const pcs = window.getComputedStyle(p);
        if (pcs.position === "fixed" && pcs.pointerEvents === "none") {
          p.style.setProperty("z-index", cursorZ, "important");
        }
        p = p.parentElement;
      }
    }
  }

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
    resetToFormView();
    popupWindow.classList.add("open");
    if (dockEl) dockEl.style.display = "none";
    if (mobileDockEl) mobileDockEl.style.visibility = "hidden";
    syncCursorLayer(e ? e.clientX : undefined, e ? e.clientY : undefined);
  }

  function closeBookingPopup() {
    clearCountdown();
    closeCountryMenu();
    popupWindow.classList.remove("open");
    resetToFormView();
    if (dockEl && !sessionStorage.getItem("abhiDockDismissed")) {
      dockEl.style.display = "flex";
    }
    if (mobileDockEl) mobileDockEl.style.visibility = "visible";
    syncCursorLayer();
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

  // 4A. Desktop Bottom-Left Dock
  if (!sessionStorage.getItem("abhiDockDismissed")) {
    dockEl = document.createElement("div");
    dockEl.className = "abhi-left-dock";

    if (!sessionStorage.getItem("abhiRobotTipDismissed")) {
      const robotTip = document.createElement("div");
      robotTip.className = "abhi-robot-tip";
      robotTip.innerHTML = `
        <div class="abhi-robot-face" aria-hidden="true">${ROBOT_SVG}</div>
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

  // 4B. Mobile-Only Dock (Option C: Scroll Trigger -> Option A: 5s Teaser -> Compact Mini Pill)
  mobileDockEl = document.createElement("div");
  mobileDockEl.className = "abhi-mobile-dock";
  if (sessionStorage.getItem("abhiMobileTeaserShown")) {
    mobileDockEl.classList.add("compact");
  }
  mobileDockEl.innerHTML = `
    <div class="abhi-mobile-teaser" id="abhiMobTeaser">
      <div class="abhi-robot-face" aria-hidden="true">${ROBOT_SVG}</div>
      <div>
        <strong>Did you know?</strong> Book a WhatsApp chat, call, or meet without hesitation — <strong>tap to book!</strong>
      </div>
      <button type="button" class="abhi-mini-close" id="abhiMobTeaserClose" aria-label="Minimize">&times;</button>
    </div>
    <button type="button" class="abhi-mobile-pill" id="abhiMobPill">
      <span class="abhi-robot-face" style="width:22px;height:22px;border-radius:50%;margin:0;" aria-hidden="true">${ROBOT_SVG}</span>
      <span>Book Call / Meet</span>
    </button>
  `;
  root.appendChild(mobileDockEl);

  let mobileTriggered = false;
  let mobileShrinkTimer = null;

  function shrinkMobileToPill() {
    if (mobileShrinkTimer) {
      clearTimeout(mobileShrinkTimer);
      mobileShrinkTimer = null;
    }
    mobileDockEl.classList.add("compact");
    sessionStorage.setItem("abhiMobileTeaserShown", "1");
  }

  mobileDockEl.querySelector("#abhiMobTeaser").addEventListener("click", (e) => {
    if (e.target.closest("#abhiMobTeaserClose")) return;
    shrinkMobileToPill();
    openBookingPopup(e);
  });
  mobileDockEl.querySelector("#abhiMobTeaserClose").addEventListener("click", (e) => {
    e.stopPropagation();
    shrinkMobileToPill();
  });
  mobileDockEl.querySelector("#abhiMobPill").addEventListener("click", openBookingPopup);

  function handleMobileScroll() {
    if (window.innerWidth > 768) return;
    if (window.scrollY >= 140) {
      mobileDockEl.classList.add("visible");
      if (!mobileTriggered) {
        mobileTriggered = true;
        if (!mobileDockEl.classList.contains("compact")) {
          mobileShrinkTimer = setTimeout(shrinkMobileToPill, 5000);
        }
      }
    } else if (!mobileTriggered) {
      mobileDockEl.classList.remove("visible");
    }
  }
  window.addEventListener("scroll", handleMobileScroll, { passive: true });

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
        const isNonIST = new Date().getTimezoneOffset() !== -330;
        if (isNonIST && state.dateISO) {
          const istBase = new Date(`${state.dateISO}T00:00:00+05:30`);
          const slotDate = new Date(istBase.getTime() + slot.hour * 3600000);
          const localTime = slotDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
          const tzShort = (slotDate.toLocaleTimeString([], { timeZoneName: "short" }).split(" ").pop() || "Local");
          btn.innerHTML = `<span>${slot.label}</span><small class="abhi-slot-local">${localTime} ${tzShort}</small>`;
        } else {
          btn.textContent = slot.label;
        }

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
          _honey: popupWindow.querySelector("#abhiHp").value || "",
          Visitor_Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
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

  setupMobileHeader();
  renderDates();
  renderSlots();
  syncCursorLayer();
  setTimeout(() => syncCursorLayer(), 600);
  setTimeout(() => syncCursorLayer(), 1800);
  window.addEventListener("mousemove", (e) => syncCursorLayer(e.clientX, e.clientY), { once: true });
})();

/* === ABHI COMPACT APK POPUP === */
(() => {
  if (document.getElementById("abhiApkFixStyle")) return;

  const ANDROID_SVG = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.6 9.48L19.44 6.3C19.6 6.02 19.5 5.66 19.22 5.5C18.94 5.34 18.58 5.44 18.42 5.72L16.54 8.96C15.16 8.33 13.62 7.98 12 7.98C10.38 7.98 8.84 8.33 7.46 8.96L5.58 5.72C5.42 5.44 5.06 5.34 4.78 5.5C4.5 5.66 4.4 6.02 4.56 6.3L6.4 9.48C3.86 10.88 2.15 13.43 2 16.4H22C21.85 13.43 20.14 10.88 17.6 9.48ZM8.5 13.8C7.95 13.8 7.5 13.35 7.5 12.8C7.5 12.25 7.95 11.8 8.5 11.8C9.05 11.8 9.5 12.25 9.5 12.8C9.5 13.35 9.05 13.8 8.5 13.8ZM15.5 13.8C14.95 13.8 14.5 13.35 14.5 12.8C14.5 12.25 14.95 11.8 15.5 11.8C16.05 11.8 16.5 12.25 16.5 12.8C16.5 13.35 16.05 13.8 15.5 13.8Z" fill="#f5c542"/>
    </svg>
  `;

  const style = document.createElement("style");
  style.id = "abhiApkFixStyle";
  style.textContent = `
    /* Force-hide the original full-width Native Android App bar */
    .abhi-hidden-orig-apk {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }

    /* Desktop dock: hidden in hero & Contact zone, fades in on scroll */
    .abhi-left-dock {
      bottom: 20px !important;
      opacity: 0;
      visibility: hidden;
      transform: translateY(14px);
      transition: opacity 0.28s ease, transform 0.28s ease, visibility 0.28s ease;
    }
    .abhi-left-dock.abhi-dock-show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    /* Mobile dock: hidden in hero & Contact zone, fades in on scroll */
    .abhi-mobile-dock {
      bottom: 20px !important;
      display: none;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      opacity: 0 !important;
      visibility: hidden !important;
      transform: translateY(14px) !important;
      transition: opacity 0.28s ease, transform 0.28s ease, visibility 0.28s ease;
    }
    .abhi-mobile-dock.abhi-dock-show {
      opacity: 1 !important;
      visibility: visible !important;
      transform: translateY(0) !important;
    }
    .abhi-left-dock:not(.abhi-dock-show) *,
    .abhi-mobile-dock:not(.abhi-dock-show) * {
      pointer-events: none !important;
    }

    /* Compact Get APK Pill (Same sleek style on Desktop & Mobile, stacked on LEFT) */
    .abhi-apk-pill {
      pointer-events: auto !important;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 11px 6px 8px;
      border-radius: 999px;
      background: rgba(14, 14, 19, 0.92);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(212, 175, 55, 0.5);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
      color: #f5c542;
      font-family: 'JetBrains Mono', 'Space Mono', monospace;
      font-size: 0.72rem;
      font-weight: 700;
      transition: border-color 0.2s ease, transform 0.2s ease;
    }
    .abhi-apk-pill:hover {
      border-color: #f5c542;
      transform: translateY(-1px);
    }
    .abhi-apk-pill-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(212, 175, 55, 0.14);
      border: 1px solid rgba(212, 175, 55, 0.4);
      flex-shrink: 0;
    }
    .abhi-apk-pill-close {
      background: transparent;
      border: none;
      color: #8b8b96;
      font-size: 0.9rem;
      line-height: 1;
      cursor: pointer;
      padding: 0 2px 0 4px;
      margin-left: 2px;
    }
    .abhi-apk-pill-close:hover { color: #fff; }

    body.abhi-hide-native-cursor .abhi-apk-pill,
    body.abhi-hide-native-cursor .abhi-apk-pill * {
      cursor: none !important;
    }

    @media (max-width: 768px) {
      .abhi-mobile-dock { display: flex !important; }

      /* Match Book Call / Meet inside mobile hamburger menu with other nav links */
      .abhi-nav-book-btn {
        display: flex !important;
        width: 100% !important;
        justify-content: flex-start !important;
        margin: 0 !important;
        padding: 14px 0 !important;
        border: none !important;
        border-radius: 0 !important;
        background: transparent !important;
        color: #a1a1aa !important;
        font-size: 0.85rem !important;
        font-weight: 400 !important;
        letter-spacing: 0.12em !important;
        text-transform: uppercase !important;
        box-shadow: none !important;
      }
      .abhi-nav-book-btn:hover,
      .abhi-nav-book-btn:active {
        background: transparent !important;
        color: #f5c542 !important;
      }
    }
  `;
  document.head.appendChild(style);

  let origActionEl = null;
  let origHref = "";
  let pillsInjected = false;

  function hideOriginalApkBar() {
    const all = document.querySelectorAll("div, section, aside, footer");
    for (const el of all) {
      if (el.closest("#abhiBookingRoot") || el.classList.contains("abhi-apk-pill")) continue;
      if (el === document.body || el === document.documentElement) continue;
      const cs = window.getComputedStyle(el);
      if (cs.position !== "fixed") continue;
      const txt = (el.textContent || "").toLowerCase();
      if (txt.includes("native android app") || txt.includes("download apk")) {
        const action = el.querySelector("a, button");
        if (action && !origActionEl) {
          origActionEl = action;
          if (action.tagName === "A" && action.href) origHref = action.href;
        }
        el.classList.add("abhi-hidden-orig-apk");
      }
    }
  }

  function createApkPill() {
    const pill = document.createElement("div");
    pill.className = "abhi-apk-pill";
    pill.setAttribute("role", "button");
    pill.setAttribute("tabindex", "0");
    pill.innerHTML = `
      <span class="abhi-apk-pill-icon" aria-hidden="true">${ANDROID_SVG}</span>
      <span>↓ Get APK</span>
      <button type="button" class="abhi-apk-pill-close" aria-label="Dismiss APK pill">&times;</button>
    `;
    pill.addEventListener("click", (e) => {
      if (e.target.closest(".abhi-apk-pill-close")) return;
      e.stopPropagation();
      if (origActionEl) {
        origActionEl.click();
      } else if (origHref) {
        window.open(origHref, "_blank", "noopener");
      }
    });
    pill.querySelector(".abhi-apk-pill-close").addEventListener("click", (e) => {
      e.stopPropagation();
      sessionStorage.setItem("abhiApkDismissed", "1");
      document.querySelectorAll(".abhi-apk-pill").forEach((p) => p.remove());
    });
    return pill;
  }

  function applyApkFix() {
    hideOriginalApkBar();
    if (pillsInjected || sessionStorage.getItem("abhiApkDismissed") || (!origActionEl && !origHref)) return;

    const desktopDock = document.querySelector(".abhi-left-dock");
    if (desktopDock && !desktopDock.querySelector(".abhi-apk-pill")) {
      desktopDock.insertBefore(createApkPill(), desktopDock.firstChild);
    }

    const mobileDock = document.querySelector(".abhi-mobile-dock");
    if (mobileDock && !mobileDock.querySelector(".abhi-apk-pill")) {
      mobileDock.insertBefore(createApkPill(), mobileDock.firstChild);
    }

    pillsInjected = true;
  }

  // Find Contact section reliably
  function findContactSection() {
    const byId = document.getElementById("contact") || document.querySelector('[id*="contact" i]');
    if (byId) return byId;
    const headings = document.querySelectorAll("h1, h2, h3");
    for (const h of headings) {
      if ((h.textContent || "").trim().toLowerCase() === "contact") {
        return h.closest("section") || h.parentElement || h;
      }
    }
    return document.querySelector("footer");
  }

  // Unified visibility: hidden in Hero (< 140px) AND hidden at/below Contact section
  function updateDockVisibility() {
    const pastHero = window.scrollY >= 140;
    let inOrBelowContact = false;

    const contactEl = findContactSection();
    if (contactEl) {
      const rect = contactEl.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 60) {
        inOrBelowContact = true;
      }
    }

    const shouldShow = pastHero && !inOrBelowContact;

    const desktopDock = document.querySelector(".abhi-left-dock");
    if (desktopDock) desktopDock.classList.toggle("abhi-dock-show", shouldShow);

    const mobileDock = document.querySelector(".abhi-mobile-dock");
    if (mobileDock) mobileDock.classList.toggle("abhi-dock-show", shouldShow);
  }

  applyApkFix();
  updateDockVisibility();
  setTimeout(() => { applyApkFix(); updateDockVisibility(); }, 300);
  setTimeout(() => { applyApkFix(); updateDockVisibility(); }, 1000);
  setTimeout(() => { applyApkFix(); updateDockVisibility(); }, 2500);

  window.addEventListener("scroll", updateDockVisibility, { passive: true });
  window.addEventListener("resize", updateDockVisibility, { passive: true });

  const obs = new MutationObserver(() => applyApkFix());
  obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => obs.disconnect(), 8000);
})();

/* === ABHI COMPACT POPUP SIZING === */
(() => {
  if (document.getElementById("abhiCompactSizeStyle")) return;

  const s = document.createElement("style");
  s.id = "abhiCompactSizeStyle";
  s.textContent = `
    /* Desktop Compact Sizing (Full content intact, ~30% smaller footprint) */
    .abhi-left-dock {
      left: 14px !important;
      bottom: 14px !important;
      width: 280px !important;
      gap: 5px !important;
    }

    .abhi-apk-pill {
      padding: 4px 8px 4px 6px !important;
      gap: 5px !important;
      font-size: 0.64rem !important;
    }
    .abhi-apk-pill-icon {
      width: 18px !important;
      height: 18px !important;
    }
    .abhi-apk-pill-icon svg {
      width: 12px !important;
      height: 12px !important;
    }
    .abhi-apk-pill-close {
      font-size: 0.8rem !important;
    }

    .abhi-robot-tip {
      padding: 6px 20px 6px 8px !important;
      gap: 7px !important;
      border-radius: 9px !important;
      font-size: 0.61rem !important;
      line-height: 1.35 !important;
      max-width: 100% !important;
    }
    .abhi-robot-face {
      width: 22px !important;
      height: 22px !important;
      border-radius: 6px !important;
    }
    .abhi-robot-face svg {
      width: 15px !important;
      height: 15px !important;
    }
    .abhi-mini-close {
      top: 3px !important;
      right: 5px !important;
      font-size: 0.8rem !important;
    }

    .abhi-connect-card {
      padding: 8px 10px !important;
      border-radius: 9px !important;
    }
    .abhi-connect-head {
      margin-bottom: 3px !important;
    }
    .abhi-connect-tag {
      font-size: 0.6rem !important;
      gap: 5px !important;
    }
    .abhi-pill-dot {
      width: 6px !important;
      height: 6px !important;
    }
    .abhi-pill-close {
      font-size: 0.85rem !important;
    }
    .abhi-connect-text {
      margin: 0 0 6px !important;
      font-size: 0.62rem !important;
      line-height: 1.36 !important;
    }
    .abhi-connect-cta {
      padding: 4px 10px !important;
      border-radius: 6px !important;
      font-size: 0.64rem !important;
    }

    /* Mobile Compact Sizing */
    .abhi-mobile-dock {
      left: 12px !important;
      bottom: 14px !important;
      gap: 5px !important;
    }
    .abhi-mobile-teaser {
      padding: 6px 20px 6px 8px !important;
      gap: 7px !important;
      border-radius: 9px !important;
      font-size: 0.61rem !important;
      line-height: 1.35 !important;
      max-width: 235px !important;
    }
    .abhi-mobile-pill {
      padding: 5px 10px 5px 7px !important;
      gap: 5px !important;
      font-size: 0.64rem !important;
    }
    .abhi-mobile-pill .abhi-robot-face {
      width: 18px !important;
      height: 18px !important;
    }
    .abhi-mobile-pill .abhi-robot-face svg {
      width: 13px !important;
      height: 13px !important;
    }
  `;
  document.head.appendChild(s);
})();

/* === ABHI V14 LAYOUT POLISH === */
(() => {
  if (document.getElementById("abhiV14Style")) return;

  const s = document.createElement("style");
  s.id = "abhiV14Style";
  s.textContent = `
    /* 1. Desktop-only: Move Get APK pill right under the bottom-right robot chatbot */
    @media (min-width: 769px) {
      .abhi-apk-under-robot {
        position: fixed !important;
        right: 16px !important;
        bottom: 14px !important;
        left: auto !important;
        z-index: 9000 !important;
        opacity: 0;
        visibility: hidden;
        transform: translateY(10px);
        transition: opacity 0.28s ease, transform 0.28s ease, visibility 0.28s ease;
      }
      .abhi-apk-under-robot.abhi-dock-show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }

    /* 2. Mobile-only: Remove excess top/bottom hero space + live terminal clock */
    .abhi-mobile-clock {
      display: none;
    }

    @media (max-width: 768px) {
      .abhi-apk-under-robot {
        display: none !important;
      }

      .abhi-hero-trimmed {
        min-height: auto !important;
        height: auto !important;
        padding-top: 12px !important;
        padding-bottom: 18px !important;
        margin-bottom: 0 !important;
        flex-direction: column !important;
        align-items: stretch !important;
        justify-content: flex-start !important;
      }

      .abhi-mobile-clock {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        margin: 0 0 14px 0;
        padding: 5px 10px;
        border-radius: 7px;
        background: rgba(212, 175, 55, 0.08);
        border: 1px solid rgba(212, 175, 55, 0.3);
        font-family: 'JetBrains Mono', 'Space Mono', monospace;
        font-size: 0.68rem;
        letter-spacing: 0.05em;
        color: #f5c542;
      }
      .abhi-clock-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #f5c542;
        flex-shrink: 0;
      }
    }
  `;
  document.head.appendChild(s);

  // Move desktop APK pill out of left dock and place right under the robot chatbot
  function relocateDesktopApkPill() {
    const desktopDock = document.querySelector(".abhi-left-dock");
    if (!desktopDock) return;

    const pill = desktopDock.querySelector(".abhi-apk-pill");
    if (pill && !pill.classList.contains("abhi-apk-under-robot")) {
      pill.classList.add("abhi-apk-under-robot");
      document.body.appendChild(pill);
    }

    const floatingPill = document.querySelector(".abhi-apk-under-robot");
    if (!floatingPill) return;

    // Sync show/hide with desktop dock (hidden in Hero & at/below Contact)
    const syncVis = () => {
      floatingPill.classList.toggle("abhi-dock-show", desktopDock.classList.contains("abhi-dock-show"));
    };
    syncVis();
    window.addEventListener("scroll", syncVis, { passive: true });
    window.addEventListener("resize", syncVis, { passive: true });

    // Ensure robot chatbot button sits cleanly above the APK pill on desktop
    if (window.innerWidth > 768) {
      document.querySelectorAll("button, div").forEach((el) => {
        if (el.closest("#abhiBookingRoot") || el.classList.contains("abhi-apk-under-robot")) return;
        const cs = window.getComputedStyle(el);
        if (cs.position !== "fixed") return;
        const r = el.getBoundingClientRect();
        const isBottomRightBot =
          r.width >= 40 && r.width <= 80 &&
          r.height >= 40 && r.height <= 80 &&
          (window.innerWidth - r.right) <= 45 &&
          (window.innerHeight - r.bottom) <= 55;
        if (isBottomRightBot) {
          el.style.setProperty("bottom", "56px", "important");
        }
      });
    }
  }

  // Trim mobile hero top/bottom empty space & inject live Date/Time (HH:MM:SS)
  function setupMobileHeroTrimAndClock() {
    const h1 = document.querySelector("h1");
    const heroSection =
      (h1 && h1.closest("section")) ||
      document.querySelector("#hero, .hero, main > section:first-of-type, section:first-of-type");

    if (!heroSection) return;
    heroSection.classList.add("abhi-hero-trimmed");

    if (document.getElementById("abhiMobileClock")) return;

    const clockEl = document.createElement("div");
    clockEl.id = "abhiMobileClock";
    clockEl.className = "abhi-mobile-clock";
    clockEl.innerHTML = `<span class="abhi-clock-dot"></span><span id="abhiClockText"></span>`;

    const targetParent = (h1 && h1.parentElement) ? h1.parentElement : heroSection;
    clockEl.style.width = "fit-content";
    clockEl.style.whiteSpace = "nowrap";
    if (targetParent.firstElementChild) {
      targetParent.insertBefore(clockEl, targetParent.firstElementChild);
    } else {
      targetParent.appendChild(clockEl);
    }

    const clockText = clockEl.querySelector("#abhiClockText");
    function updateClock() {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
      const timeStr = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      clockText.textContent = `${dateStr} • ${timeStr}`;
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  relocateDesktopApkPill();
  setupMobileHeroTrimAndClock();
  setTimeout(relocateDesktopApkPill, 400);
  setTimeout(relocateDesktopApkPill, 1200);
  setTimeout(relocateDesktopApkPill, 2600);
})();

/* === ABHI V15 FIXED MOBILE MENU === */
(() => {
  if (document.getElementById("abhiV15Style")) return;

  const s = document.createElement("style");
  s.id = "abhiV15Style";
  s.textContent = `
    @media (max-width: 768px) {
      /* Lock mobile menu drawer to viewport so it never scrolls away with hero */
      .abhi-mobile-menu-fixed {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100vw !important;
        max-height: 100vh !important;
        overflow-y: auto !important;
        z-index: 9015 !important;
        background: rgba(9, 9, 12, 0.96) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        padding: 68px 24px 28px !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        border-bottom: 1px solid rgba(212, 175, 55, 0.28) !important;
        box-shadow: 0 14px 36px rgba(0, 0, 0, 0.85) !important;
      }
    }
  `;
  document.head.appendChild(s);

  function pinMobileMenuDrawer() {
    const bookBtn = document.querySelector(".abhi-nav-book-btn");
    let menuEl = null;

    if (bookBtn) {
      menuEl = bookBtn.closest("ul") || bookBtn.closest("nav > div") || bookBtn.parentElement;
    }
    if (!menuEl) {
      const header = document.querySelector("header") || document.querySelector("nav");
      if (header) {
        menuEl = header.querySelector("ul, .nav-links, .mobile-menu, [class*='menu' i]");
      }
    }

    if (menuEl && menuEl.tagName !== "HEADER") {
      menuEl.classList.add("abhi-mobile-menu-fixed");
    }
  }

  pinMobileMenuDrawer();
  setTimeout(pinMobileMenuDrawer, 400);
  setTimeout(pinMobileMenuDrawer, 1200);
})();

/* === ABHI V17 DESKTOP ANALOG WATCH === */
(() => {
  if (document.getElementById("abhiV18WatchStyle")) return;

  // Load Orbitron (digital watch LCD font) & Cinzel (aristocratic Roman serif)
  if (!document.getElementById("abhiWatchFonts")) {
    const link = document.createElement("link");
    link.id = "abhiWatchFonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Orbitron:wght@600;700&display=swap";
    document.head.appendChild(link);
  }

  const s = document.createElement("style");
  s.id = "abhiV18WatchStyle";
  s.textContent = `
    /* 1. Mobile Digital Watch LCD/LED Styling */
    @media (max-width: 768px) {
      .abhi-mobile-clock {
        font-family: 'Orbitron', 'JetBrains Mono', monospace !important;
        font-variant-numeric: tabular-nums !important;
        font-size: 0.7rem !important;
        font-weight: 700 !important;
        letter-spacing: 0.1em !important;
        color: #f5c542 !important;
        background: linear-gradient(180deg, #0b0b0f 0%, #131319 100%) !important;
        border: 1px solid rgba(212, 175, 55, 0.5) !important;
        border-radius: 6px !important;
        padding: 6px 11px !important;
        box-shadow: inset 0 1px 6px rgba(0, 0, 0, 0.9), 0 0 12px rgba(212, 175, 55, 0.14) !important;
        text-shadow: 0 0 8px rgba(245, 197, 66, 0.45) !important;
      }
      .abhi-clock-dot {
        box-shadow: 0 0 6px rgba(245, 197, 66, 0.75) !important;
      }
      .abhi-desktop-watch {
        display: none !important;
      }
    }

    /* 2. Desktop Aristocratic Luxury Timepiece */
    .abhi-desktop-watch {
      position: absolute;
      top: 90px;
      right: 46px;
      z-index: 6;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 7px;
      pointer-events: none;
      user-select: none;
    }
    .abhi-watch-svg {
      width: 122px;
      height: 122px;
      display: block;
      filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 14px rgba(212, 175, 55, 0.16));
    }
    .abhi-watch-meta {
      padding: 2px 10px;
      border-radius: 999px;
      background: rgba(10, 10, 14, 0.85);
      border: 1px solid rgba(212, 175, 55, 0.38);
      font-family: 'Cinzel', Georgia, serif;
      font-size: 0.58rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      color: #e6c667;
      text-transform: uppercase;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
    }
  `;
  document.head.appendChild(s);

  function mountDesktopWatch() {
    const existing = document.getElementById("abhiDesktopWatch");
    if (existing) existing.remove();

    const h1 = document.querySelector("h1");
    const heroSection =
      (h1 && h1.closest("section")) ||
      document.querySelector("#hero, .hero, main > section:first-of-type, section:first-of-type");

    if (!heroSection) return;

    const cs = window.getComputedStyle(heroSection);
    if (cs.position === "static") {
      heroSection.style.position = "relative";
    }

    // Build 60 railway minute ticks + 8 diamond hour batons (quarters have Roman numerals)
    let ticks = "";
    for (let i = 0; i < 60; i++) {
      const isHour = i % 5 === 0;
      const isQuarter = i % 15 === 0;
      if (isQuarter) continue;
      if (isHour) {
        ticks += `<polygon points="50,11.5 51.3,16 50,18.2 48.7,16" fill="url(#abhiGoldGrad)" transform="rotate(${i * 6} 50 50)"/>`;
      } else {
        ticks += `<line x1="50" y1="11.2" x2="50" y2="13.2" stroke="rgba(212, 175, 55, 0.42)" stroke-width="0.65" transform="rotate(${i * 6} 50 50)"/>`;
      }
    }

    const watch = document.createElement("div");
    watch.id = "abhiDesktopWatch";
    watch.className = "abhi-desktop-watch";
    watch.setAttribute("aria-label", "Luxury Analog Watch");
    watch.innerHTML = `
      <svg class="abhi-watch-svg" viewBox="0 0 108 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="abhiGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fff0b3"/>
            <stop offset="35%" stop-color="#d4af37"/>
            <stop offset="70%" stop-color="#9e7b1b"/>
            <stop offset="100%" stop-color="#f5d469"/>
          </linearGradient>
          <radialGradient id="abhiDialGrad" cx="42%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#1b1a22"/>
            <stop offset="65%" stop-color="#0b0b0f"/>
            <stop offset="100%" stop-color="#050507"/>
          </radialGradient>
        </defs>

        <!-- Sculpted Watch Crown at 3 o'clock -->
        <rect x="96.5" y="45.2" width="5.2" height="9.6" rx="1.6" fill="url(#abhiGoldGrad)" stroke="#5c450d" stroke-width="0.6"/>
        <line x1="98.2" y1="46.2" x2="98.2" y2="53.8" stroke="#5c450d" stroke-width="0.6"/>
        <line x1="100" y1="46.2" x2="100" y2="53.8" stroke="#5c450d" stroke-width="0.6"/>

        <!-- Outer & Inner Metallic Gold Bezels -->
        <circle cx="50" cy="50" r="47.5" fill="url(#abhiGoldGrad)"/>
        <circle cx="50" cy="50" r="44.2" fill="#09090c"/>
        <circle cx="50" cy="50" r="42.8" fill="url(#abhiDialGrad)" stroke="rgba(212, 175, 55, 0.55)" stroke-width="0.7"/>
        <circle cx="50" cy="50" r="39.2" fill="none" stroke="rgba(212, 175, 55, 0.22)" stroke-width="0.5"/>
        <circle cx="50" cy="50" r="24" fill="none" stroke="rgba(212, 175, 55, 0.1)" stroke-width="0.5" stroke-dasharray="1.2 1.8"/>

        <!-- Ticks & Batons -->
        ${ticks}

        <!-- Aristocratic Roman Numerals -->
        <g fill="#f5d469" font-family="Cinzel, Georgia, serif" font-weight="700" font-size="7.6" text-anchor="middle">
          <text x="50" y="20.2">XII</text>
          <text x="82.5" y="52.6">III</text>
          <text x="50" y="85.2">VI</text>
          <text x="17.5" y="52.6">IX</text>
        </g>

        <!-- Subtle Dial Engraving -->
        <text x="50" y="34.5" fill="rgba(212, 175, 55, 0.72)" font-family="Cinzel, Georgia, serif" font-size="4.1" letter-spacing="1.4" text-anchor="middle">CHRONO</text>
        <text x="50" y="69.5" fill="rgba(212, 175, 55, 0.55)" font-family="Cinzel, Georgia, serif" font-size="3.6" letter-spacing="1.1" text-anchor="middle">MMXXVI</text>

        <!-- Faceted Dauphine Hour Hand -->
        <g id="abhiWatchHour">
          <polygon points="50,24 52.3,50 50,55 47.7,50" fill="url(#abhiGoldGrad)" stroke="#4a3709" stroke-width="0.35"/>
        </g>

        <!-- Faceted Dauphine Minute Hand -->
        <g id="abhiWatchMin">
          <polygon points="50,15.5 51.6,50 50,56 48.4,50" fill="#f4f4f5" stroke="#3f3f46" stroke-width="0.3"/>
        </g>

        <!-- Aristocratic Counterweight Second Hand -->
        <g id="abhiWatchSec">
          <line x1="50" y1="61" x2="50" y2="14" stroke="#d4af37" stroke-width="0.85" stroke-linecap="round"/>
          <circle cx="50" cy="58.5" r="1.5" fill="none" stroke="#d4af37" stroke-width="0.8"/>
        </g>

        <!-- Center Jewel Pinion -->
        <circle cx="50" cy="50" r="3.1" fill="url(#abhiGoldGrad)"/>
        <circle cx="50" cy="50" r="1.1" fill="#09090b"/>
      </svg>
      <div class="abhi-watch-meta" id="abhiWatchDate"></div>
    `;

    heroSection.appendChild(watch);

    const hourHand = watch.querySelector("#abhiWatchHour");
    const minHand = watch.querySelector("#abhiWatchMin");
    const secHand = watch.querySelector("#abhiWatchSec");
    const dateEl = watch.querySelector("#abhiWatchDate");

    function tick() {
      const now = new Date();
      const s = now.getSeconds();
      const m = now.getMinutes() + s / 60;
      const h = (now.getHours() % 12) + m / 60;

      hourHand.setAttribute("transform", `rotate(${h * 30} 50 50)`);
      minHand.setAttribute("transform", `rotate(${m * 6} 50 50)`);
      secHand.setAttribute("transform", `rotate(${s * 6} 50 50)`);

      const dStr = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
      dateEl.textContent = dStr;
    }

    tick();
    setInterval(tick, 1000);
  }

  mountDesktopWatch();
  setTimeout(mountDesktopWatch, 400);
})();

/* === ABHI V19 PRIVACY & TZ STYLES === */
(() => {
  if (document.getElementById("abhiV19Style")) return;
  const s = document.createElement("style");
  s.id = "abhiV19Style";
  s.textContent = `
    .abhi-privacy-note {
      margin: 2px 0 0;
      font-size: 0.64rem;
      line-height: 1.4;
      color: #8b8b96;
      text-align: center;
    }
    .abhi-slot-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
    }
    .abhi-slot-local {
      display: block;
      font-size: 0.56rem;
      color: #9ca3af;
      font-weight: 400;
      letter-spacing: 0.01em;
    }
    .abhi-slot-btn.active .abhi-slot-local {
      color: rgba(245, 197, 66, 0.85);
    }
  `;
  document.head.appendChild(s);
})();