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

  // 3 banners de categoria (use links relativos pra evitar qualquer bloqueio)
  var BANNERS = [
    { href:"/corrida/", img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/3-695ffaa3408fb1.png", alt:"Corrida" },
    { href:"/casual/", img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/1-695872294383c1.png", alt:"Casual" },
    { href:"/tenis-luxo/", img:"https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/2-695871db0a81f1.png", alt:"Luxo" }
  ];

  function qs(sel, root){ return (root||document).querySelector(sel); }

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

  function buildBannersNode(){
    var section = document.createElement("section");
    section.className = "v1-banners3";
    section.setAttribute("aria-label", "Categorias V1 Imports");

    var central = document.createElement("div");
    central.className = "central";

    var grid = document.createElement("div");
    grid.className = "v1-grid";

    for (var i=0; i<BANNERS.length; i++){
      var b = BANNERS[i];
      var a = document.createElement("a");
      a.className = "v1-card";
      a.href = b.href;
      a.setAttribute("aria-label", b.alt);

      var img = document.createElement("img");
      img.src = b.img;
      img.alt = b.alt;
      img.loading = "lazy";
      img.width = 2000;
      img.height = 1125;

      a.appendChild(img);
      grid.appendChild(a);
    }

    central.appendChild(grid);
    section.appendChild(central);
    return section;
  }

  function injectBanners(){
    if (!isHomeStrict()) return;
    if (qs(".v1-banners3")) return;

    var slider = qs("#slider, .block-slider, #page_home");
    var alerts = qs("#alerts");
    var anchor = slider || alerts || qs("main") || qs("#geral") || document.body;

    var node = buildBannersNode();
    if (slider && slider.parentNode) slider.parentNode.insertBefore(node, slider.nextSibling);
    else if (alerts && alerts.parentNode) alerts.parentNode.insertBefore(node, alerts.nextSibling);
    else anchor.insertBefore(node, anchor.firstChild);
  }

  function injectBrandsCarousel(){
    if (!isHomeStrict()) return;
    if (qs(".v1-brands-carousel")) return;

    var slider = qs("#slider, .block-slider, #page_home");
    var anchor = qs("main") || qs("#geral") || document.body;

    var wrap = document.createElement("section");
    wrap.className = "v1-brands-carousel";
    wrap.innerHTML = '<div class="v1-brands-shell"><div class="v1-track" role="list"></div></div>';

    if (slider && slider.parentNode) slider.parentNode.insertBefore(wrap, slider.nextSibling);
    else anchor.insertBefore(wrap, anchor.firstChild);

    var track = qs(".v1-track", wrap);
    if (!track) return;

    var doubled = BRAND_LOGOS.concat(BRAND_LOGOS); // efeito faixa
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

  // Runner “teimoso”: roda no load, no scroll, e sempre que o DOM mudar
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

    // injeta sempre que HOME existir (mesmo se o slider aparecer depois)
    injectBanners();
    injectBrandsCarousel();
  }

  function start(){
    // tenta várias vezes (WBuy monta o DOM em ondas)
    var tries = 0;
    var maxTries = 30;
    var iv = setInterval(function(){
      tries++;
      run();
      if (tries >= maxTries) clearInterval(iv);
    }, 250);

    window.addEventListener("scroll", scheduleRun, { passive:true });
    window.addEventListener("resize", scheduleRun);

    // observa mudanças no DOM (publicado costuma mexer mais do que o editor)
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
(function(){
  "use strict";

  function qs(sel, root){ return (root||document).querySelector(sel); }
  function qsa(sel, root){ return Array.prototype.slice.call((root||document).querySelectorAll(sel)); }

  // ====== MENU DROPDOWN (.drop) -> move pro body e controla abrir/fechar ======
  function setupMenuDropdown(){
    // tenta achar qualquer .drop existente
    var drops = qsa("header.fixed nav .drop");
    if(!drops.length) return;

    drops.forEach(function(drop){
      // evita duplicar
      if(drop.classList.contains("v1-dd-menu")) return;

      drop.classList.add("v1-dd-menu");

      // guarda referência do LI pai original
      var parentLi = drop.parentElement;
      drop.__v1_parentLi = parentLi;

      // move pro body (tirando do contexto do header)
      document.body.appendChild(drop);

      // função posicionar abaixo do header (e centralizado no item)
      function position(){
        var header = qs("header.fixed") || qs("header");
        if(!header || !drop.__v1_parentLi) return;

        var liRect = drop.__v1_parentLi.getBoundingClientRect();
        var headerRect = header.getBoundingClientRect();

        var width = Math.min(1180, window.innerWidth - 32);
        var left = Math.max(16, Math.min(window.innerWidth - 16 - width, (liRect.left + liRect.right)/2 - width/2));

        // top: logo abaixo do header visível
        var top = Math.max(headerRect.bottom + 10, 10);

        drop.style.width = width + "px";
        drop.style.left = left + "px";
        drop.style.top = top + "px";
      }

      // abre/fecha
      function open(){
        position();
        drop.classList.add("v1-open");
      }
      function close(){
        drop.classList.remove("v1-open");
      }

      // Desktop: hover
      drop.__v1_parentLi.addEventListener("mouseenter", open);
      drop.__v1_parentLi.addEventListener("mouseleave", function(e){
        // fecha quando sai do LI e não está entrando no dropdown
        setTimeout(function(){
          if(!drop.matches(":hover") && !drop.__v1_parentLi.matches(":hover")) close();
        }, 30);
      });

      drop.addEventListener("mouseleave", function(){
        setTimeout(function(){
          if(!drop.__v1_parentLi.matches(":hover")) close();
        }, 30);
      });

      // Reposiciona em scroll/resize
      window.addEventListener("scroll", function(){ if(drop.classList.contains("v1-open")) position(); }, {passive:true});
      window.addEventListener("resize", function(){ if(drop.classList.contains("v1-open")) position(); });
    });

    // Fecha dropdown ao clicar fora
    document.addEventListener("click", function(e){
      qsa(".v1-dd-menu.v1-open").forEach(function(dd){
        var li = dd.__v1_parentLi;
        if(dd.contains(e.target)) return;
        if(li && li.contains(e.target)) return;
        dd.classList.remove("v1-open");
      });
    });
  }

  // ====== BUSCA DROPDOWN (.boxquery.open) -> move pro body e estiliza igual ======
  function setupSearchDropdown(){
    // A boxquery aparece dinamicamente, então observamos o DOM
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

        var width = Math.min(1180, window.innerWidth - 32);
        var left = Math.max(16, Math.min(window.innerWidth - 16 - width, inputRect.left));

        var top = Math.max(headerRect.bottom + 10, 10);

        box.style.width = width + "px";
        box.style.left = left + "px";
        box.style.top = top + "px";
      }

      // posiciona sempre que abrir
      position();
      window.addEventListener("scroll", position, {passive:true});
      window.addEventListener("resize", position);
    }

    // tenta achar já existente
    var existing = qs(".boxquery");
    if(existing) attachBoxquery(existing);

    // observa criação/abertura
    try{
      var mo = new MutationObserver(function(){
        var box = qs(".boxquery");
        if(box) attachBoxquery(box);
      });
      mo.observe(document.documentElement, {childList:true, subtree:true});
    }catch(e){}
  }

  function start(){
    setupMenuDropdown();
    setupSearchDropdown();
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();

