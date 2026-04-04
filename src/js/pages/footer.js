import { apiGet, apiPatch } from "../services.js";
import { ArrayEditor } from "../components/ArrayEditor.js";
import { ObjectEditor } from "../components/ObjectEditor.js";
import { showToast } from "../utilities.js";

const API = "/api/admin/footer.php";

const data = await apiGet(API);

// ── LOGO ─────────────────────────────────────────────────────────────
ObjectEditor.mount({
  container: "#card-logo",
  label: "Logo",
  data: data.logo,
  fields: [
    { key: "src", label: "Image src",  placeholder: "src/images/eswf-metagames-logo.webp" },
    { key: "alt", label: "Alt text",   placeholder: "e.g. MetaGames Logo" },
  ],
  onSave: (value) => apiPatch(API, "logo", value),
});

// ── BOTTOM BAR ───────────────────────────────────────────────────────
ObjectEditor.mount({
  container: "#card-bottomBar",
  label: "Bottom Bar",
  data: data.bottomBar,
  fields: [
    { key: "copyright", label: "Copyright text", placeholder: "© 2025 MetaGames All Rights Reserved." },
    { key: "credit",    label: "Credit text",     placeholder: "Designed & Developed by: …" },
  ],
  onSave: (value) => apiPatch(API, "bottomBar", value),
});

// ── COLUMNS ──────────────────────────────────────────────────────────
// Each column has a title (ObjectEditor) + a links array (ArrayEditor).
// Columns themselves can be added / deleted.

function mountColumnEditors(columns) {
  const container = document.getElementById("columns-container");
  container.innerHTML = "";

  columns.forEach((column, colIndex) => {
    // ── Create the column card shell ──
    const card = document.createElement("div");
    card.className =
      "bg-surface-card border border-border rounded-xl px-6 py-5 mb-4";
    card.id = `card-column-${colIndex}`;

    card.innerHTML = `
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-semibold">Column ${colIndex + 1}</h2>
        <div class="flex gap-2 items-center">
          <span class="text-[0.7rem] font-bold tracking-wide px-2.5 py-0.5 rounded-full
                       bg-success-bg text-success border border-success">Full CRUD</span>
          <button class="btn btn-ghost-red btn-delete-column text-xs px-2 py-1"
                  data-col-index="${colIndex}">Delete Column</button>
        </div>
      </div>

      <!-- Column title sub-card -->
      <div class="mb-5 pb-5 border-b border-border" id="card-column-title-${colIndex}">
        <p class="text-[0.65rem] font-bold tracking-widest uppercase text-muted mb-2">Column Title</p>
        <div class="skeleton"></div>
      </div>

      <!-- Links array sub-card -->
      <div id="card-column-links-${colIndex}">
        <p class="text-[0.65rem] font-bold tracking-widest uppercase text-muted mb-2">Links</p>
        <div class="skeleton"></div>
      </div>
    `;

    container.appendChild(card);

    // ── Column title — ObjectEditor ──
    ObjectEditor.mount({
      container: `#card-column-title-${colIndex}`,
      label: `Column ${colIndex + 1} Title`,
      data: { title: column.title },
      fields: [
        { key: "title", label: "Title", placeholder: "e.g. Quick Links: (leave blank to hide)" },
      ],
      onSave: ({ title }) =>
        fetch(API, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ field: "columns.title", columnIndex: colIndex, value: title }),
        }).then((r) => r.json()).then((json) => {
          if (json.error) throw new Error(json.error);
          return json;
        }),
    });

    // ── Links — ArrayEditor ──
    ArrayEditor.mount({
      container: `#card-column-links-${colIndex}`,
      label: `Column ${colIndex + 1} Links`,
      items: column.links,
      fields: [
        { key: "text", label: "Link text", placeholder: "e.g. Home" },
        { key: "url",  label: "URL",       placeholder: "#section-id" },
      ],
      onSave: (linkIndex, value) =>
        fetch(API, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            field: "columns.links",
            columnIndex: colIndex,
            index: linkIndex,
            value,
          }),
        }).then((r) => r.json()).then((json) => {
          if (json.error) throw new Error(json.error);
          return json;
        }),

      onDelete: (linkIndex) =>
        fetch(`${API}?field=columns.links&columnIndex=${colIndex}&index=${linkIndex}`, {
          method: "DELETE",
        }).then((r) => r.json()).then((json) => {
          if (json.error) throw new Error(json.error);
          // ArrayEditor expects { items }
          return { items: json.items };
        }),

      onAdd: (item) =>
        fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ field: "columns.links", columnIndex: colIndex, item }),
        }).then((r) => r.json()).then((json) => {
          if (json.error) throw new Error(json.error);
          return { items: json.items };
        }),
    });

    // ── Delete entire column ──
    card.querySelector(".btn-delete-column").addEventListener("click", async (e) => {
      if (!confirm(`Delete Column ${colIndex + 1} and all its links?`)) return;

      const btn = e.currentTarget;
      btn.disabled = true;

      try {
        const res = await fetch(`${API}?field=columns&index=${colIndex}`, {
          method: "DELETE",
        }).then((r) => r.json());

        if (res.error) throw new Error(res.error);

        showToast("Column deleted.");
        mountColumnEditors(res.items); // re-render all columns with updated array
      } catch (err) {
        showToast(err.message, "error");
        btn.disabled = false;
      }
    });
  });
}

// Initial render
mountColumnEditors(data.columns);

// ── ADD COLUMN ───────────────────────────────────────────────────────
document.getElementById("btn-add-column").addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  const titleInput = document.getElementById("new-column-title");
  const title = titleInput.value.trim();

  btn.disabled = true;
  btn.textContent = "…";

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ field: "columns", item: { title, links: [] } }),
    }).then((r) => r.json());

    if (res.error) throw new Error(res.error);

    showToast("Column added!");
    titleInput.value = "";
    mountColumnEditors(res.items);
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "+ Add Column";
  }
});