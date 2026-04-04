import { apiGet, apiPatch, apiPost, apiDelete } from "../services.js";
import { ArrayEditor } from "../components/ArrayEditor.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/meta-movement.php";

const data = await apiGet(API);

ObjectEditor.mount({
  container: "#card-headings",
  label: "Title & subtitle",
  data: { title: data.title, subtitle: data.subtitle },
  fields: [
    { key: "title", label: "Section title", placeholder: "e.g. The Meta Movement" },
    { key: "subtitle", label: "Subtitle", placeholder: "e.g. The Rise of the Meta Movement" },
  ],
  onSave: async (value) => {
    await apiPatch(API, "title", value.title);
    await apiPatch(API, "subtitle", value.subtitle);
  },
});

ArrayEditor.mount({
  container: "#card-colors",
  label: "Strip colors",
  items: data.colors,
  scalar: true,
  fields: [{ key: null, label: "Tailwind class", placeholder: "e.g. bg-brand-green" }],
  onSave: (index, value) => apiPatch(API, "colors", value, index),
  onDelete: (index) => apiDelete(API, "colors", index),
  onAdd: (item) => apiPost(API, "colors", item),
});

ObjectEditor.mount({
  container: "#card-watchCard",
  label: "Watch card (featured)",
  data: data.watchCard,
  fields: [
    { key: "image", label: "Image src" },
    { key: "alt", label: "Alt text" },
    { key: "text", label: "Heading" },
    { key: "description", label: "Description" },
  ],
  onSave: (value) => apiPatch(API, "watchCard", value),
});

ObjectEditor.mount({
  container: "#card-vrheadsetCard",
  label: "VR headset card",
  data: data.vrheadsetCard,
  fields: [
    { key: "image", label: "Image src" },
    { key: "alt", label: "Alt text" },
    { key: "text", label: "Heading" },
  ],
  onSave: (value) => apiPatch(API, "vrheadsetCard", value),
});

ObjectEditor.mount({
  container: "#card-girlCostumeCard",
  label: "Cultural costume card",
  data: data.girlCostumeCard,
  fields: [
    { key: "image", label: "Image src" },
    { key: "alt", label: "Alt text" },
    { key: "text", label: "Heading" },
  ],
  onSave: (value) => apiPatch(API, "girlCostumeCard", value),
});

ObjectEditor.mount({
  container: "#card-playFairCard",
  label: "Play fair card",
  data: data.playFairCard,
  fields: [
    { key: "image", label: "Image src" },
    { key: "alt", label: "Alt text" },
    { key: "text", label: "Heading" },
  ],
  onSave: (value) => apiPatch(API, "playFairCard", value),
});

ArrayEditor.mount({
  container: "#card-audienceBar",
  label: "Audience labels",
  items: data.audienceBar,
  scalar: true,
  fields: [{ key: null, label: "Label", placeholder: "e.g. Athletes" }],
  onSave: (index, value) => apiPatch(API, "audienceBar", value, index),
  onDelete: (index) => apiDelete(API, "audienceBar", index),
  onAdd: (item) => apiPost(API, "audienceBar", item),
});
