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
      _subject: "Portfolio visited - GPS location alert (consented)",
      alert: "Website opened (GPS allowed)",
      time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
      location: loc.locationStr,
      coordinates: loc.coords,
      accuracy: loc.accuracy,
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
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
      })
      .catch(() =>
        notify({
          locationStr: `GPS coordinates: ${latitude}, ${longitude}`,
          coords: `${latitude}, ${longitude}`,
          accuracy: `GPS (~${Math.round(accuracy)}m accuracy)`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        })
      );
  }

  function triggerGeo() {
    // Strictly consent-based: if unsupported, denied, or timed out, log nothing.
    if (!navigator.geolocation) return;

    let bestPos = null;
    let settled = false;
    let refineTimer = null;

    const finish = () => {
      if (settled) return;
      settled = true;
      if (refineTimer) clearTimeout(refineTimer);
      navigator.geolocation.clearWatch(watchId);
      if (bestPos) onGpsGranted(bestPos);
    };

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        if (!bestPos || pos.coords.accuracy < bestPos.coords.accuracy) {
          bestPos = pos;
        }
        if (pos.coords.accuracy <= 50) {
          finish();
          return;
        }
        if (!refineTimer) {
          refineTimer = setTimeout(finish, 5000);
        }
      },
      () => finish(),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", triggerGeo);
  } else {
    triggerGeo();
  }
})();