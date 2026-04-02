import { apiGet, apiPatch } from "../services.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/marquee.php";

const data = await apiGet(API);

ObjectEditor.mount({
  container: "#card-text",
  label: "Text",
  data: { text: data.text },
  fields: [
    {
      key: "text",
      label: "Marquee text",
      placeholder: "e.g. Mastering the MetaGames of Life, One Move at a Time.",
    },
  ],
  onSave: ({ text }) => apiPatch(API, "text", text),
});

