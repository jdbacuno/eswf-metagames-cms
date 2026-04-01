import { apiGet, apiPatch, apiPost, apiDelete } from "../services.js";
import { ArrayEditor } from "../components/ArrayEditor.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/hero.php";

const data = await apiGet(API);

// Title — simple string field
ObjectEditor.mount({
  container: "#card-title",
  label: "Hero Title",
  data: { value: data.title },
  fields: [
    { key: "value", label: "Title", placeholder: "Welcome to ESWF MetaGames" },
  ],
  onSave: (obj) => apiPatch(API, "title", obj.value),
});

// Subtitle — simple string field
ObjectEditor.mount({
  container: "#card-subtitle",
  label: "Hero Subtitle",
  data: { value: data.subtitle },
  fields: [
    { key: "value", label: "Subtitle", placeholder: "The Future of Competitive Gaming" },
  ],
  onSave: (obj) => apiPatch(API, "subtitle", obj.value),
});

// Description — simple string field
ObjectEditor.mount({
  container: "#card-description",
  label: "Hero Description",
  data: { value: data.description },
  fields: [
    { key: "value", label: "Description", placeholder: "Enter hero description..." },
  ],
  onSave: (obj) => apiPatch(API, "description", obj.value),
});

// Primary CTA — object field
ObjectEditor.mount({
  container: "#card-cta-primary",
  label: "Primary CTA",
  data: data.cta_primary,
  fields: [
    { key: "text", label: "Button text", placeholder: "Join Now" },
    { key: "url", label: "URL", placeholder: "#join" },
  ],
  onSave: (value) => apiPatch(API, "cta_primary", value),
});

// Secondary CTA — object field
ObjectEditor.mount({
  container: "#card-cta-secondary",
  label: "Secondary CTA",
  data: data.cta_secondary,
  fields: [
    { key: "text", label: "Button text", placeholder: "Learn More" },
    { key: "url", label: "URL", placeholder: "#about" },
  ],
  onSave: (value) => apiPatch(API, "cta_secondary", value),
});

// Background Image — object field
ObjectEditor.mount({
  container: "#card-background",
  label: "Background Image",
  data: data.background_image,
  fields: [
    { key: "src", label: "Image src", placeholder: "src/images/hero-bg.webp" },
    { key: "alt", label: "Alt text", placeholder: "Hero background" },
  ],
  onSave: (value) => apiPatch(API, "background_image", value),
});

// Features — array field, full CRUD
ArrayEditor.mount({
  container: "#card-features",
  label: "Hero Features",
  items: data.features,
  fields: [
    { key: "icon", label: "Icon class", placeholder: "fa-solid fa-trophy" },
    { key: "title", label: "Feature title", placeholder: "Feature Title" },
    { key: "description", label: "Description", placeholder: "Feature description" },
  ],
  onSave: (index, value) => apiPatch(API, "features", value, index),
  onDelete: (index) => apiDelete(API, "features", index),
  onAdd: (item) => apiPost(API, "features", item),
});
