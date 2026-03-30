const DATA_HEADER = "/api/public/get-section.php?section=header";

export const loadHeaderSection = async () => {
  try {
    const response = await fetch(DATA_HEADER);
    if (!response.ok) throw new Error('Could not find the data file');

    const rawData = await response.json();

    renderHeader(rawData);
  } catch (err) {
    console.log('Oops:', err);
  }
}

// render header
const renderHeader = (bannerData) => {
  const headerContainer = document.querySelector('#header');
  if (!headerContainer) return;

  const { title, colors } = bannerData; 

  const stripesHtml = colors.map(color => `<span class="flex-1 ${color}"></span>`).join('');

  headerContainer.innerHTML = `
    <div class="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3 flex justify-between pointer-events-none max-md:h-2">
      <div
        class="flex w-150 h-3 shrink-0 max-[1500px]:w-125 max-[1280px]:w-75 max-lg:w-57.5 max-md:w-37.5 max-md:h-2"
      >
        ${stripesHtml}
      </div>

      <div
        class="flex w-150 h-3 shrink-0 max-[1500px]:w-125 max-[1280px]:w-75 max-lg:w-57.5 max-md:w-37.5 max-md:h-2"
      >
        ${stripesHtml}
      </div>
    </div>
    <h1
      class="animate-title-fade-in relative z-10 bg-white text-dark-navy px-4 py-1.5 text-[clamp(1rem,4vw,2.6rem)] font-normal tracking-[clamp(0.15rem,1vw,0.45rem)] uppercase whitespace-nowrap"
    >
      ${title}
    </h1>
  
  `;
}