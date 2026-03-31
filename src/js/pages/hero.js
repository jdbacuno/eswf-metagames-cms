const DATA_HERO = "/api/public/get-section.php?section=hero";

export const loadHeroSection = async () => {
  try {
    const response = await fetch(DATA_HERO);
    if (!response.ok) throw new Error("Hero Section data not found.");
    const data = await response.json();
    renderHeroSection(data);
  } catch (err) {
    console.error("Hero Section Error:", err);
  }
}

const renderHeroSection = (data) => {
  const hero = document.querySelector("#hero");
  const { backgroundImage, cards, cta, catchphrase } = data;

  const cardsHtml = cards.map(card => {
      const { image, text, url } = card
      return `
        <article class="animate-card-1 bg-white rounded-[10px] flex-1 min-w-0 flex flex-col items-center overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.45)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] max-[360px]:w-full max-[360px]:flex-none" role="listitem">
                
            <figure class="w-full px-5 pt-6 pb-5 flex items-center justify-center bg-white min-h-[185px] max-lg:min-h-[150px] max-lg:px-3 max-md:min-h-[130px] max-md:px-3 max-md:pt-4 max-md:pb-3 max-[480px]:min-h-[110px] max-[480px]:px-2 max-[480px]:pt-3 max-[480px]:pb-[10px]">
                <img src="${image.src}" alt="${image.alt}"
                    class="max-w-full max-h-[145px] object-contain block max-lg:max-h-[110px] max-md:max-h-[100px] max-[480px]:max-h-[80px]"/>
            </figure>
            
            <a href="${url}" class="block w-[calc(100%-24px)] mx-3 mb-3 py-[11px] px-3 bg-brand-blue text-white text-[0.85rem] font-bold text-center no-underline tracking-[0.01em] rounded-[10px] transition-colors duration-200 hover:bg-[#1a6aab] max-lg:text-[0.78rem] max-lg:py-[9px] max-md:text-[0.75rem] max-md:py-[9px] max-md:px-2 max-[480px]:text-[0.68rem] max-[480px]:py-2 max-[480px]:px-[6px] max-[480px]:w-[calc(100%-12px)] max-[480px]:mx-[6px] max-[480px]:mb-2">
                ${text}
            </a>

        </article>
      `
  }).join('');
  
  hero.innerHTML = `
        <div class="absolute inset-0 z-0" aria-hidden="true">
            <img src="${backgroundImage.src}" alt="${backgroundImage.alt}" class="w-full h-full object-cover object-top block absolute inset-0"/>
            <div class="absolute inset-0" style=" background: linear-gradient(to bottom, rgba(20, 27, 37, 0.6) 0%, rgba(20, 27, 37, 1) 100%);"></div>
        </div>

        <div class="relative z-10 w-full px-6 pt-[100px] pb-10 flex flex-col items-center gap-2 max-lg:pt-20 max-md:px-4 max-md:pt-20 max-md:gap-[10px] max-[480px]:px-3 max-[480px]:pt-[70px] max-[480px]:pb-7">
            <h2 id="hero-title" class="hero-heading animate-fade-up-1 max-w-[780px] text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white leading-[1.15] tracking-[0.01em] [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
                ${cta.text}
            </h2>

            <p class="animate-fade-up-2 max-w-[780px] text-[clamp(0.95rem,1.8vw,1.15rem)] italic font-semibold text-white tracking-[0.02em] mt-[2px]">
                <em>${catchphrase.text}</em>
            </p>

            <p class="animate-fade-up-3 max-w-[480px] text-[clamp(0.82rem,1.4vw,0.93rem)] text-white/90 leading-[1.4] text-center mt-[2px]">
                ${catchphrase.paragraph}
            </p>

            <div class="animate-fade-up-4 flex gap-4 mt-7 justify-center flex-nowrap w-full px-2 min-[1200px]:gap-8 max-[480px]:gap-2 max-[360px]:flex-wrap max-[360px]:justify-center" role="list">
            ${cardsHtml}
            </div>
        </div>
    `;
}
