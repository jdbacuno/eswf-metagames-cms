const DATA_METAMOVEMENT = "./src/data/meta-movement.json";

export const loadMetaMovement = async () => {
  try {
    const response = await fetch(DATA_METAMOVEMENT);
    if (!response.ok) throw new Error("Data not found.");
    const data = await response.json();
    renderMetaMovement(data);
  } catch (err) {
    console.error("Error:", err);
  }
};

const renderMetaMovement = (data) => {
  const metaMovement = document.querySelector("#meta-movement");
  const {
    title,
    subtitle,
    colors,
    watchCard,
    vrheadsetCard,
    girlCostumeCard,
    playFairCard,
    audienceBar,
  } = data;

  // Color Loop
  const colorHtml = colors.map(color => `<span class="flex-1 ${color}"></span>`).join('')

  // Audience Bar Loop
  const audienceBarHtml = audienceBar.map(
    (text) => `<a
              href="#"
              class="inline-block flex-1 py-[7px] border-2 border-white rounded-md text-white text-center text-[clamp(0.8rem,1.3vw,0.92rem)] font-semibold no-underline whitespace-nowrap transition-all duration-200 hover:bg-white hover:text-brand-blue max-[480px]:flex-[1_1_calc(50%-8px)] max-[480px]:py-[10px] max-[480px]:px-1 max-[480px]:text-[0.75rem] max-[480px]:whitespace-normal">
              ${text}
              </a>
              `
            ).join('');

  metaMovement.innerHTML = `
     <div
          class="flex items-center gap-5 pt-5 px-10 max-md:pt-4 max-md:px-5 max-[480px]:pt-[14px] max-[480px]:px-[14px]"
        >
          <h2
            id="meta-movement-heading"
            class="text-[clamp(1rem,2vw,1.3rem)] font-extrabold text-white whitespace-nowrap flex-shrink-0"
          >
            ${title}
          </h2>
          <div
            class="flex flex-1 h-[15px] overflow-hidden gap-[3px]"
            aria-hidden="true"
          >
            ${colorHtml}
          </div>
        </div>

        <div
          class="max-w-[1100px] mx-auto py-6 px-10 pb-8 max-md:px-5 max-md:py-5 max-md:pb-7 max-[480px]:px-[14px] max-[480px]:py-4 max-[480px]:pb-6"
        >
          <h3
            class="text-[clamp(1.1rem,2.2vw,1.5rem)] font-extrabold text-white mb-5"
          >
            ${subtitle}
          </h3>

          <div class="relative">
            <button
              class="meta-carousel__btn meta-carousel__btn--prev absolute top-1/2 -translate-y-1/2 z-10 -left-[52px] bg-white/15 border-2 border-white/50 text-white w-[38px] h-[38px] rounded-full text-2xl cursor-pointer flex items-center justify-center transition-colors duration-200 backdrop-blur-sm hover:bg-white/30 max-lg:-left-3 max-md:hidden"
              aria-label="Previous slide"
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div class="flex overflow-hidden">
              <!-- Slide 1 -->
              <div class="meta-slide active hidden min-w-full [&.active]:block">
                <div
                  class="grid grid-cols-2 gap-[10px] h-[380px] max-md:grid-cols-1 max-md:h-auto max-[480px]:h-auto"
                >
                  <article
                    class="rounded-[10px] overflow-hidden bg-[#1e2a3a] flex flex-col h-full max-md:h-[260px] max-[480px]:h-[220px]"
                  >
                    <figure class="flex-1 overflow-hidden">
                      <img
                        src="${watchCard.image}"
                        alt="${watchCard.alt}"
                        class="w-full h-full object-cover block"
                      />
                    </figure>
                    <div class="px-4 py-[14px] bg-white">
                      <h4
                        class="text-[clamp(0.82rem,1.3vw,0.95rem)] font-bold text-brand-blue leading-[1.3]"
                      >
                        ${watchCard.text}
                      </h4>
                      <p
                        class="text-[clamp(0.72rem,1.1vw,0.82rem)] text-brand-blue leading-[1.5] mt-[5px]"
                      >
                        ${watchCard.description}
                      </p>
                    </div>
                  </article>

                  <div
                    class="grid grid-cols-2 gap-[10px] max-md:h-[260px] max-[480px]:h-[220px]"
                  >
                    <article
                      class="relative overflow-hidden h-full rounded-[10px] bg-[#1e2a3a]"
                    >
                      <figure class="w-full h-full m-0">
                        <img
                          src="${vrheadsetCard.image}"
                          alt="${vrheadsetCard.alt}"
                          class="w-full h-full object-cover block"
                        />
                      </figure>
                      <div
                        class="absolute bottom-0 left-0 right-0 px-3 py-[10px]"
                        style="
                          background: linear-gradient(
                            to top,
                            rgba(0, 0, 0, 0.75) 0%,
                            transparent 100%
                          );
                        "
                      >
                        <h4
                          class="text-[clamp(0.82rem,1.3vw,0.95rem)] font-bold text-white leading-[1.3]"
                        >
                          ${vrheadsetCard.text}
                        </h4>
                      </div>
                    </article>
                    <article
                      class="relative overflow-hidden h-full rounded-[10px] bg-[#1e2a3a]"
                    >
                      <figure class="w-full h-full m-0">
                        <img
                          src="${girlCostumeCard.image}"
                          alt="${girlCostumeCard.alt}"
                          class="w-full h-full object-cover block"
                        />
                      </figure>
                      <div
                        class="absolute bottom-0 left-0 right-0 px-3 py-[10px]"
                        style="
                          background: linear-gradient(
                            to top,
                            rgba(0, 0, 0, 0.75) 0%,
                            transparent 100%
                          );
                        "
                      >
                        <h4
                          class="text-[clamp(0.82rem,1.3vw,0.95rem)] font-bold text-white leading-[1.3]"
                        >
                          ${girlCostumeCard.text}
                        </h4>
                      </div>
                    </article>
                    <article
                      class="relative overflow-hidden h-full rounded-[10px] bg-[#1e2a3a]"
                    >
                      <figure class="w-full h-full m-0">
                        <img
                          src="${playFairCard.image}"
                          alt="${playFairCard.alt}"
                          class="w-full h-full object-cover block"
                        />
                      </figure>
                      <div
                        class="absolute bottom-0 left-0 right-0 px-3 py-[10px]"
                        style="
                          background: linear-gradient(
                            to top,
                            rgba(0, 0, 0, 0.75) 0%,
                            transparent 100%
                          );
                        "
                      >
                        <h4
                          class="text-[clamp(0.82rem,1.3vw,0.95rem)] font-bold text-white leading-[1.3]"
                        >
                          ${playFairCard.text}
                        </h4>
                      </div>
                    </article>
                    <div
                      class="bg-brand-blue flex items-center justify-center h-full rounded-[10px]"
                    >
                      <a
                        href="#"
                        class="text-[clamp(1rem,1.8vw,1.3rem)] font-extrabold text-white no-underline transition-opacity duration-200 hover:opacity-80"
                        >View more</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <!-- Slide 2 placeholder -->
              <div class="meta-slide hidden min-w-full [&.active]:block">
                <div
                  class="grid grid-cols-2 gap-[10px] h-[380px] max-md:grid-cols-1 max-md:h-auto"
                ></div>
              </div>
            </div>

            <button
              class="meta-carousel__btn meta-carousel__btn--next absolute top-1/2 -translate-y-1/2 z-10 -right-[52px] bg-white/15 border-2 border-white/50 text-white w-[38px] h-[38px] rounded-full text-2xl cursor-pointer flex items-center justify-center transition-colors duration-200 backdrop-blur-sm hover:bg-white/30 max-lg:-right-3 max-md:hidden"
              aria-label="Next slide"
            >
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <!-- Audience bar -->
        <footer
          class="bg-brand-blue flex items-center gap-4 px-10 py-4 w-full overflow-hidden max-[480px]:flex-col max-[480px]:items-start max-[480px]:px-5 max-[480px]:gap-3"
          aria-label="MetaGames is for"
        >
          <span
            class="text-[clamp(0.9rem,1.6vw,1.05rem)] font-extrabold text-white whitespace-nowrap flex-shrink-0 max-[480px]:w-full"
            >It's for:</span
          >
          <nav
            class="flex gap-3 flex-1 justify-between max-md:gap-2 max-md:flex-wrap max-[480px]:w-full max-[480px]:gap-2"
          >
            ${audienceBarHtml}
          </nav>
        </footer>
  `;
};
