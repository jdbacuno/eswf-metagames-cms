const DATA_THEME_SONG = "./src/data/theme-song.json";

export const loadThemeSongSection = async () => {
  try {
    const response = await fetch(DATA_THEME_SONG);
    if (!response.ok) throw new Error("Theme song data not found.");
    const data = await response.json();
    renderThemeSongSection(data);
  } catch (err) {
    console.error("Theme song error:", err);
  }
};

const renderThemeSongSection = (data) => {
  const themeSong = document.querySelector("#theme-song");
  if (!themeSong) return;

  const { heading, title, subtitle, poster, caption, lyrics = [] } = data;

  const lyricsHtml = lyrics
    .map(
      (part) => `
        <div>
          <h4 class="text-[1.1rem] font-bold mb-2 text-white">${part.label}</h4>
          <p class="text-[1rem] leading-[1.6] text-white/80">
            ${part.text.join("<br />")}
          </p>
        </div>
      `,
    )
    .join("");

  themeSong.innerHTML = `
    <div class="max-w-[1100px] mx-auto">
      <h2
        id="theme-song-heading"
        class="text-[1.8rem] font-bold mb-[30px] text-left max-md:text-center"
      >
        ${heading}
      </h2>
      <div
        class="grid grid-cols-[1.2fr_0.8fr] gap-10 items-start max-md:grid-cols-1 max-md:gap-[30px]"
      >
        <div class="w-full">
          <figure
            class="relative w-full rounded-[15px] overflow-hidden bg-black aspect-video shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div class="relative w-full h-full">
              <img
                src="${poster.src}"
                alt="${poster.alt}"
                class="w-full h-full object-cover opacity-80"
              />
            </div>
            <figcaption class="sr-only">${caption}</figcaption>
          </figure>
        </div>
        <article class="flex flex-col gap-5 max-md:text-center">
          <header>
            <h3
              class="text-[1.6rem] font-bold text-white mb-1 max-md:text-center"
            >
              ${title}
            </h3>
            <p class="text-[1.2rem] font-semibold mb-5 max-md:text-center">
              ${subtitle}
            </p>
          </header>
          <div
            class="lyrics-scroll flex flex-col gap-6 max-h-[350px] overflow-y-auto pr-5 max-md:text-center"
          >
            ${lyricsHtml}
          </div>
        </article>
      </div>
    </div>
  `;
};