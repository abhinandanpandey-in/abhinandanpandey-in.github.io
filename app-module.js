/* ================= PAGE VIEW COUNTER (ZERO-DEPENDENCY) ================= */
(async function () {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch(
      'https://api.counterapi.dev/v1/naren-pandeys-team-4894/page-views/up',
      { signal: controller.signal }
    );
    if (!res.ok) return;
    const result = await res.json();
    const count = typeof result.count === 'number' ? result.count : result.value;
    const el = document.getElementById('viewsCount');
    const stat = document.getElementById('viewsStat');
    if (el && stat && typeof count === 'number') {
      el.textContent = count.toLocaleString();
      stat.style.display = '';
    }
  } catch (e) {
    // Fail silently - counter stat stays hidden
  } finally {
    clearTimeout(timer);
  }
})();