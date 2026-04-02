import { apiGet, apiPatch, apiPost, apiDelete } from "../services.js";
import { ArrayEditor } from "../components/ArrayEditor.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/what-are-metagames.php";

const data = await apiGet(API);

// Title — plain scalar field, update only.
ObjectEditor.mount({
  container: "#card-title",
  label: "Title",
  data: { title: data.title },
  fields: [{ key: "title", label: "Section title", placeholder: "e.g. What are MetaGames" }],
  onSave: ({ title }) => apiPatch(API, "title", title),
});

// Text — plain scalar field, update only.
ObjectEditor.mount({
  container: "#card-text",
  label: "Paragraph",
  data: { text: data.text },
  fields: [
    {
      key: "text",
      label: "Section paragraph",
      placeholder: "Short description shown under the title",
    },
  ],
  onSave: ({ text }) => apiPatch(API, "text", text),
});

// binaryNum — object field, update only
ObjectEditor.mount({
  container: "#card-binaryNum",
  label: "Background image",
  data: data.binaryNum,
  fields: [
    { key: "src", label: "Image src" },
    { key: "alt", label: "Alt text" },
  ],
  onSave: (value) => apiPatch(API, "binaryNum", value),
});

// athleteVr — object field, update only
ObjectEditor.mount({
  container: "#card-athleteVr",
  label: "Person image",
  data: data.athleteVr,
  fields: [
    { key: "src", label: "Image src" },
    { key: "alt", label: "Alt text" },
  ],
  onSave: (value) => apiPatch(API, "athleteVr", value),
});

// pillars — array field, full CRUD
ArrayEditor.mount({
  container: "#card-pillars",
  label: "Pillars",
  items: data.pillars,
  fields: [
    {
      key: "color",
      label: "Tailwind class",
      placeholder: "e.g. bg-brand-green",
    },
    {
      key: "text",
      label: "Label",
      placeholder: "e.g. LIFE",
    },
  ],
  onSave: (index, value) => apiPatch(API, "pillars", value, index),
  onDelete: (index) => apiDelete(API, "pillars", index),
  onAdd: (item) => apiPost(API, "pillars", item),
});

