(function () {
  "use strict";

  var THRESHOLD = 60;

  // Logo branca (HOME topo)
  var WHITE_LOGO_URL =
    "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/untitled-design-19-696cd11ca4fb51.png";

  // Logos de marcas
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

  function qs(sel, root){ return (root||document).querySelector(sel); }
  function qsa(sel, root){ return Array.prototype.slice.call((root||document).querySelectorAll(sel)); }

  function isHomeStrict(){
    var p = (location && location.pathname) ? location.pathname : "/";
    p = (p || "/").toLowerCase();

    // sinais "fortes" (mais estáveis)
    if (qs("#page_home")) return true;
    if (qs("#slider, .block-slider")) return true;

    // Canonical
    var canon = qs("link[rel='canonical']");
    if (canon && canon.href){
      try{
        var u = new URL(canon.href, location.origin);
        var cp = (u.pathname || "/").toLowerCase();
        if (cp === "/" || cp === "" || cp === "/index.php" || cp === "/home" || cp === "/home/" || cp === "/loja" || cp === "/loja/"){
          return true;
        }
      }catch(e){}
    }

    var b = document.body;
    var cls = (b && b.className) ? (""+b.className).toLowerCase() : "";
    var id = (b && b.id) ? (""+b.id).toLowerCase() : "";
    if (cls.indexOf("home") >= 0 || id.indexOf("home") >= 0) return true;

    if (b){
      var dp = (b.getAttribute("data-page") || "").toLowerCase();
      var tpl = (b.getAttribute("data-template") || "").toLowerCase();
      if (dp.indexOf("home") >= 0 || tpl.indexOf("home") >= 0) return true;
    }

    if (p === "/" || p === "") return true;
    if (p === "/index.php" || p === "/home" || p === "/home/" || p === "/loja/" || p === "/loja") return true;

    if ((location && location.search) && (p === "/index.php" || p === "/")) return true;

    return false;
  }

  function ensurePageClasses(){
    var home = isHomeStrict();
    document.body.classList.toggle("v1-home", home);
    document.body.classList.toggle("v1-interna", !home);
  }

  function ensureScrolledClass(){
    if (window.scrollY > THRESHOLD) document.body.classList.add("v1-scrolled");
    else document.body.classList.remove("v1-scrolled");
  }

  function findLogoEl(){
    return qs("header.fixed a#btLogo") || qs("header a#btLogo") || qs("a#btLogo") || qs("#btLogo");
  }

  function getBgUrl(el){
    if (!el) return "";
    var bg = (el.style && el.style.backgroundImage) ? el.style.backgroundImage : "";
    bg = bg || window.getComputedStyle(el).backgroundImage || "";
    var m = /url\((['"]?)(.*?)\1\)/i.exec(bg);
    return (m && m[2]) ? m[2] : "";
  }

  function setBgUrl(el, url){
    if (!el) return;
    el.style.backgroundImage = 'url("' + url + '")';
  }

  function cacheBlackLogoBg(el){
    if (!el) return;
    if (!el.dataset.v1BlackBg){
      var current = getBgUrl(el);
      if (current && current !== WHITE_LOGO_URL) el.dataset.v1BlackBg = current;
    }
  }

  function applyLogoState(){
    var el = findLogoEl();
    if (!el) return;

    cacheBlackLogoBg(el);

    var isHome = document.body.classList.contains("v1-home");
    var isScrolled = document.body.classList.contains("v1-scrolled");

    if (isHome && !isScrolled) setBgUrl(el, WHITE_LOGO_URL);
    else if (el.dataset.v1BlackBg) setBgUrl(el, el.dataset.v1BlackBg);
  }

  /* =========================================
     HOME INSERTS (usado pelo carrossel de marcas)
  ========================================= */
  function getHomeAnchor(){
    if (!isHomeStrict()) return null;

    var existing = qs(".v1-home-inserts");
    if (existing) return existing;

    var slider = qs("#slider, .block-slider, #page_home");
    var alerts = qs("#alerts");
    var main = qs("main");
    var geral = qs("#geral");

    var anchorHost = slider || alerts || main || geral || document.body;

    var wrap = document.createElement("div");
    wrap.className = "v1-home-inserts";
    wrap.setAttribute("data-v1", "home-inserts");

    if (slider && slider.parentNode){
      slider.parentNode.insertBefore(wrap, slider.nextSibling);
    } else if (alerts && alerts.parentNode){
      alerts.parentNode.insertBefore(wrap, alerts.nextSibling);
    } else if (anchorHost && anchorHost.insertBefore){
      anchorHost.insertBefore(wrap, anchorHost.firstChild);
    } else {
      document.body.insertBefore(wrap, document.body.firstChild);
    }

    return wrap;
  }

  /* =========================================
     CSS do carrossel (blindado)
  ========================================= */
  function injectCarouselStyle(){
    if (qs("#v1-carousel-style")) return;
    var st = document.createElement("style");
    st.id = "v1-carousel-style";
    st.type = "text/css";
    st.textContent = [
      ".v1-brands-carousel{padding:10px 12px 18px;}",
      ".v1-brands-shell{max-width:1200px;margin:0 auto;overflow:hidden;padding:14px 0;border-top:1px solid rgba(0,0,0,0.06);border-bottom:1px solid rgba(0,0,0,0.06);}",
      ".v1-track{display:flex !important;flex-direction:row !important;flex-wrap:nowrap !important;align-items:center !important;gap:14px !important;white-space:nowrap !important;}",
      ".v1-brand{display:inline-flex !important;flex:0 0 180px !important;width:180px !important;max-width:180px !important;align-items:center !important;justify-content:center !important;padding:10px 14px !important;border:1px solid rgba(0,0,0,0.10);background:rgba(255,255,255,0.55);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);text-decoration:none !important;border-radius:14px;}",
      ".v1-brand-media{width:180px !important;height:40px !important;display:flex !important;align-items:center !important;justify-content:center !important;overflow:hidden !important;}",
      ".v1-brand-logo{max-width:160px !important;max-height:40px !important;width:auto !important;height:auto !important;display:block !important;}",
      ".v1-brand-fallback{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#111 !important;}"
    ].join("");
    document.head.appendChild(st);
  }

  function injectBrandsCarousel(){
    if (!isHomeStrict()) return;
    var anchor = getHomeAnchor();
    if (!anchor) return;

    if (qs(".v1-brands-carousel", anchor)) return;

    var wrap = document.createElement("section");
    wrap.className = "v1-brands-carousel";
    wrap.innerHTML = '<div class="v1-brands-shell"><div class="v1-track" role="list"></div></div>';
    anchor.appendChild(wrap);

    var track = qs(".v1-track", wrap);
    if (!track) return;

    var doubled = BRAND_LOGOS.concat(BRAND_LOGOS);

    track.innerHTML = doubled.map(function(b){
      var media = b.logo
        ? '<img class="v1-brand-logo" src="'+b.logo+'" alt="'+b.name+'" loading="lazy">'
        : '<span class="v1-brand-fallback">'+b.name+'</span>';

      return (
        '<a class="v1-brand" role="listitem" href="'+b.href+'" aria-label="'+b.name+'">' +
          '<span class="v1-brand-media" aria-hidden="true">'+media+'</span>' +
        '</a>'
      );
    }).join("");
  }

  /* =========================================
     DROPDOWN MENU (.drop) -> move pro body e controla abrir/fechar
  ========================================= */
  function setupMenuDropdown(){
    var drops = qsa("header.fixed nav .drop, header nav .drop");
    if(!drops.length) return;

    drops.forEach(function(drop){
      if(drop.classList.contains("v1-dd-menu")) return;

      drop.classList.add("v1-dd-menu");
      var parentLi = drop.parentElement;
      drop.__v1_parentLi = parentLi;

      document.body.appendChild(drop);

      function position(){
        var header = qs("header.fixed") || qs("header");
        if(!header || !drop.__v1_parentLi) return;

        var liRect = drop.__v1_parentLi.getBoundingClientRect();
        var headerRect = header.getBoundingClientRect();

        var width = Math.min(1180, window.innerWidth - 32);
        var left = Math.max(16, Math.min(window.innerWidth - 16 - width, (liRect.left + liRect.right)/2 - width/2));
        var top = Math.max(headerRect.bottom + 10, 10);

        drop.style.width = width + "px";
        drop.style.left = left + "px";
        drop.style.top = top + "px";
      }

      function open(){ position(); drop.classList.add("v1-open"); }
      function close(){ drop.classList.remove("v1-open"); }

      if (drop.__v1_parentLi){
        drop.__v1_parentLi.addEventListener("mouseenter", open);
        drop.__v1_parentLi.addEventListener("mouseleave", function(){
          setTimeout(function(){
            if(!drop.matches(":hover") && !drop.__v1_parentLi.matches(":hover")) close();
          }, 30);
        });
      }

      drop.addEventListener("mouseleave", function(){
        setTimeout(function(){
          if(drop.__v1_parentLi && !drop.__v1_parentLi.matches(":hover")) close();
        }, 30);
      });

      window.addEventListener("scroll", function(){ if(drop.classList.contains("v1-open")) position(); }, {passive:true});
      window.addEventListener("resize", function(){ if(drop.classList.contains("v1-open")) position(); });
    });

    document.addEventListener("click", function(e){
      qsa(".v1-dd-menu.v1-open").forEach(function(dd){
        var li = dd.__v1_parentLi;
        if(dd.contains(e.target)) return;
        if(li && li.contains(e.target)) return;
        dd.classList.remove("v1-open");
      });
    });
  }

  /* =========================================
     BUSCA (.boxquery) -> move pro body + posiciona
  ========================================= */
  function setupSearchDropdown(){
    function attachBoxquery(box){
      if(box.classList.contains("v1-dd-search")) return;

      box.classList.add("v1-dd-search");
      document.body.appendChild(box);

      function position(){
        var header = qs("header.fixed") || qs("header");
        var input = qs("header.fixed .search input, header .search input, input[type='search']");
        if(!header || !input) return;

        var headerRect = header.getBoundingClientRect();
        var inputRect = input.getBoundingClientRect();

        var width = Math.min(380, window.innerWidth - 32);
        width = Math.max(280, width);
        var idealLeft = (inputRect.left + inputRect.right)/2 - width/2;
        var left = Math.max(16, Math.min(window.innerWidth - 16 - width, idealLeft));
        var top = Math.max(headerRect.bottom + 10, 10);

        box.style.width = width + "px";
        box.style.left = left + "px";
        box.style.top = top + "px";
      }

      position();
      window.addEventListener("scroll", position, {passive:true});
      window.addEventListener("resize", position);
    }

    var existing = qs(".boxquery");
    if(existing) attachBoxquery(existing);

    try{
      var mo = new MutationObserver(function(){
        var box = qs(".boxquery");
        if(box) attachBoxquery(box);
      });
      mo.observe(document.documentElement, {childList:true, subtree:true});
    }catch(e){}
  }

  // Runner “teimoso”
  var scheduled = false;
  function scheduleRun(){
    if (scheduled) return;
    scheduled = true;
    setTimeout(function(){
      scheduled = false;
      run();
    }, 120);
  }

  function run(){
    if (!document.body) return;

    ensurePageClasses();
    ensureScrolledClass();
    applyLogoState();

    if (isHomeStrict()){
      injectCarouselStyle();
      injectBrandsCarousel();
    }

    setupMenuDropdown();
    setupSearchDropdown();
  }

  function start(){
    var tries = 0;
    var maxTries = 50;
    var iv = setInterval(function(){
      tries++;
      run();
      if (tries >= maxTries) clearInterval(iv);
    }, 250);

    window.addEventListener("scroll", scheduleRun, { passive:true });
    window.addEventListener("resize", scheduleRun);

    try{
      var mo = new MutationObserver(scheduleRun);
      mo.observe(document.documentElement, { childList:true, subtree:true });
    } catch(e){}

    run();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
