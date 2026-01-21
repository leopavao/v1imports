(function () {
  "use strict";

  const BRANDS = [
    { name: "Adidas", href: "/marca/adidas" },
    { name: "Asics", href: "/marca/asics" },
    { name: "Dior", href: "/marca/dior" },
    { name: "Gucci", href: "/marca/gucci" },
    { name: "Ermenegildo Zegna", href: "/marca/ermenegildo-zegna" },
    { name: "New Balance", href: "/marca/new-balance" },
    { name: "Nike", href: "/marca/nike" },
    { name: "Louis Vuitton", href: "/marca/louis-vuitton" },
    { name: "On Running", href: "/marca/on-running" },
  ];

  function injectStyleOnce() {
    if (document.getElementById("v1-brands-style")) return;
    const st = document.createElement("style");
    st.id = "v1-brands-style";
    st.textContent = `
      /* ====== V1 BRANDS (scoped) ====== */
      .v1-brands{max-width:1200px;margin:26px auto 34px;padding:0 16px}
      .v1-brands .v1-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
      .v1-brands .v1-title{
        font-family: Helvetica, Arial, sans-serif;
        font-size:14px; letter-spacing:3px; text-transform:uppercase; color:#111;
        opacity:.9;
      }

      .v1-brands .v1-track{
        display:flex; gap:12px; overflow:auto; padding:8px 2px 12px;
        scroll-snap-type:x mandatory;
        -webkit-overflow-scrolling: touch;
      }
      .v1-brands .v1-track::-webkit-scrollbar{height:8px}
      .v1-brands .v1-track::-webkit-scrollbar-thumb{background:rgba(0,0,0,.12);border-radius:999px}
      .v1-brands .v1-card{
        flex:0 0 auto; min-width:160px;
        padding:14px 16px; border-radius:14px;
        border:1px solid rgba(0,0,0,.10);
        background: rgba(255,255,255,.65);
        backdrop-filter: blur(10px);
        scroll-snap-align: start;
        text-decoration:none;
        transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, opacity .25s ease;
        position:relative;
      }
      .v1-brands .v1-name{
        font-family: Helvetica, Arial, sans-serif;
        font-size:14px; letter-spacing:1px; color:#111;
        white-space:nowrap;
      }
      /* ✨ Hover effect */
      .v1-brands .v1-card:hover{
        transform: translateY(-2px) scale(1.03);
        border-color: rgba(0,0,0,.22);
        box-shadow: 0 10px 26px rgba(0,0,0,.10);
      }
      .v1-brands .v1-card:active{transform: scale(.99)}
    `;
    document.head.appendChild(st);
  }

  function isHome() {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const c = canonical.href.replace(/\/$/, "");
      const o = location.origin.replace(/\/$/, "");
      if (c === o) return true;
    }
    const p = location.pathname.replace(/\/+$/, "").toLowerCase();
    return p === "" || p === "/" || p === "/home";
  }

  function buildNode() {
    const sec = document.createElement("section");
    sec.className = "v1-brands";
    sec.innerHTML = `
      <div class="v1-row">
        <div class="v1-title">Marcas</div>
      </div>
      <div class="v1-track" aria-label="Carrossel de marcas">
        ${BRANDS.map(b => `
          <a class="v1-card" href="${b.href}" aria-label="${b.name}">
            <div class="v1-name">${b.name}</div>
          </a>
        `).join("")}
      </div>
    `;
    return sec;
  }

  function inject() {
    if (!isHome()) return false;
    if (document.querySelector(".v1-brands")) return true;

    injectStyleOnce();

    // Preferência: logo abaixo dos 3 banners (se existirem)
    const banners = document.querySelector(".v1-home-banners");
    if (banners && banners.parentNode) {
      banners.parentNode.insertBefore(buildNode(), banners.nextSibling);
      return true;
    }

    // Fallback: topo do main
    const main = document.querySelector("main") || document.querySelector("#content");
    if (!main) return false;
    main.insertBefore(buildNode(), main.firstChild);
    return true;
  }

  function start() {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if (inject() || tries > 40) clearInterval(timer);
    }, 250);

    try {
      const mo = new MutationObserver(() => inject());
      mo.observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
