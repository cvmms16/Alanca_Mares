const sampleEvents = [
  {
    id: 1, name: "Encontro de Música da Mata Sul", category: "Música",
    description: "Uma programação demonstrativa para celebrar artistas e diferentes sonoridades da região.",
    date: "2026-12-05", time: "18:00", location: "Centro de Palmares",
    image: ""
  },
  {
    id: 2, name: "Palco Aberto: Vozes da Cidade", category: "Teatro",
    description: "Exemplo de encontro artístico com apresentações e experiências teatrais.",
    date: "2026-12-12", time: "19:00", location: "Espaço cultural (a confirmar)",
    image: ""
  },
  {
    id: 3, name: "Roda de Cultura Popular", category: "Cultura popular",
    description: "Exemplo de atividade para valorizar tradições, expressões populares e a memória local.",
    date: "2026-12-19", time: "16:00", location: "Praça pública (a confirmar)",
    image: ""
  }
];

const storageKey = "alanca-mares-events";
let events = loadEvents();
let selectedCategory = "Todas";

function loadEvents() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : sampleEvents;
  } catch {
    return sampleEvents;
  }
}

function saveEvents() {
  localStorage.setItem(storageKey, JSON.stringify(events));
}

function formatDate(date) {
  if (!date) return "Data a confirmar";
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function renderEvents() {
  const grid = document.getElementById("event-grid");
  const search = document.getElementById("search-input").value.trim().toLowerCase();
  const category = document.getElementById("category-filter").value;
  const activeCategory = category !== "Todas" ? category : selectedCategory;

  const filtered = events.filter(event => {
    const matchesCategory = activeCategory === "Todas" || event.category === activeCategory;
    const text = `${event.name} ${event.location} ${event.description}`.toLowerCase();
    return matchesCategory && text.includes(search);
  });

  document.getElementById("event-count").textContent =
    `${filtered.length} ${filtered.length === 1 ? "evento" : "eventos"}`;
  document.getElementById("empty-state").hidden = filtered.length !== 0;

  grid.innerHTML = filtered.map(event => `
    <article class="event-card">
      <div class="event-image">
        ${event.image
          ? `<img src="${escapeHTML(event.image)}" alt="${escapeHTML(event.name)}" onerror="this.remove()">`
          : `<div class="image-placeholder">✳</div>`}
      </div>
      <div class="event-body">
        <span class="event-category">${escapeHTML(event.category)}</span>
        <h3>${escapeHTML(event.name)}</h3>
        <p>${escapeHTML(event.description)}</p>
        <div class="event-details">
          <span>◷ ${formatDate(event.date)} · ${escapeHTML(event.time)}</span>
          <span>⌖ ${escapeHTML(event.location)}</span>
        </div>
        <div class="event-card-actions">
          <button class="details-button" data-details="${event.id}">Ver detalhes ↗</button>
          ${event.id > 3 ? `<button class="delete-button" data-delete="${event.id}">Excluir</button>` : ""}
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-details]").forEach(button => {
    button.addEventListener("click", () => showDetails(Number(button.dataset.details)));
  });
  grid.querySelectorAll("[data-delete]").forEach(button => {
    button.addEventListener("click", () => deleteEvent(Number(button.dataset.delete)));
  });
}

function showDetails(id) {
  const event = events.find(item => item.id === id);
  if (!event) return;
  const dialog = document.getElementById("event-dialog");
  const image = document.getElementById("dialog-image");
  image.src = event.image || "";
  image.hidden = !event.image;
  document.getElementById("dialog-category").textContent = event.category;
  document.getElementById("dialog-title").textContent = event.name;
  document.getElementById("dialog-description").textContent = event.description;
  document.getElementById("dialog-meta").textContent =
    `Data: ${formatDate(event.date)} · Horário: ${event.time} · Local: ${event.location}`;
  dialog.showModal();
}

function deleteEvent(id) {
  if (!confirm("Deseja excluir este evento da demonstração?")) return;
  events = events.filter(event => event.id !== id);
  saveEvents();
  renderEvents();
}

document.getElementById("search-input").addEventListener("input", renderEvents);
document.getElementById("category-filter").addEventListener("change", () => {
  selectedCategory = "Todas";
  document.querySelectorAll(".chip").forEach(chip => chip.classList.toggle("active", chip.dataset.category === "Todas"));
  renderEvents();
});

document.getElementById("category-chips").addEventListener("click", event => {
  const button = event.target.closest(".chip");
  if (!button) return;
  selectedCategory = button.dataset.category;
  document.getElementById("category-filter").value = "Todas";
  document.querySelectorAll(".chip").forEach(chip => chip.classList.toggle("active", chip === button));
  renderEvents();
});

document.getElementById("event-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const newEvent = {
    id: Date.now(),
    name: data.get("name").trim(),
    category: data.get("category"),
    description: data.get("description").trim(),
    date: data.get("date"),
    time: data.get("time"),
    location: data.get("location").trim(),
    image: data.get("image").trim()
  };
  events.unshift(newEvent);
  saveEvents();
  form.reset();
  renderEvents();
  document.getElementById("form-feedback").textContent = "Evento adicionado à agenda deste navegador!";
  document.getElementById("agenda").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("dialog-close").addEventListener("click", () => {
  document.getElementById("event-dialog").close();
});
document.getElementById("event-dialog").addEventListener("click", event => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

renderEvents();
