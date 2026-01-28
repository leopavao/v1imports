(function () {
  "use strict";

  if (window.__V1_HOME_BLOCKS__) return;
  window.__V1_HOME_BLOCKS__ = true;

  var BRAND_LOGOS = [
    { name:"Adidas", href:"/marca/adidas", logo:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/1-696d4e9141cfe1.png" },
    { name:"Asics", href:"/marca/asics", logo:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/2-696d4eb2432091.png" },
    { name:"Dior", href:"/marca/dior", logo:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/3-696d51fce6d8a1.png" },
    { name:"Gucci", href:"/marca/gucci", logo:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/5-696d4ede9544f1.png" },
    { name:"Ermenegildo Zegna", href:"/marca/ermenegildo-zegna", logo:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/4-696d4ed2b78831.png" },
    { name:"New Balance", href:"/marca/new-balance", logo:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/7-696d4ebce74bb1.png" },
    { name:"Nike", href:"/marca/nike", logo:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/8-696d4ec811b281.png" },
    { name:"Louis Vuitton", href:"/marca/louis-vuitton", logo:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/6-696d4ea7373541.png" },
    { name:"On Running", href:"/marca/on-running", logo:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/9-696d4e9c616ce1.png" }
  ];

  function isHome() {
    var p = (location.pathname || "/").toLowerCase();
    return p === "/" || p === "/index.php" || p === "/home" || p === "/inicio" || p === "/loja" || p === "/loja/";
  }

  function ensureAnchor() {
    var anchor = document.querySelector("#v1-home-anchor");
    if (anchor) return anchor;

    var slider = document.querySelector("#slider, .block-slider");
    if (!slider || !slider.parentNode) return null;

    anchor = document.createElement("div");
    anchor.id = "v1-home-anchor";
    anchor.style.display = "contents"; // não cria “espaço” extra
    slider.parentNode.insertBefore(anchor, slider.nextSibling);
    return anchor;
  }

  function injectBanners(anchor) {
    if (document.querySelector(".v1-banners3")) return;

    var section = document.createElement("section");
    section.className = "v1-banners3";
    section.innerHTML =
      '<div class="central">' +
        '<div class="v1-grid">' +
          '<a class="v1-card" href="/corrida/" aria-label="Esporte">' +
            '<img loading="lazy" src="https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/3-695ffaa3408fb1.png" alt="Esporte">' +
          '</a>' +
          '<a class="v1-card" href="/casual/" aria-label="Casual">' +
            '<img loading="lazy" src="https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/1-695872294383c1.png" alt="Casual">' +
          '</a>' +
          '<a class="v1-card" href="/tenis-luxo/" aria-label="Luxo">' +
            '<img loading="lazy" src="https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/2-695871db0a81f1.png" alt="Luxo">' +
          '</a>' +
        '</div>' +
      '</div>';

    anchor.parentNode.insertBefore(section, anchor.nextSibling);
  }

  function injectCarouselStyle() {
    if (document.querySelector("#v1-carousel-style")) return;
    var st = document.createElement("style");
    st.id = "v1-carousel-style";
    st.textContent = [
      ".v1-brands-carousel{padding:10px 12px 18px;}",
      ".v1-brands-shell{max-width:1200px;width:92%;margin:0 auto;overflow:hidden;padding:14px 0;border-top:1px solid rgba(0,0,0,0.06);border-bottom:1px solid rgba(0,0,0,0.06);}",
      ".v1-track{display:flex !important;flex-wrap:nowrap !important;align-items:center !important;gap:14px !important;white-space:nowrap !important;}",
      ".v1-brand{display:inline-flex !important;flex:0 0 180px !important;width:180px !important;justify-content:center !important;align-items:center !important;padding:10px 14px !important;border:1px solid rgba(0,0,0,0.10);background:rgba(255,255,255,0.55);text-decoration:none !important;border-radius:14px;}",
      ".v1-brand-media{width:180px !important;height:40px !important;display:flex !important;align-items:center !important;justify-content:center !important;overflow:hidden !important;}",
      ".v1-brand-logo{max-width:160px !important;max-height:40px !important;width:auto !important;height:auto !important;display:block !important;}"
    ].join("");
    document.head.appendChild(st);
  }

  function injectBrandsCarousel(anchor) {
    if (document.querySelector(".v1-brands-carousel")) return;

    injectCarouselStyle();

    var section = document.createElement("section");
    section.className = "v1-brands-carousel";
    section.innerHTML = '<div class="v1-brands-shell"><div class="v1-track" role="list"></div></div>';

    // entra logo depois dos banners (se existirem), senão depois do anchor
    var after = document.querySelector(".v1-banners3") || anchor;
    after.parentNode.insertBefore(section, after.nextSibling);

    var track = section.querySelector(".v1-track");
    var doubled = BRAND_LOGOS.concat(BRAND_LOGOS);

    track.innerHTML = doubled.map(function (b) {
      return (
        '<a class="v1-brand" role="listitem" href="' + b.href + '" aria-label="' + b.name + '">' +
          '<span class="v1-brand-media" aria-hidden="true">' +
            '<img class="v1-brand-logo" src="' + b.logo + '" alt="' + b.name + '" loading="lazy">' +
          "</span>" +
        "</a>"
      );
    }).join("");
  }

  function run() {
    if (!isHome()) return;

    var anchor = ensureAnchor();
    if (!anchor) return;

    injectBanners(anchor);
    injectBrandsCarousel(anchor);
  }

  function boot() {
    run();

    var tries = 0;
    var mo = new MutationObserver(function () {
      tries++;
      run();
      if (document.querySelector(".v1-banners3") && document.querySelector(".v1-brands-carousel")) mo.disconnect();
      if (tries > 80) mo.disconnect();
    });

    mo.observe(document.documentElement, { childList: true, subtree: true });
    window.addEventListener("load", run);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
