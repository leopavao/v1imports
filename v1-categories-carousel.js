<script>
(function () {
  "use strict";

  // roda só 1x por carregamento (anti-duplicação)
  if (window.__V1_HOME_BLOCKS_SAFE_V1__) return;
  window.__V1_HOME_BLOCKS_SAFE_V1__ = true;

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

  // ====== CATEGORIAS (3 banners) ======
  const BANNERS = [
    {
      href: "/casual/",
      img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/1-695872294383c1.png",
      alt: "Casual",
      label: "CASUAL",
    },
    {
      href: "/corrida/",
      img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/3-695ffaa3408fb1.png",
      alt: "Esporte",
      label: "ESPORTE",
    },
    {
      href: "/tenis-luxo/",
      img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/2-695871db0a81f1.png",
      alt: "Luxo",
      label: "LUXO",
    },
  ];

  // ====== MARCAS (logos) ======
  const BRANDS = [
    { name: "Dior",          href: "/marca/dior",              img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/3-696d51fce6d8a1.png" },
    { name: "Adidas",        href: "/marca/adidas",            img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/1-696d4e9141cfe1.png" },
    { name: "On Cloud",      href: "/marca/on-running",        img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/9-696d4e9c616ce1.png" },
    { name: "Louis Vuitton", href: "/marca/louis-vuitton",     img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/6-696d4ea7373541.png" },
    { name: "Asics",         href: "/marca/asics",             img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/2-696d4eb2432091.png" },
    { name: "New Balance",   href: "/marca/new-balance",       img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/7-696d4ebce74bb1.png" },
    { name: "Nike",          href: "/marca/nike",              img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/8-696d4ec811b281.png" },
    { name: "Zegna",         href: "/marca/ermenegildo-zegna", img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/4-696d4ed2b78831.png" },
    { name: "Gucci",         href: "/marca/gucci",             img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/5-696d4ede9544f1.png" },
  ];

  function injectStyleOnce() {
    if (document.getElementById("v1-home-blocks-safe-style")) return;

    const st = document.createElement("style");
    st.id = "v1-home-blocks-safe-style";
    st.textContent = `
      /* ===== V1 HOME BLOCKS (SAFE) ===== */

      /* --- Categories --- */
      .v1-home-banners{
        max-width:1200px;
        margin:26px auto 14px;
        padding:0 16px;
      }
      .v1-home-banners .v1-grid{
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:22px;
      }
      @media (max-width: 950px){
        .v1-home-banners .v1-grid{ grid-template-columns:1fr; gap:16px; }
      }
      .v1-home-banners .v1-card{
        position:relative;
        display:block;
        border-radius:16px;
        overflow:hidden;
        transform:translateZ(0);
      }
      .v1-home-banners .v1-img{
        width:100%;
        height:320px;
        object-fit:cover;
        display:block;
        transform:scale(1.001);
        transition:transform .35s ease, filter .35s ease;
        filter:saturate(1.02) contrast(1.02);
      }
      @media (max-width: 950px){
        .v1-home-banners .v1-img{ height:240px; }
      }
      .v1-home-banners .v1-overlay{
        position:absolute; inset:0;
        background:linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.35));
        display:flex; align-items:center; justify-content:center;
        flex-direction:column; gap:10px;
        transition:background .35s ease;
      }
      .v1-home-banners .v1-title{
        font-family: Helvetica, Arial, sans-serif;
        font-size:56px;
        letter-spacing:10px;
        color:#fff;
        line-height:1;
        text-transform:uppercase;
        text-shadow:0 10px 25px rgba(0,0,0,.35);
      }
      @media (max-width: 950px){
        .v1-home-banners .v1-title{ font-size:40px; letter-spacing:8px; }
      }
      .v1-home-banners .v1-chip{
        font-family: Helvetica, Arial, sans-serif;
        font-size:12px;
        letter-spacing:4px;
        color:#fff;
        border:1px solid rgba(255,255,255,.6);
        padding:6px 12px;
        border-radius:999px;
        backdrop-filter:blur(10px);
        background:rgba(255,255,255,.10);
        transform:translateY(10px);
        opacity:.85;
        transition:transform .35s ease, opacity .35s ease;
      }
      /* Hover categories */
      .v1-home-banners .v1-card:hover .v1-img{ transform:scale(1.06); filter:saturate(1.06) contrast(1.04); }
      .v1-home-banners .v1-card:hover .v1-overlay{
        background:linear-gradient(180deg, rgba(0,0,0,.06), rgba(0,0,0,.52));
      }
      .v1-home-banners .v1-card:hover .v1-chip{ transform:translateY(0); opacity:1; }

      /* --- Brands --- */
      .v1-brands{
        max-width:1200px;
        margin:24px auto 24px;
        padding:0 16px;
      }
      .v1-brands .v1-row{
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:12px;
      }
      .v1-brands .v1-title{
        font-family: Helvetica, Arial, sans-serif;
        font-size:14px;
        letter-spacing:3px;
        text-transform:uppercase;
        color:#111;
        opacity:.9;
      }
      .v1-brands .v1-track{
        display:flex;
        gap:14px;
        overflow:auto;
        padding:10px 2px 14px;
        scroll-snap-type:x mandatory;
        -webkit-overflow-scrolling:touch;
      }
      .v1-brands .v1-card{
        flex:0 0 auto;
        min-width:170px;
        border-radius:16px;
        border:1px solid rgba(0,0,0,.10);
        background:rgba(255,255,255,.70);
        backdrop-filter:blur(10px);
        scroll-snap-align:start;
        text-decoration:none;
        padding:14px 16px;
        display:flex;
        align-items:center;
        justify-content:center;
        transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;
      }
      .v1-brands .v1-logo{
        width:120px;
        height:46px;
        object-fit:contain;
        display:block;
        filter:grayscale(1) contrast(1.05);
        opacity:.92;
        transition:transform .25s ease, filter .25s ease, opacity .25s ease;
      }
      /* Hover brands */
      .v1-brands .v1-card:hover{
        transform:translateY(-2px) scale(1.03);
        border-color:rgba(0,0,0,.22);
        box-shadow:0 12px 28px rgba(0,0,0,.10);
      }
      .v1-brands .v1-card:hover .v1-logo{
        transform:scale(1.06);
        filter:grayscale(0) contrast(1.08);
        opacity:1;
      }
    `;
    document.head.appendChild(st);
  }

  function buildBannersNode() {
    const sec = document.createElement("section");
    sec.className = "v1-home-banners";
    sec.innerHTML = `
      <div class="v1-grid">
        ${BANNERS.map(b => `
          <a class="v1-card" href="${b.href}" aria-label="${b.alt}">
            <img class="v1-img" src="${b.img}" alt="${b.alt}" loading="lazy">
            <div class="v1-overlay">
              <div class="v1-title">${b.label}</div>
              <div class="v1-chip">SHOP</div>
            </div>
          </a>
        `).join("")}
      </div>
    `;
    return sec;
  }

  function buildBrandsNode() {
    const sec = document.createElement("section");
    sec.className = "v1-brands";
    sec.innerHTML = `
      <div class="v1-row"><div class="v1-title">Marcas</div></div>
      <div class="v1-track" aria-label="Carrossel de marcas">
        ${BRANDS.map(b => `
          <a class="v1-card" href="${b.href}" aria-label="${b.name}">
            <img class="v1-logo" src="${b.img}" alt="${b.name}" loading="lazy">
          </a>
        `).join("")}
      </div>
    `;
    return sec;
  }

  function removeExistingInjected() {
    document.querySelectorAll(".v1-home-banners, .v1-brands").forEach(n => n.remove());
  }

  function hideDefaultTwoCategories() {
    // mantém simples: não remove, só esconde se achar algo bem característico
    const blocks = Array.from(document.querySelectorAll("section,div")).slice(0, 700);
    for (const el of blocks) {
      const imgs = el.querySelectorAll("a img");
      if (imgs.length === 2) {
        const txt = (el.textContent || "").toUpperCase();
        if (txt.includes("LUXO") || txt.includes("ESPORTE") || txt.includes("CASUAL")) {
          el.style.display = "none";
        }
      }
    }
  }

  function run() {
    if (!isHome()) return;

    injectStyleOnce();
    removeExistingInjected();
    hideDefaultTwoCategories();

    // ✅ CATEGORIAS: logo abaixo do #alerts
    const alerts = document.getElementById("alerts");
    if (alerts && alerts.parentNode) {
      alerts.insertAdjacentElement("afterend", buildBannersNode());
    }

    // ✅ MARCAS: logo acima da newsletter (.news)
    const news = document.querySelector(".news");
    if (news && news.parentNode) {
      news.insertAdjacentElement("beforebegin", buildBrandsNode());
    }
  }

  // roda no load (evita briga com header/menu)
  window.addEventListener("load", function () {
    try { run(); } catch (e) {}
  }, { once: true });

})();
</script>
