(function () {
  "use strict";

  var THRESHOLD = 60;

  var WHITE_LOGO_URL =
    "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/untitled-design-19-696cd11ca4fb51.png";

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

  var BANNERS = [
    { href:"/corrida/", img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/3-695ffaa3408fb1.png", alt:"Corrida" },
    { href:"/casual/", img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/1-695872294383c1.png", alt:"Casual" },
    { href:"/tenis-luxo/", img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/2-695871db0a81f1.png", alt:"Luxo" }
  ];

  function qs(sel){ return document.querySelector(sel); }

  function findHeader(){
    return qs("header.fixed") || qs("header") || qs("#header") || qs(".header") || null;
  }

  function isHomeStrict(){
    var p = (location && location.pathname) ? location.pathname : "/";
    p = (p || "/").toLowerCase();
    if (qs("#page_home")) return true;
    if (qs("#slider, .block-slider")) return true;
    if (p === "/" || p === "") return true;
    if (p === "/index.php" || p === "/home" || p === "/home/" || p === "/loja/" || p === "/loja") return true;
    return false;
  }

  function ensurePageClasses(){
    if (!document.body) return;
    var home = isHomeStrict();
    document.body.classList.toggle("v1-home", home);
    document.body.classList.toggle("v1-interna", !home);
  }

  function ensureScrolledClasses(){
    if (!document.body) return;

    var scrolled = window.scrollY > THRESHOLD;
    document.body.classList.toggle("v1-scrolled", scrolled);

    // fallback no header (pra CSS funcionar mesmo se body demorar)
    var header = findHeader();
    if (header){
      header.classList.add("v1-header");
      header.classList.toggle("v1-scrolled", scrolled);

      var home = document.body.classList.contains("v1-home");
      header.classList.toggle("v1-home", home);
      header.classList.toggle("v1-interna", !home);
      header.classList.toggle("v1-home-top", home && !scrolled);
    }
  }

  function updateHeaderOffsetVar(){
    var header = findHeader();
    if (!header) return;
    var h = Math.max(0, Math.round(header.getBoundingClientRect().height));
    if (h) document.documentElement.style.setProperty("--v1-header-h", h + "px");
  }

  function findLogoEl(){
    return qs("header.fixed a#btLogo") || qs("header a#btLogo") || qs("a#btLogo") || qs("#btLogo") || null;
  }

  function getBgUrl(el){
    if (!el) return "";
    var inline = (el.style && el.style.backgroundImage) ? el.style.backgroundImage : "";
    var bg = inline || window.getComputedStyle(el).backgroundImage || "";
    var m = /url\((['"]?)(.*?)\1\)/i.exec(bg);
    return m && m[2] ? m[2] : "";
  }

  function setBgUrl(el, url){
    if (!el || !url) return;
    el.style.backgroundImage = 'url("' + url + '")';
  }

  function cacheBlackLogoBg(el){
    if (!el) return;
    if (!el.dataset.v1BlackBg) {
      var current = getBgUrl(el);
      if (current && current !== WHITE_LOGO_URL) el.dataset.v1BlackBg = current;
    }
  }

  function applyLogoState(){
    var el = findLogoEl();
    if (!el || !document.body) return;

    cacheBlackLogoBg(el);

    var home = document.body.classList.contains("v1-home");
    var scrolled = document.body.classList.contains("v1-scrolled");

    if (home && !scrolled) setBgUrl(el, WHITE_LOGO_URL);
    else if (el.dataset.v1BlackBg) setBgUrl(el, el.dataset.v1BlackBg);
  }

  function el(tag){ return document.createElement(tag); }

  function safeImg(src, alt){
    var img = el("img");
    img.src = src;
    img.alt = alt || "";
    img.loading = "lazy";
    img.addEventListener("error", function(){ img.style.display = "none"; });
    return img;
  }

  function injectBanners(){
    if (!document.body || !document.body.classList.contains("v1-home")) return;
    if (qs(".v1-banners3")) return;

    var slider = qs("#slider, .block-slider, #page_home");
    var alerts = qs("#alerts");

    var section = el("section");
    section.className = "v1-banners3";
    section.setAttribute("aria-label","Categorias V1 Imports");

    var central = el("div"); central.className = "central";
    var grid = el("div"); grid.className = "v1-grid";

    for (var i=0;i<BANNERS.length;i++){
      var b = BANNERS[i];
      var a = el("a");
      a.className = "v1-card";
      a.href = b.href;
      a.setAttribute("aria-label", b.alt);
      a.appendChild(safeImg(b.img, b.alt));
      grid.appendChild(a);
    }

    central.appendChild(grid);
    section.appendChild(central);

    if (slider && slider.parentNode) slider.parentNode.insertBefore(section, slider.nextSibling);
    else if (alerts && alerts.parentNode) alerts.parentNode.insertBefore(section, alerts.nextSibling);
    else {
      var anchor = qs("main") || qs("#geral") || document.body;
      anchor.insertBefore(section, anchor.firstChild);
    }
  }

  function injectBrandsCarousel(){
    if (!document.body || !document.body.classList.contains("v1-home")) return;
    if (qs(".v1-brands-carousel")) return;

    var slider = qs("#slider, .block-slider, #page_home");
    var anchor = qs("main") || qs("#geral") || document.body;

    var wrap = el("section"); wrap.className = "v1-brands-carousel";
    var shell = el("div"); shell.className = "v1-brands-shell";
    var track = el("div"); track.className = "v1-track"; track.setAttribute("role","list");

    shell.appendChild(track);
    wrap.appendChild(shell);

    if (slider && slider.parentNode) slider.parentNode.insertBefore(wrap, slider.nextSibling);
    else anchor.insertBefore(wrap, anchor.firstChild);

    var doubled = BRAND_LOGOS.concat(BRAND_LOGOS);

    for (var i=0;i<doubled.length;i++){
      var b = doubled[i];
      var a = el("a");
      a.className = "v1-brand";
      a.href = b.href;
      a.setAttribute("role","listitem");
      a.setAttribute("aria-label", b.name);

      var media = el("span");
      media.className = "v1-brand-media";
      media.setAttribute("aria-hidden","true");

      if (b.logo){
        var img = safeImg(b.logo, b.name);
        img.className = "v1-brand-logo";
        media.appendChild(img);
      } else {
        var sp = el("span");
        sp.className = "v1-brand-fallback";
        sp.textContent = b.name;
        media.appendChild(sp);
      }

      a.appendChild(media);
      track.appendChild(a);
    }
  }

  function run(){
    ensurePageClasses();
    ensureScrolledClasses();
    updateHeaderOffsetVar();
    applyLogoState();
    injectBanners();
    injectBrandsCarousel();
  }

  // WBuy re-renderiza. Esse “booster” garante que pega o header mesmo se ele nascer depois.
  function bootstrap(){
    var tries = 0;
    var maxTries = 40; // ~10s
    var timer = setInterval(function(){
      tries++;
      run();
      if (findHeader() && findLogoEl()) {
        // já pegamos header e logo pelo menos 1x
        if (tries >= 4) { clearInterval(timer); }
      }
      if (tries >= maxTries) clearInterval(timer);
    }, 250);
  }

  function onScroll(){
    ensureScrolledClasses();
    applyLogoState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function(){
      run();
      bootstrap();
      window.addEventListener("scroll", onScroll, { passive:true });
      window.addEventListener("resize", run);
    });
  } else {
    run();
    bootstrap();
    window.addEventListener("scroll", onScroll, { passive:true });
    window.addEventListener("resize", run);
  }

  window.addEventListener("load", function(){
    run();
    bootstrap();
  });

})();
