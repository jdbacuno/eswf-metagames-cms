import { initWAMInteractions } from '../main.js';
const DATA_WHATAREMETAGAMES = './src/data/what-are-metagames.json';

export const loadWhatAreMetaGamesSection = async () => {
  try {
    const response = await fetch(DATA_WHATAREMETAGAMES);
    if (!response.ok) throw new Error("File data not found.");
    const data = await response.json();
    renderWhatAreMetaGamesSection(data);
  } catch (err) {
    console.log('Error:', err);
  }
}

const renderWhatAreMetaGamesSection = (data) => {
  const whatAreMetaGames = document.querySelector("#what-are-metagames");
  const { text, title, binaryNum, athleteVr, pillars } = data;

  const pillarsHtml = pillars.map(pillar => {
    return `<div class="flex-1 py-[18px] flex items-center justify-center ${pillar.color} max-md:py-[14px] max-[480px]:py-3" role="listitem">
              <span
                class="text-[clamp(0.95rem,2vw,1.3rem)] font-black text-white tracking-[0.1em] uppercase max-md:text-[0.85rem] max-[480px]:text-[0.75rem] max-[360px]:text-[0.65rem]"
                >${pillar.text}</span>
            </div>`;
  }).join('');

  whatAreMetaGames.innerHTML = `
    <div class="max-w-[1100px] mx-auto">
      <div
        class="wam-inner reveal flex items-stretch justify-between relative rounded-2xl overflow-hidden min-h-[220px] max-lg:min-h-[200px] max-md:flex-col max-md:min-h-0 max-md:rounded-xl"
        style="
          background: linear-gradient(
            to right,
            #0d2a5e 0%,
            #1565c0 30%,
            #1e88e5 45%,
            rgba(30, 136, 229, 0) 55%,
            rgba(30, 136, 229, 0) 100%
          );
        "
      >
        <figure class="absolute inset-0 z-0 m-0">
          <img
            src="${binaryNum.src}"
            alt="${binaryNum.alt}"
            class="wam-bg w-full h-full object-cover object-right block opacity-50"
          />
        </figure>

        <div
          class="flex-1 min-w-0 py-10 pr-9 pl-11 flex flex-col justify-center relative z-10 max-lg:py-8 max-lg:px-8 max-md:px-6 max-md:pt-7 max-md:pb-5 max-[480px]:px-[18px] max-[480px]:pt-[22px] max-[480px]:pb-4"
        >
          <h2
            id="wam-heading"
            class="text-[clamp(1.3rem,2.5vw,1.8rem)] font-extrabold text-white mb-3 leading-[1.2]"
          >
            ${title}
          </h2>
          <p
            class="text-[clamp(0.82rem,1.4vw,0.93rem)] text-white/[0.92] leading-[1.6] max-w-[400px]"
          >
            ${text}
          </p>
        </div>

        <figure
          class="flex-shrink-0 w-[340px] flex items-end justify-end relative z-10 overflow-visible mr-[70px] max-lg:w-[280px] max-lg:mr-5 max-md:w-full max-md:h-[220px] max-md:mr-0 max-md:justify-center max-md:items-center max-[480px]:h-[180px]"
          aria-label="Person wearing a VR headset"
        >
          <img
            src="${athleteVr.src}"
            alt="${athleteVr.alt}"
            class="w-full h-full object-cover object-left block rounded-[0_16px_16px_0] [filter:drop-shadow(-12px_0px_16px_rgba(0,0,0,0.6))] max-md:w-auto max-md:object-contain max-md:rounded-[0_0_12px_12px]"
          />
        </figure>
      </div>

      <!-- Pillars -->
      <div
        class="pillars reveal-sm flex max-w-[800px] -mt-[25px] mx-auto overflow-hidden relative z-[2] max-lg:max-w-[860px] max-md:max-w-full max-md:-mt-[10px] max-[480px]:-mt-2"
        role="list"
        aria-label="MetaGames pillars"
      >
        ${pillarsHtml}
      </div>
    </div>
  `;

  initWAMInteractions();
}