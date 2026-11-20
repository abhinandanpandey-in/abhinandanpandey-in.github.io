(() => {
  const SESSION_KEY = "portfolio_visit_geo_sent";
  if (sessionStorage.getItem(SESSION_KEY)) return;
  sessionStorage.setItem(SESSION_KEY, "1");

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjerlyl";

  function parseDevice(ua) {
    const os = /Windows/.test(ua) ? "Windows" : /Mac OS/.test(ua) ? "macOS" : /Android/.test(ua) ? "Android" : /iPhone|iPad/.test(ua) ? "iOS" : /Linux/.test(ua) ? "Linux" : "Unknown OS";
    const browser = /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : "Unknown Browser";
    const device = /Mobile|Android|iPhone/.test(ua) ? "Mobile" : "Desktop";
    return `${browser} on ${os} (${device})`;
  }

  function notify(loc) {
    const payload = {
      _subject: "Portfolio visited — location alert",
      alert: "Website opened",
      time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
      location: loc.locationStr,
      coordinates: loc.coords,
      accuracy: loc.accuracy || "IP-based (coarse)",
      isp: loc.isp,
      timezone: loc.timezone,
      device: parseDevice(navigator.userAgent),
      screen: `${window.screen.width}x${window.screen.height}`,
      page: window.location.href,
      referrer: document.referrer || "direct / none",
    };

    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }

  function ipFallback() {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((loc) => {
        const parts = [loc.city, loc.region, loc.country_name].filter(Boolean);
        notify({
          locationStr: parts.length ? parts.join(", ") + ` (IP: ${loc.ip || "unknown"})` : "unknown",
          coords: loc.latitude && loc.longitude ? `${loc.latitude}, ${loc.longitude}` : "unknown",
          isp: loc.org || loc.asn || "unknown",
          timezone: loc.timezone || "unknown",
        });
      })
      .catch(() =>
        notify({ locationStr: "lookup failed", coords: "unknown", isp: "unknown", timezone: "unknown" })
      );
  }

  function onGpsGranted(pos) {
    const { latitude, longitude, accuracy } = pos.coords;
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18`)
      .then((r) => r.json())
      .then((data) => {
        const addr = data.address || {};
        const parts = [addr.suburb || addr.neighbourhood, addr.city || addr.town || addr.village, addr.state, addr.country].filter(Boolean);
        notify({
          locationStr: parts.length ? parts.join(", ") : data.display_name || "GPS location received",
          coords: `${latitude}, ${longitude}`,
          accuracy: `GPS (~${Math.round(accuracy)}m accuracy)`,
          isp: "n/a (GPS)",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
      })
      .catch(() =>
        notify({
          locationStr: `GPS coordinates: ${latitude}, ${longitude}`,
          coords: `${latitude}, ${longitude}`,
          accuracy: `GPS (~${Math.round(accuracy)}m accuracy)`,
          isp: "n/a (GPS)",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        })
      );
  }

  function triggerGeo() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onGpsGranted, ipFallback, {
        enableHighAccuracy: true,
        timeout: 7000,
        maximumAge: 60000,
      });
    } else {
      ipFallback();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", triggerGeo);
  } else {
    triggerGeo();
  }
})();
