const DATA_FOOTER = "/api/public/get-section.php?section=footer";

export const loadFooterSection = async () => {
  try {
    const response = await fetch(DATA_FOOTER);
    if (!response.ok) throw new Error("Footer data not found.");
    const data = await response.json();
    renderFooter(data);
  } catch (err) {
    console.error("Footer Error:", err);
  }
};

const renderFooter = (data) => {
  const footer = document.querySelector("#footer");
  if (!footer) return;

  const { logo, columns = [], bottomBar = {} } = data;

  const columnsHtml = columns
    .map((column) => {
      const linksHtml = (column.links || [])
        .map(
          (link) => `
            <li class="text-[0.9rem] leading-[1.6] max-[480px]:text-[0.8rem]">
              <a class="text-white no-underline hover:underline" href="${link.url || "#"}">${link.text || ""}</a>
            </li>
          `,
        )
        .join("");

      return `
        <nav class="max-md:text-center max-[480px]:flex-[1_1_calc(50%-20px)] max-[480px]:min-w-[120px] max-[360px]:flex-none max-[360px]:w-full">
          ${
            column.title
              ? `<h4 class="text-[1rem] mb-[10px] max-[480px]:text-[0.9rem] max-[480px]:mb-[5px]">${column.title}</h4>`
              : ""
          }
          <ul class="list-none p-0 m-0">
            ${linksHtml}
          </ul>
        </nav>
      `;
    })
    .join("");

  footer.innerHTML = `
    <div class="bg-[#217ec7] py-[30px] px-[60px] text-white max-lg:py-7 max-lg:px-10 max-md:py-6 max-md:px-6 max-[480px]:py-5 max-[480px]:px-4">
      <div class="flex justify-between items-center max-w-[1200px] mx-auto max-md:flex-col max-md:items-center max-md:gap-6 max-md:text-center">
        <div class="pl-[100px] flex-shrink-0 max-lg:pl-0 max-md:pl-0">
          <img src="${logo?.src || fallbackFooterData.logo.src}" alt="${logo?.alt || fallbackFooterData.logo.alt}" class="w-[100px]" />
        </div>
        <div class="flex gap-[60px] pr-[100px] max-lg:gap-10 max-lg:pr-0 max-md:gap-8 max-md:pr-0 max-md:justify-center max-md:flex-wrap max-[480px]:flex-row max-[480px]:flex-wrap max-[480px]:gap-5 max-[480px]:justify-center max-[360px]:flex-col max-[360px]:items-center max-[360px]:gap-4">
          ${columnsHtml}
        </div>
      </div>
    </div>
    <div class="bg-[#1a1a1a] py-[10px] px-[60px] text-[#cccccc] text-[0.75rem]">
      <div class="flex justify-between max-w-[1200px] mx-auto max-md:flex-col max-md:text-center max-md:gap-[10px]">
        <p>${bottomBar.copyright || fallbackFooterData.bottomBar.copyright}</p>
        <p>${bottomBar.credit || fallbackFooterData.bottomBar.credit}</p>
      </div>
    </div>
  `;
};