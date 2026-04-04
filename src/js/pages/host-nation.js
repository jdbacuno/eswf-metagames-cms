import { apiGet, apiPatch, apiPost, apiDelete } from "../services.js";
import { ArrayEditor } from "../components/ArrayEditor.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/host-nation.php";

const data = await apiGet(API);

// Section Header — object field (title + subtitle), update only
ObjectEditor.mount({
  container: "#card-title",
  label: "Section Header",
  data: { title: data.title, subtitle: data.subtitle },
  fields: [
    { key: "title",    label: "Section title",  placeholder: "e.g. Host Nations & Partners" },
    { key: "subtitle", label: "Subtitle / label", placeholder: "e.g. Host Cities:" },
  ],
  onSave: (value) => {
    // title and subtitle are top-level scalar strings, so save each separately
    return Promise.all([
      apiPatch(API, "title",    value.title),
      apiPatch(API, "subtitle", value.subtitle),
    ]);
  },
});

// Flag Images — array field, full CRUD
ArrayEditor.mount({
  container: "#card-flagImages",
  label: "Flag Images",
  items: data.flagImages,
  fields: [
    { key: "src", label: "Image src", placeholder: "src/images/ph-flag.webp" },
    { key: "alt", label: "Alt text",  placeholder: "e.g. Manila, Philippines" },
  ],
  onSave:   (index, value) => apiPatch(API, "flagImages",  value, index),
  onDelete: (index)        => apiDelete(API, "flagImages", index),
  onAdd:    (item)         => apiPost(API, "flagImages",   item),
});

// Partner Images — array field, full CRUD
ArrayEditor.mount({
  container: "#card-partnerImages",
  label: "Partner Images",
  items: data.partnerImages,
  fields: [
    { key: "src", label: "Image src", placeholder: "src/images/eswf.webp" },
    { key: "alt", label: "Alt text",  placeholder: "e.g. ESWF" },
  ],
  onSave:   (index, value) => apiPatch(API, "partnerImages",  value, index),
  onDelete: (index)        => apiDelete(API, "partnerImages", index),
  onAdd:    (item)         => apiPost(API, "partnerImages",   item),
});