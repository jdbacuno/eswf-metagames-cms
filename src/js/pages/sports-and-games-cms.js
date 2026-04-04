import { apiGet, apiPatch, apiPost, apiDelete } from "../services.js";
import { ArrayEditor } from "../components/ArrayEditor.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/sports-and-games.php";

const data = await apiGet(API);

ObjectEditor.mount({
  container: "#card-title",
  label: "Section title",
  data: { title: data.title },
  fields: [{ key: "title", label: "Title", placeholder: "e.g. Sports & Games" }],
  onSave: ({ title }) => apiPatch(API, "title", title),
});

ArrayEditor.mount({
  container: "#card-slides",
  label: "Slides",
  items: data.slides,
  fields: [
    { key: "imageSrc", label: "Image src", placeholder: "src/images/..." },
    { key: "imageAlt", label: "Image alt" },
    { key: "title", label: "Slide title" },
    {
      key: "description",
      label: "Description (use | between lines)",
      placeholder: "Line one | Line two",
    },
  ],
  onSave: (index, value) => apiPatch(API, "slides", value, index),
  onDelete: (index) => apiDelete(API, "slides", index),
  onAdd: (item) => apiPost(API, "slides", item),
});
