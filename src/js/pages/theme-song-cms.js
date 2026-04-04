import { apiGet, apiPatch, apiPost, apiDelete } from "../services.js";
import { ArrayEditor } from "../components/ArrayEditor.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/theme-song.php";

const data = await apiGet(API);

ObjectEditor.mount({
  container: "#card-copy",
  label: "Headings & caption",
  data: {
    heading: data.heading,
    title: data.title,
    subtitle: data.subtitle,
    caption: data.caption,
  },
  fields: [
    { key: "heading", label: "Section heading", placeholder: "e.g. Official Theme Song" },
    { key: "title", label: "Song title", placeholder: 'e.g. "Legends Rise…"' },
    { key: "subtitle", label: "Subtitle", placeholder: "e.g. Meta Games OST" },
    { key: "caption", label: "Poster figcaption (screen-reader)", placeholder: "Launching of the Official OST…" },
  ],
  onSave: async (value) => {
    await apiPatch(API, "heading", value.heading);
    await apiPatch(API, "title", value.title);
    await apiPatch(API, "subtitle", value.subtitle);
    await apiPatch(API, "caption", value.caption);
  },
});

ObjectEditor.mount({
  container: "#card-poster",
  label: "Poster image",
  data: data.poster,
  fields: [
    { key: "src", label: "Image src" },
    { key: "alt", label: "Alt text" },
  ],
  onSave: (value) => apiPatch(API, "poster", value),
});

ArrayEditor.mount({
  container: "#card-lyrics",
  label: "Lyric sections",
  items: data.lyrics,
  fields: [
    { key: "label", label: "Label", placeholder: "e.g. Verse 1" },
    {
      key: "text",
      label: "Lines (use | between lines)",
      placeholder: "Line one | Line two",
    },
  ],
  onSave: (index, value) => apiPatch(API, "lyrics", value, index),
  onDelete: (index) => apiDelete(API, "lyrics", index),
  onAdd: (item) => apiPost(API, "lyrics", item),
});
