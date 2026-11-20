/* ================= PAGE VIEW COUNTER ================= */
(async function(){
  try {
    const { Counter } = await import('https://cdn.jsdelivr.net/npm/counterapi/dist/counter.esm.min.js');
    const counter = new Counter({ workspace: 'naren-pandeys-team-4894', timeout: 4000 });
    const result = await counter.up('page-views');
    const el = document.getElementById('viewsCount');
    const stat = document.getElementById('viewsStat');
    if(el && stat && typeof result.value === 'number'){
      el.textContent = result.value.toLocaleString();
      stat.style.display = '';
    }
  } catch(e){
    // Fail silently — counter stat just stays hidden
  }
})();
