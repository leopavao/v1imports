(function () {
  "use strict";

  // ✅ Ajuste aqui se quiser trocar as imagens das categorias
  const BANNERS = [
    {
      href: "/casual/",
      img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/1-695872294383c1.png",
      alt: "Casual",
      label: "CASUAL",
      sub: "SHOP",
    },
    {
      href: "/corrida/",
      img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/3-695ffaa3408fb1.png",
      alt: "Esporte",
      label: "ESPORTE",
      sub: "SHOP",
    },
    {
      href: "/tenis-luxo/",
      img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/2-695871db0a81f1.png",
      alt: "Luxo",
      label: "LUXO",
      sub: "SHOP",
    },
  ];

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

  function injectStyleOnce() {
    if (document.getElementById("v1-home-banners-style")) return;
    const st = document.createElement("style");
    st.id = "v1-home-banners-style";
    st.textContent = `
      .v1-home-banners{max-width:1200px;margin:28px auto 10px;padding:0 16px}
      .v1-home-banners .v1-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
      @media (max-width: 950px){.v1-home-banners .v1-grid{grid-template-columns:1fr;gap:16px}}

      .v1-home-banners .v1-card{position:relative;display:block;border-radius:16px;overflow:hidden;transform:translateZ(0)}
      .v1-home-banners .v1-img{
        width:100%;height:320px;object-fit:cover;display:block;
        transform:scale(1.001);transition:transform .35s ease;
        filter:saturate(1.02) contrast(1.02);
      }
      @media (max-width: 950px){.v1-home-banners .v1-img{height:240px}}

      .v1-home-banners .v1-overlay{
        position:absolute;inset:0;
        background:linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.35));
        display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;
        transition:background .35s ease;
      }
      .v1-home-banners .v1-title{
        font-family: Helvetica, Arial, sans-serif;
        font-size:56px;letter-spacing:10px;color:#fff;line-height:1;text-transform:uppercase;
        text-shadow:0 10px 25px rgba(0,0,0,.35);
      }
      @media (max-width: 950px){.v1-home-banners .v1-title{font-size:40px;letter-spacing:8px}}

      .v1-home-banners .v1-chip{
        font-family: Helvetica, Arial, sans-serif;
        font-size:12px;letter-spacing:4px;color:#fff;
        border:1px solid rgba(255,255,255,.6);
        padding:6px 12px;border-radius:999px;
        backdrop-filter:blur(10px);
        background:rgba(0,0,0,.10);
        transform:translateY(10px);opacity:.85;
        transition:transform .35s ease, opacity .35s ease;
      }

      /* ✨ Hover */
      .v1-home-banners .v1-card:hover .v1-img{transform:scale(1.06)}
      .v1-home-banners .v1-card:hover .v1-overlay{
        background:linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.52));
      }
      .v1-home-banners .v1-card:hover .v1-chip{transform:translateY(0);opacity:1}
    `;
    document.head.appendChild(st);
  }

  function removeWrongInstances() {
    document.querySelectorAll(".v1-home-banners").forEach((n) => n.remove());
  }

  // 👉 tenta achar o bloco "Destaques" (por texto) e inserir logo abaixo dele
  function findDestaquesAnchor() {
    const nodes = Array.from(document.querySelectorAll("section,div")).slice(0, 400);

    // 1) Match por texto “Destaques”
    for (const el of nodes) {
      const t = (el.textContent || "").trim().toLowerCase();
      if (t === "destaques" || t.includes("destaques")) {
        // tenta subir um nível “bloco”
        return el.closest("section,div") || el;
      }
    }

    // 2) Fallback: tenta achar um bloco com produtos logo no começo (geralmente “destaques”)
    // (melhor do que enfiar no topo da página)
    const productGrids = Array.from(document.querySelectorAll('[class*="product"], [class*="vitrine"], [id*="product"]'));
    if (productGrids.length) {
      return productGrids[0].closest("section,div") || productGrids[0];
    }

    return null;
  }

  function hideDefaultTwoCategoryBlock() {
    // Esconde o bloco do tema (2 categorias) se existir.
    const candidates = Array.from(document.querySelectorAll("section,div")).slice(0, 500);
    for (const el of candidates) {
      const imgs = el.querySelectorAll("a img");
      if (imgs.length === 2) {
        const txt = (el.textContent || "").toUpperCase();
        if (txt.includes("LUXO") || txt.includes("ESPORTE") || txt.includes("CASUAL")) {
          el.style.display = "none";
        }
      }
    }
  }

  function buildNode() {
    const wrap = document.createElement("section");
    wrap.className = "v1-home-banners";
    wrap.innerHTML = `
      <div class="v1-grid">
        ${BANNERS.map(
          (b) => `
          <a class="v1-card" href="${b.href}" aria-label="${b.alt}">
            <img class="v1-img" src="${b.img}" alt="${b.alt}" loading="lazy">
            <div class="v1-overlay">
              <div class="v1-title">${b.label}</div>
              <div class="v1-chip">${b.sub}</div>
            </div>
          </a>
        `
        ).join("")}
      </div>
    `;
    return wrap;
  }

  function inject() {
    if (!isHome()) return false;

    // limpa qualquer versão antiga/errada antes de reinjetar no lugar certo
    removeWrongInstances();

    injectStyleOnce();
    hideDefaultTwoCategoryBlock();

    const anchor = findDestaquesAnchor();
    if (!anchor || !anchor.parentNode) return false;

    // Insere logo abaixo do bloco "Destaques"
    anchor.insertAdjacentElement("afterend", buildNode());
    return true;
  }

  function start() {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if (inject() || tries > 60) clearInterval(timer);
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

