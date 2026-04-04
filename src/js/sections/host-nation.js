const DATA_HOSTNATION = "/api/public/get-section.php?section=host-nation";

export const loadHostNationSection = async () => {
  try {
    const response = await fetch(DATA_HOSTNATION);
    if (!response.ok) throw new Error("File not found.");
    const data = await response.json();
    renderHostNationSection(data);
  } catch (err) {
    console.log("Error:", err);
  }
};

const renderHostNationSection = (data) => {
  const hostSection = document.querySelector("#host-section");
  const { title, subtitle, flagImages, partnerImages } = data;

  const flagsHtml = flagImages
    .map((flagImg) => {
      return `<div>
              <img
                src="${flagImg.src}"
                alt="${flagImg.alt}"
                class="w-full h-auto rounded-[15px] block shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              />
            </div>`;
    })
    .join("");

  const partnersHtml = partnerImages
    .map((partnerImg) => {
      return `<img
              src="${partnerImg.src}"
              alt="${partnerImg.alt}"
              class="h-auto max-h-[80px] w-auto max-w-[180px] object-contain transition-transform duration-300 max-lg:max-h-[60px] max-[480px]:max-h-[50px] max-[480px]:max-w-[40%]"
            />`;
    })
    .join("");

  hostSection.innerHTML = `
        <header class="bg-brand-blue w-full py-[15px] text-center mb-10">
          <h2 class="text-white text-[1.8rem] font-bold m-0">
            ${title}
          </h2>
        </header>
        <div class="max-w-[1200px] mx-auto px-10">
          <p class="text-white text-[2rem] font-semibold mb-5">${subtitle}</p>
          <div class="grid grid-cols-2 gap-[30px] mb-[50px] max-md:grid-cols-1">
            ${flagsHtml}
          </div>
          <div
            class="partners-block bg-white py-5 text-center overflow-x-hidden"
          >
            <div class="max-w-[1200px] mx-auto px-5 flex flex-col items-center">
              <h3
                class="text-black text-[1.4rem] font-bold mb-[10px] max-[480px]:text-[1.1rem]"
              >
                Partners:
              </h3>
              <div
                class="flex justify-center items-center gap-10 flex-wrap max-lg:gap-[30px] max-[480px]:gap-5"
              >
                ${partnersHtml}
              </div>
            </div>
          </div>
        </div>
      `;
};