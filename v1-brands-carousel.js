(function () {
  "use strict";

  // ✅ Logos (você passou)
  const BRANDS = [
    { name: "Dior", href: "/marca/dior", img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/3-696d51fce6d8a1.png" },
    { name: "Adidas", href: "/marca/adidas", img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/1-696d4e9141cfe1.png" },
    { name: "On Cloud", href: "/marca/on-running", img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/9-696d4e9c616ce1.png" },
    { name: "Louis Vuitton", href: "/marca/louis-vuitton", img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/6-696d4ea7373541.png" },
    { name: "Asics", href: "/marca/asics", img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/2-696d4eb2432091.png" },
    { name: "New Balance", href: "/marca/new-balance", img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/7-696d4ebce74bb1.png" },
    { name: "Nike", href: "/marca/nike", img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/8-696d4ec811b281.png" },
    { name: "Zegna", href: "/marca/ermenegildo-zegna", img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/4-696d4ed2b78831.png" },
    { name: "Gucci", href: "/marca/gucci", img: "https://cdn.sistemawbuy.com.br/arquivos/753edafbb4a85239e8b43a21ea5ee7b7/banners/5-696d4ede9544f1.png" },
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
    if (document.getElementById("v1-brands-style")) return;
    const st = document.createElement("style");
    st.id = "v1-brands-style";
    st.textContent = `
      .v1-brands{max-width:1200px;margin:28px auto;padding:0 16px}
      .v1-brands .v1-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
      .v1-brands .v1-title{
        font-family: Helvetica, Arial, sans-serif;
        font-size:14px;letter-spacing:3px;text-transform:uppercase;color:#111;opacity:.9;
      }
      .v1-brands .v1-track{
        display:flex;gap:14px;overflow:auto;padding:10px 2px 14px;
        scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
      }
      .v1-brands .v1-track::-webkit-scrollbar{height:8px}
      .v1-brands .v1-track::-webkit-scrollbar-thumb{background:rgba(0,0,0,.12);border-radius:999px}

      .v1-brands .v1-card{
        flex:0 0 auto; min-width:170px;
        border-radius:16px;
        border:1px solid rgba(0,0,0,.10);
        background: rgba(255,255,255,.70);
        backdrop-filter: blur(10px);
        scroll-snap-align: start;
        text-decoration:none;
        padding:14px 16px;
        display:flex;align-items:center;justify-content:center;
        transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
      }
      .v1-brands .v1-logo{
        width:120px; height:46px; object-fit:contain; display:block;
        filter: grayscale(1) contrast(1.05);
        opacity:.92;
        transition: transform .25s ease, filter .25s ease, opacity .25s ease;
      }

      /* ✨ Hover */
      .v1-brands .v1-card:hover{
        transform: translateY(-2px) scale(1.03);
        border-color: rgba(0,0,0,.22);
        box-shadow: 0 12px 28px rgba(0,0,0,.10);
      }
      .v1-brands .v1-card:hover .v1-logo{
        transform: scale(1.06);
        filter: grayscale(0) contrast(1.08);
        opacity:1;
      }
      .v1-brands .v1-card:active{transform:scale(.99)}
    `;
    document.head.appendChild(st);
  }

  function removeWrongInstances() {
    document.querySelectorAll(".v1-brands").forEach((n) => n.remove());
  }

  // 👉 achar Newsletter (por texto) e inserir logo acima
  function findNewsletterAnchor() {
    const nodes = Array.from(document.querySelectorAll("section,div,footer")).slice(0, 700);

    for (const el of nodes) {
      const txt = (el.textContent || "").toLowerCase();
      if (txt.includes("newsletter")) {
        return el.closest("section,div,footer") || el;
      }
    }

    // fallback: tenta achar campo de email no rodapé
    const emailInput = document.querySelector('footer input[type="email"], input[type="email"]');
    if (emailInput) {
      return emailInput.closest("section,div,footer") || emailInput;
    }

    return null;
  }

  function buildNode() {
    const sec = document.createElement("section");
    sec.className = "v1-brands";
    sec.innerHTML = `
      <div class="v1-row">
        <div class="v1-title">Marcas</div>
      </div>
      <div class="v1-track" aria-label="Carrossel de marcas">
        ${BRANDS.map(
          (b) => `
          <a class="v1-card" href="${b.href}" aria-label="${b.name}">
            <img class="v1-logo" src="${b.img}" alt="${b.name}" loading="lazy">
          </a>
        `
        ).join("")}
      </div>
    `;
    return sec;
  }

  function inject() {
    if (!isHome()) return false;

    removeWrongInstances();
    injectStyleOnce();

    const anchor = findNewsletterAnchor();
    if (!anchor || !anchor.parentNode) return false;

    // insere logo acima da Newsletter
    anchor.insertAdjacentElement("beforebegin", buildNode());
    return true;
  }

  function start() {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if (inject() || tries > 80) clearInterval(timer);
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

