import { apiGet, apiPatch } from "../services.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/news.php";

const data = await apiGet(API);

ObjectEditor.mount({
  container: "#card-title",
  label: "Title",
  data: { title: data.title },
  fields: [
    { key: "title", label: "Section heading", placeholder: "e.g. News & Updates" },
  ],
  onSave: ({ title }) => apiPatch(API, "title", title),
});

ObjectEditor.mount({
  container: "#card-image",
  label: "Image",
  data: data.image,
  fields: [
    { key: "src", label: "Image src" },
    { key: "alt", label: "Alt text" },
  ],
  onSave: (value) => apiPatch(API, "image", value),
});
