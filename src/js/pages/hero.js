import { apiGet, apiPatch, apiPost, apiDelete } from "../services.js";
import { ArrayEditor } from "../components/ArrayEditor.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/hero.php";

const data = await apiGet(API);

ObjectEditor.mount({
  container: "#card-background",
  label: "Background image",
  data: data.backgroundImage,
  fields: [
    { key: "src", label: "Image src" },
    { key: "alt", label: "Alt text" },
  ],
  onSave: (value) => apiPatch(API, "backgroundImage", value),
});

ObjectEditor.mount({
  container: "#card-cta",
  label: "Welcome line",
  data: data.cta,
  fields: [
    { key: "text", label: "Main heading (shown as hero title)" },
  ],
  onSave: (value) => apiPatch(API, "cta", value),
});

ObjectEditor.mount({
  container: "#card-catchphrase",
  label: "Tagline & paragraph",
  data: data.catchphrase,
  fields: [
    { key: "text", label: "Italic tagline" },
    { key: "paragraph", label: "Supporting paragraph" },
  ],
  onSave: (value) => apiPatch(API, "catchphrase", value),
});

ArrayEditor.mount({
  container: "#card-cards",
  label: "Feature cards",
  items: data.cards,
  fields: [
    { key: "imageSrc", label: "Card image src" },
    { key: "imageAlt", label: "Card image alt" },
    { key: "text", label: "Button text" },
    { key: "url", label: "Link URL", placeholder: "#section-id" },
  ],
  onSave: (index, value) => apiPatch(API, "cards", value, index),
  onDelete: (index) => apiDelete(API, "cards", index),
  onAdd: (item) => apiPost(API, "cards", item),
});
