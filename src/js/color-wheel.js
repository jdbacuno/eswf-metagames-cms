const DEFAULT_EMBLEMS = [
  {
    color: "Green",
    desc: "Multi Cultural Sports",
    background: "var(--green)",
  },
  { color: "Blue", desc: "Electronic Sports", background: "var(--blue)" },
  {
    color: "Yellow",
    desc: "Traditional Sports",
    background: "var(--yellow)",
  },
  {
    color: "Red",
    desc: "Active/Digital/Virtual Sports",
    background: "var(--red)",
  },
  { color: "White", desc: "The ESWF Member Nations", background: "#ffffff" },
  { color: "Black", desc: "The Meta Movement", background: "#000000" },
  {
    color: "Grey",
    desc: "Professional & Amateur Sports",
    background: "var(--slate)",
  },
];

/**
 * @param {{ emblems?: Array<{ color: string; desc: string; background: string }>; motto?: string }} [options]
 */
export function initColorwheel(options = {}) {
  const initialize = () => {
    const emblemData =
      Array.isArray(options.emblems) && options.emblems.length > 0
        ? options.emblems
        : DEFAULT_EMBLEMS;

    const mottoEl = document.querySelector(".emblems__motto");
    if (mottoEl && typeof options.motto === "string" && options.motto.length) {
      mottoEl.textContent = options.motto;
    }

    let currentIndex = 0;
    const step = 360 / emblemData.length;

    const wheel = document.querySelector(".wheel");
    const card = document.querySelector(".emblems__card");
    const colorName = document.querySelector(".emblems__color-name");
    const colorDesc = document.querySelector(".emblems__description");
    const nextBtn = document.querySelector(".emblems__btn--next");
    const prevBtn = document.querySelector(".emblems__btn--prev");

    if (!wheel || !card || !colorName || !colorDesc || !nextBtn || !prevBtn) {
      return;
    }

    function updateEmblem(index) {
      currentIndex = (index + emblemData.length) % emblemData.length;
      const activeData = emblemData[currentIndex];

      const isMobile = window.innerWidth < 640;

      const pointerOffset = isMobile ? 180 : 90;
      const rotation = -(currentIndex * step) + (pointerOffset - step / 2);

      wheel.style.transform = `rotate(${rotation}deg)`;

      card.style.background = activeData.background;

      colorName.textContent = activeData.color;
      colorDesc.textContent = activeData.desc;

      if (activeData.color === "White" || activeData.color === "Yellow") {
        card.style.color = "#000000";
      } else {
        card.style.color = "#ffffff";
      }

      if (activeData.color === "White") {
        prevBtn.style.borderColor = "#000";
        prevBtn.style.color = "#000";
        nextBtn.style.borderColor = "#000";
        nextBtn.style.color = "#000";
      } else if (activeData.color === "Black") {
        prevBtn.style.borderColor = "#fff";
        prevBtn.style.color = "#fff";
        nextBtn.style.borderColor = "#fff";
        nextBtn.style.color = "#fff";
      } else {
        prevBtn.style.borderColor = "#fff";
        prevBtn.style.color = "#fff";
        nextBtn.style.borderColor = "#fff";
        nextBtn.style.color = "#fff";
      }
    }

    nextBtn.addEventListener("click", () => updateEmblem(currentIndex + 1));
    prevBtn.addEventListener("click", () => updateEmblem(currentIndex - 1));

    updateEmblem(0);
    window.addEventListener("resize", () => updateEmblem(currentIndex));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
}
