import { initSportsGamesInteractions } from '../main.js';

const DATA_SPORTSANDGAMES = "/api/public/get-section.php?section=sports-and-games";

function slideImage(slide) {
  if (slide.image?.src) {
    return { src: slide.image.src, alt: slide.image.alt ?? '' };
  }
  return { src: slide.imageSrc ?? '', alt: slide.imageAlt ?? '' };
}

function descriptionLines(slide) {
  const d = slide.description;
  if (Array.isArray(d)) return d;
  if (typeof d === 'string') {
    return d.split('|').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

export const loadSportsAndGames = async () => {
  try {
    const response = await fetch(DATA_SPORTSANDGAMES);
    if (!response.ok) throw new Error("Data not found.");
    const data = await response.json();
    renderSportsAndGames(data);
  } catch (err) {
    console.error("Error:", err);
  }
};

const renderSportsAndGames = (data) => {
  const sportsAndGames = document.querySelector("#sports-and-games");
  const { title, slides } = data;

  const slidesHtml = slides.map((slide) => {
    const img = slideImage(slide);
    const desc = descriptionLines(slide);
    const aria = (slide.title || desc[0] || "Slide").replace(/"/g, '&quot;');
    return `
      <article
            class="sports-slide min-w-full flex items-stretch relative h-[260px] overflow-hidden max-md:h-[220px] max-[480px]:h-[180px] max-[360px]:h-[160px]"
            style="
              background: linear-gradient(
                to right,
                #0d2a5e 0%,
                #1565c0 30%,
                #1e88e5 45%,
                rgba(30, 136, 229, 0.5) 52%,
                rgba(30, 136, 229, 0.15) 58%,
                rgba(30, 136, 229, 0) 65%,
                rgba(30, 136, 229, 0) 100%
              );
            "
            aria-label="${aria}"
          >
            <div
              class="flex-[0_0_50%] flex flex-col justify-center py-8 px-6 pl-20 relative z-[1] max-md:flex-[0_0_55%] max-md:py-5 max-md:px-4 max-md:pl-14 max-[480px]:flex-[0_0_60%] max-[480px]:py-4 max-[480px]:px-3 max-[480px]:pl-[50px] max-[360px]:flex-[0_0_65%] max-[360px]:py-3 max-[360px]:pl-11"
            >
              <h3
                class="text-[clamp(1.3rem,2.5vw,1.9rem)] font-extrabold text-white mb-2 leading-[1.2] max-[480px]:text-[1rem]"
              >
                ${slide.title}
              </h3>
              <p
                class="text-[clamp(0.8rem,1.4vw,0.95rem)] text-white/85 mb-5 leading-[1.5] max-[480px]:text-[0.75rem] max-[480px]:mb-3"
              >
                ${desc.join("<br>")}
              </p>
              <a href="#" class="inline-block py-[9px] px-6 border-2 border-white text-white text-[0.85rem] font-semibold no-underline rounded-md bg-transparent w-fit transition- duration-200 hover:bg-white hover:text-brand-blue max-[480px]:py-[7px] max-[480px]:px-4 max-[480px]:text-[0.78rem]"
                >View Details</a
              >
            </div>
            <figure
              class="flex-[0_0_50%] m-0 overflow-hidden max-md:flex-[0_0_45%] max-[480px]:flex-[0_0_40%] max-[360px]:flex-[0_0_35%]"
            >
              <img
                src="${img.src}"
                alt="${(img.alt || '').replace(/"/g, '&quot;')}"
                class="sports-mask w-full h-full object-cover object-center block"
              />
            </figure>
          </article>
    `;
  }).join('');

  const dotsHtml = slides
    .map(
      (_, i) => `
          <button
            class="sports-dot ${i === 0 ? "active" : ""} w-2 h-2 rounded-full border-none bg-white/40 cursor-pointer p-0 transition-all duration-200 [&.active]:bg-white [&.active]:scale-[1.3]"
            role="tab"
            aria-selected="${i === 0 ? "true" : "false"}"
            aria-label="Slide ${i + 1}"
          ></button>`,
    )
    .join('');

  sportsAndGames.innerHTML = `
    <div class="w-full">
      <h2 id="sports-heading" class="text-[clamp(1.4rem,3vw,2rem)] font-extrabold text-white mb-5 pl-10 max-md:pl-5 max-[480px]:pl-[14px]">
        ${title}
      </h2>

      <div class="relative overflow-hidden w-full">
        <div
          class="sports-carousel__track flex transition-transform duration-500 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] will-change-transform"
        >
        ${slidesHtml}
        </div>

        <button
          class="sports-carousel__btn sports-carousel__btn--prev absolute top-1/2 -translate-y-1/2 z-10 left-[14px] bg-white/15 border-2 border-white/50 text-white w-[38px] h-[38px] rounded-full text-2xl leading-none cursor-pointer flex items-center justify-center transition-colors duration-200 backdrop-blur-sm hover:bg-white/30 max-md:left-2 max-[480px]:w-7 max-[480px]:h-7 max-[480px]:text-base max-[480px]:left-[6px]"
          aria-label="Previous slide"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button
          class="sports-carousel__btn sports-carousel__btn--next absolute top-1/2 -translate-y-1/2 z-10 right-[14px] bg-white/15 border-2 border-white/50 text-white w-[38px] h-[38px] rounded-full text-2xl leading-none cursor-pointer flex items-center justify-center transition-colors duration-200 backdrop-blur-sm hover:bg-white/30 max-md:right-2 max-[480px]:w-7 max-[480px]:h-7 max-[480px]:text-base max-[480px]:right-[6px]"
          aria-label="Next slide"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>

        <div
          class="absolute bottom-[14px] left-1/2 -translate-x-1/2 flex gap-2 z-10"
          role="tablist"
        >
        ${dotsHtml}
        </div>
      </div>
    </div>
  `;

  initSportsGamesInteractions();
};
