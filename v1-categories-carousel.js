<script>
(function () {
  "use strict";

  if (window.__V1_HOME_BLOCKS_SAFE_V2__) return;
  window.__V1_HOME_BLOCKS_SAFE_V2__ = true;

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

  // ====== 3 CATEGORIAS ======
  const BANNERS = [
    { href: "/casual/",     img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/1-695872294383c1.png", alt:"Casual",  label:"CASUAL" },
    { href: "/corrida/",    img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/3-695ffaa3408fb1.png", alt:"Esporte", label:"ESPORTE" },
    { href: "/tenis-luxo/", img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/2-695871db0a81f1.png", alt:"Luxo",   label:"LUXO" },
  ];

  // ====== MARCAS (LOGOS) ======
  const BRANDS = [
    { name:"Dior",          href:"/marca/dior",              img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/3-696d51fce6d8a1.png" },
    { name:"Adidas",        href:"/marca/adidas",            img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/1-696d4e9141cfe1.png" },
    { name:"On Cloud",      href:"/marca/on-running",        img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/9-696d4e9c616ce1.png" },
    { name:"Louis Vuitton", href:"/marca/louis-vuitton",     img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/6-696d4ea7373541.png" },
    { name:"Asics",         href:"/marca/asics",             img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/2-696d4eb2432091.png" },
    { name:"New Balance",   href:"/marca/new-balance",       img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/7-696d4ebce74bb1.png" },
    { name:"Nike",          href:"/marca/nike",              img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/8-696d4ec811b281.png" },
    { name:"Zegna",         href:"/marca/ermenegildo-zegna", img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/4-696d4ed2b78831.png" },
    { name:"Gucci",         href:"/marca/gucci",             img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/5-696d4ede9544f1.png" },
  ];

  function injectStyleOnce() {
    if (document.getElementById("v1-home-safe-style-v2")) return;
    const st = document.createElement("style");
    st.id = "v1-home-safe-style-v2";
    st.textContent = `
      /* ===== V1 HOME SAFE V2 (scoped) ===== */

      /* --- 3 banners --- */
      .v1-home-banners{max-width:1200px;margin:26px auto 14px;padding:0 16px}
      .v1-home-banners .v1-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
      @media (max-width: 950px){.v1-home-banners .v1-grid{grid-template-columns:1fr;gap:16px}}

      .v1-home-banners .v1-card{position:relative;display:block;border-radius:16px;overflow:hidden;transform:translateZ(0)}
      .v1-home-banners .v1-img{
        width:100%;height:320px;object-fit:cover;display:block;
        transform:scale(1.001);
        transition:transform .35s ease, filter .35s ease;
        filter:saturate(1.02) contrast(1.02);
      }
      @media (max-width: 950px){.v1-home-banners .v1-img{height:240px}}

      .v1-home-banners .v1-overlay{
        position:absolute;inset:0;
        background:linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.35));
        display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;
        transition:background .35s ease, backdrop-filter .35s ease;
      }
      .v1-home-banners .v1-title{
        font-family: Helvetica, Arial, sans-serif;
        font-size:56px;letter-spacing:10px;color:#fff;line-height:1;text-transform:uppercase;
        text-shadow:0 10px 25px rgba(0,0,0,.35);
        transition:letter-spacing .35s ease, transform .35s ease;
      }
      @media (max-width: 950px){.v1-home-banners .v1-title{font-size:40px;letter-spacing:8px}}

      .v1-home-banners .v1-chip{
        font-family: Helvetica, Arial, sans-serif;
        font-size:12px;letter-spacing:4px;color:#fff;
        border:1px solid rgba(255,255,255,.6);
        padding:6px 12px;border-radius:999px;
        backdrop-filter:blur(10px);
        background:rgba(255,255,255,.10);
        transform:translateY(10px);opacity:.85;
        transition:transform .35s ease, opacity .35s ease;
      }

      /* Premium hover categories: shine sweep + glass */
      .v1-home-banners .v1-card::after{
        content:"";
        position:absolute;
        inset:-40%;
        background:linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.18), transparent 65%);
        transform:translateX(-110%);
        transition:transform .85s ease;
        pointer-events:none;
      }
      .v1-home-banners .v1-card:hover::after{transform:translateX(110%)}
      .v1-home-banners .v1-card:hover .v1-img{transform:scale(1.08);filter:saturate(1.10) contrast(1.08)}
      .v1-home-banners .v1-card:hover .v1-overlay{
        background:linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.60));
        backdrop-filter:blur(6px);
      }
      .v1-home-banners .v1-card:hover .v1-title{letter-spacing:12px;transform:scale(1.02)}
      .v1-home-banners .v1-card:hover .v1-chip{transform:translateY(0) scale(1.05);opacity:1}

      /* --- Brands: NO border, NO scrollbar --- */
      .v1-brands{max-width:1200px;margin:22px auto 24px;padding:0 16px}
      .v1-brands .v1-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
      .v1-brands .v1-title{
        font-family: Helvetica, Arial, sans-serif;
        font-size:14px;letter-spacing:3px;text-transform:uppercase;color:#111;opacity:.9;
      }

      .v1-brands .v1-track{
        display:flex;gap:18px;overflow:auto;padding:8px 2px;
        scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
        scrollbar-width:none; /* Firefox */
        -ms-overflow-style:none; /* IE/old Edge */
      }
      .v1-brands .v1-track::-webkit-scrollbar{display:none} /* Chrome/Safari */

      .v1-brands .v1-card{
        flex:0 0 auto;
        min-width:140px;
        padding:8px 6px;
        display:flex;align-items:center;justify-content:center;
        text-decoration:none;
        scroll-snap-align:start;
        border:0 !important;
        background:transparent !important;
        box-shadow:none !important;
        outline:none !important;
        position:relative;
        overflow:hidden;
        transition:transform .22s ease;
      }
      .v1-brands .v1-logo{
        width:130px;height:46px;object-fit:contain;display:block;
        filter:grayscale(1) contrast(1.05);
        opacity:.92;
        transition:transform .22s ease, filter .22s ease, opacity .22s ease;
      }

      /* Premium hover brands: bigger logo + subtle sweep, NO border */
      .v1-brands .v1-card::after{
        content:"";
        position:absolute;
        inset:-60%;
        background:linear-gradient(120deg, transparent 40%, rgba(255,255,255,.22), transparent 60%);
        transform:translateX(-130%);
        transition:transform .75s ease;
        pointer-events:none;
      }
      .v1-brands .v1-card:hover{transform:translateY(-2px)}
      .v1-brands .v1-card:hover::after{transform:translateX(130%)}
      .v1-brands .v1-card:hover .v1-logo{
        transform:scale(1.16);
        filter:grayscale(0) contrast(1.12);
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

  function removeInjected() {
    document.querySelectorAll(".v1-home-banners, .v1-brands").forEach(n => n.remove());
  }

  // 🔥 Oculta as 2 categorias do tema de forma mais “certeira”
  // Regra: blocos com 2 links “grandes” para categoria (casual/corrida/luxo) ou contendo 2 imagens clicáveis.
  function hideThemeCategories() {
    const slugs = ["/casual", "/corrida", "/tenis-luxo"];
    const candidates = Array.from(document.querySelectorAll("section,div")).slice(0, 900);

    for (const el of candidates) {
      // ignora o que a gente injeta
      if (el.closest(".v1-home-banners") || el.closest(".v1-brands")) continue;

      const links = Array.from(el.querySelectorAll("a[href]"));
      if (links.length < 2) continue;

      // pega só links que parecem ser banners (tem imagem dentro ou background grande)
      const bannerLinks = links.filter(a => a.querySelector("img") || (a.offsetHeight > 120 && a.offsetWidth > 200));
      if (bannerLinks.length < 2) continue;

      // checa se existem exatamente 2 "banners" e se apontam para slugs de categoria
      const catLinks = bannerLinks.filter(a => {
        const href = (a.getAttribute("href") || "").toLowerCase();
        return slugs.some(s => href.includes(s));
      });

      // Se o bloco tiver 2 categorias, some.
      if (catLinks.length === 2 || (el.querySelectorAll("a img").length === 2)) {
        el.style.display = "none";
      }
    }
  }

  function run() {
    if (!isHome()) return;

    injectStyleOnce();
    removeInjected();

    // 1) Oculta as 2 categorias originais
    hideThemeCategories();

    // 2) Insere 3 categorias abaixo do #alerts
    const alerts = document.getElementById("alerts");
    if (alerts && alerts.parentNode) {
      alerts.insertAdjacentElement("afterend", buildBannersNode());
    }

    // 3) Insere marcas acima da newsletter (.news)
    const news = document.querySelector(".news");
    if (news && news.parentNode) {
      news.insertAdjacentElement("beforebegin", buildBrandsNode());
    }
  }

  // roda após carregar (não briga com header)
  window.addEventListener("load", function () {
    try { run(); } catch (e) {}
  }, { once: true });

})();
</script>
  
