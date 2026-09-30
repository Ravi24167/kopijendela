
const CONFIG = {
  whatsapp: "6283851153359",        // format internasional, tanpa + atau 0 di depan
  instagram: "@kopijendelaa",          // username tanpa @
  email: "halo@kopijendela.id",
  waGreeting: "Halo Kopi Jendela, saya mau pesan."
};

const MENU = [
  { name: "Kopi Supriadi", cat: "Coffee", price: 1500000, color: "#C99A6B", desc: "Espresso, susu segar, dan gula aren. Manis pas, cocok buat teman begadang." },
  { name: "sussi jepang khas blitar", cat: "Coffee", price: 17000, color: "#A8764B", desc: "Latte creamy dengan gula aren yang wangi dan legit." },
  { name: "Es Americano", cat: "Coffee", price: 12000, color: "#4A2C1A", desc: "Espresso dan air es. Simpel, segar, dan bikin melek." },
  { name: "Caramel Macchiato", cat: "Coffee", price: 18000, color: "#B98255", desc: "Susu, espresso, dan saus karamel di atasnya." },
  { name: "Cokelat Jendela", cat: "Non-Coffee", price: 15000, color: "#5E3A28", desc: "Cokelat pekat dan susu dingin. Untuk yang belum mau kopi." },
  { name: "Matcha Latte", cat: "Non-Coffee", price: 17000, color: "#8BA968", desc: "Matcha lembut dengan susu, tidak terlalu pahit." },
  { name: "Teh Lemon", cat: "Non-Coffee", price: 10000, color: "#E3B94F", desc: "Teh dingin dengan perasan lemon. Ringan dan segar." }
];

/* =========================================================
   Kode di bawah ini tidak perlu diubah
   ========================================================= */
const waUrl = (text) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text || CONFIG.waGreeting)}`;
const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");

function cupSvg(color) {
  return `<svg viewBox="0 0 64 72" width="64" height="72" aria-hidden="true">
    <path d="M8 14h44l-4 42a6 6 0 0 1-6 5H18a6 6 0 0 1-6-5z" fill="#fff" stroke="#1F3A34" stroke-width="2.5"/>
    <path d="M11 26h38l-2.4 28a3 3 0 0 1-3 2.6H16.4a3 3 0 0 1-3-2.6z" fill="${color}"/>
    <rect x="5" y="8" width="50" height="8" rx="4" fill="#1F3A34"/>
    <path d="M52 26q10 0 8 12t-13 10" fill="none" stroke="#1F3A34" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`;
}

/* Tautan kontak */
document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = waUrl();
  a.target = "_blank";
  a.rel = "noopener noreferrer";
});
document.querySelectorAll("[data-ig]").forEach((a) => {
  a.href = `https://www.instagram.com/${CONFIG.instagram}/`;
});
document.querySelectorAll("[data-mail]").forEach((a) => {
  a.href = `mailto:${CONFIG.email}`;
});
const setText = (sel, text) => document.querySelectorAll(sel).forEach((el) => (el.textContent = text));
setText("[data-wa-label]", "+" + CONFIG.whatsapp);
setText("[data-ig-label]", "@" + CONFIG.instagram);
setText("[data-mail-label]", CONFIG.email);
setText("#year", new Date().getFullYear());

/* Menu */
const grid = document.getElementById("menuGrid");
function renderMenu(cat) {
  const items = cat === "all" ? MENU : MENU.filter((m) => m.cat === cat);
  grid.innerHTML = items.map((m) => `
    <article class="card">
      <div class="card__pane">${cupSvg(m.color)}</div>
      <span class="card__tag">${m.cat}</span>
      <h3>${m.name}</h3>
      <p>${m.desc}</p>
      <div class="card__foot">
        <span class="price">${rupiah(m.price)}</span>
        <a class="btn btn--sm" href="${waUrl(`Halo Kopi Jendela, saya mau pesan ${m.name} (${rupiah(m.price)}).`)}" target="_blank" rel="noopener noreferrer">Pesan</a>
      </div>
    </article>`).join("");
}
renderMenu("all");

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    renderMenu(tab.dataset.cat);
  });
});

/* Navbar mobile */
const burger = document.getElementById("burger");
const menuNav = document.getElementById("menuNav");
function setMenu(open) {
  menuNav.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
}
burger.addEventListener("click", () => setMenu(!menuNav.classList.contains("is-open")));
menuNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* Garis bawah navbar saat di-scroll */
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Animasi masuk ringan untuk langkah pesan & kontak */
const revealEls = document.querySelectorAll(".steps li, .contact__list li");
if ("IntersectionObserver" in window) {
  revealEls.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
}
