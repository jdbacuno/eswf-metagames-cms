import { apiGet, apiPatch, apiPost, apiDelete } from "../services.js";
import { ArrayEditor } from "../components/ArrayEditor.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/navbar.php";

const data = await apiGet(API);

// Logo — object field, update only
ObjectEditor.mount({
  container: "#card-logo",
  label: "Logo",
  data: data.logo,
  fields: [
    { key: "src", label: "Image src" },
    { key: "alt", label: "Alt text" },
  ],
  onSave: (value) => apiPatch(API, "logo", value),
});

// CTA — object field, update only
ObjectEditor.mount({
  container: "#card-cta",
  label: "CTA Button",
  data: data.cta,
  fields: [
    { key: "text", label: "Button text" },
    { key: "url", label: "URL" },
  ],
  onSave: (value) => apiPatch(API, "cta", value),
});

// Links — array field, full CRUD
ArrayEditor.mount({
  container: "#card-links",
  label: "Navigation Links",
  items: data.links,
  fields: [
    { key: "text", label: "Link text", placeholder: "e.g. About Us" },
    { key: "url", label: "URL", placeholder: "#about-us" },
  ],
  onSave: (index, value) => apiPatch(API, "links", value, index),
  onDelete: (index) => apiDelete(API, "links", index),
  onAdd: (item) => apiPost(API, "links", item),
});
