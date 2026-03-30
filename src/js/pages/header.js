import { apiGet, apiPatch, apiPost, apiDelete } from "../services.js";
import { ArrayEditor } from "../components/ArrayEditor.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/header.php";

const data = await apiGet(API);

// Title — plain scalar field, update only.
// ObjectEditor expects an object, so we wrap the scalar in one.
ObjectEditor.mount({
  container: "#card-title",
  label: "Title",
  data: { title: data.title },
  fields: [
    { key: "title", label: "Banner title", placeholder: "e.g. MetaGames" },
  ],
  // Unwrap the object back to a plain string before sending
  onSave: ({ title }) => apiPatch(API, "title", title),
});

// Colors — scalar string array, full CRUD.
// ArrayEditor scalar mode: pass a single field descriptor with key: null.
ArrayEditor.mount({
  container: "#card-colors",
  label: "Color Stripes",
  items: data.colors,
  scalar: true,
  fields: [
    {
      key: null,
      label: "Colors (Available colors: bg-brand-green, bg-brand-blue, bg-brand-yellow, bg-brand-red, bg-white, bg-black)",
      placeholder: "e.g. bg-brand-green",
    },
  ],
  onSave:   (index, value) => apiPatch(API, "colors", value, index),
  onDelete: (index)        => apiDelete(API, "colors", index),
  onAdd:    (item)         => apiPost(API, "colors", item),
});