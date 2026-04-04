import { apiGet, apiPatch, apiPost, apiDelete } from "../services.js";
import { ArrayEditor } from "../components/ArrayEditor.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/metagames-emblems.php";

const data = await apiGet(API);

ObjectEditor.mount({
  container: "#card-title",
  label: "Section title",
  data: { title: data.title },
  fields: [{ key: "title", label: "Title", placeholder: "e.g. MetaGames Emblem & Symbolism" }],
  onSave: ({ title }) => apiPatch(API, "title", title),
});

ObjectEditor.mount({
  container: "#card-motto",
  label: "Motto",
  data: { motto: data.motto },
  fields: [
    {
      key: "motto",
      label: "Italic tagline under the description",
      placeholder: "One symbol. Many sports…",
    },
  ],
  onSave: ({ motto }) => apiPatch(API, "motto", motto),
});

ObjectEditor.mount({
  container: "#card-logo",
  label: "Center logo",
  data: data.logo,
  fields: [
    { key: "src", label: "Image src" },
    { key: "alt", label: "Alt text" },
  ],
  onSave: (value) => apiPatch(API, "logo", value),
});

ArrayEditor.mount({
  container: "#card-emblems",
  label: "Wheel segments",
  items: data.emblems,
  fields: [
    { key: "color", label: "Color name", placeholder: "e.g. Green (used for contrast rules)" },
    { key: "desc", label: "Short description" },
    { key: "background", label: "Card background", placeholder: "var(--green) or #hex" },
  ],
  onSave: (index, value) => apiPatch(API, "emblems", value, index),
  onDelete: (index) => apiDelete(API, "emblems", index),
  onAdd: (item) => apiPost(API, "emblems", item),
});
