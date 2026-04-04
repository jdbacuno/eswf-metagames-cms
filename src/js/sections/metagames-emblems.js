import { initColorwheel } from "../color-wheel.js";
import { escHtml } from "../utilities.js";

const DATA_EMBLEMS = "/api/public/get-section.php?section=metagames-emblems";

export const loadMetagamesEmblems = async () => {
  try {
    const response = await fetch(DATA_EMBLEMS);
    if (!response.ok) throw new Error("Data not found.");
    const data = await response.json();
    renderMetagamesEmblems(data);
  } catch (err) {
    console.error("Error:", err);
  }
};

const renderMetagamesEmblems = (data) => {
  const metagamesemblems = document.querySelector("#metagames-emblems");
  const { logo, title, motto, emblems } = data;

  const mottoText = motto ?? "";
  const logoSrc = escHtml(logo?.src ?? "");
  const logoAlt = escHtml(logo?.alt ?? "");

  metagamesemblems.innerHTML = `

<div
    class="max-w-[1100px] my-[60px] mx-auto px-10 max-[480px]:px-4">
          <h2
            class="text-[1.8rem] font-extrabold mb-10 max-[480px]:text-[1.4rem]"
          >
           ${escHtml(title)}
          </h2>
          <div
            class="relative flex items-center mt-[50px] pl-[200px] max-[1023px]:pl-[165px] max-[767px]:pl-[80px] max-[639px]:pl-0 max-[639px]:flex-col max-[639px]:mt-5"
          >
            <div
              class="absolute left-0 z-10 flex items-center top-1/2 -translate-y-1/2 max-[639px]:relative max-[639px]:left-auto max-[639px]:top-auto max-[639px]:translate-y-0 max-[639px]:flex-col max-[639px]:justify-center max-[639px]:w-full max-[639px]:mb-[-20px]"
            >
              <div
                class="wheel emblem-wheel rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-transform duration-[800ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] w-[260px] h-[260px] max-[1023px]:w-[230px] max-[1023px]:h-[230px] max-[767px]:w-[160px] max-[767px]:h-[160px] max-[639px]:w-[160px] max-[639px]:h-[160px]"
              >
                <div
                  class="bg-white rounded-full flex items-center justify-center border-[3px] border-black w-[120px] h-[120px] max-[1023px]:w-[106px] max-[1023px]:h-[106px] max-[767px]:w-[74px] max-[767px]:h-[74px] max-[639px]:w-[74px] max-[639px]:h-[74px]"
                >
                  <img
                    src="${logoSrc}"
                    alt="${logoAlt}"
                    class="w-[75%] h-auto -rotate-[60deg]"
                  />
                </div>
              </div>
              <div class="wheel-pointer"></div>
            </div>

            <article
              class="emblems__card rounded-[15px] w-full pl-[80px] pr-[40px] py-10 flex justify-between items-center min-h-[180px] box-border transition-all duration-500 ease-in-out max-[1023px]:pl-[75px] max-[1023px]:pr-8 max-[1023px]:py-8 max-[767px]:pl-[90px] max-[767px]:pr-5 max-[767px]:py-7 max-[767px]:min-h-[150px] max-[639px]:pl-5 max-[639px]:pr-4 max-[639px]:pt-[70px] max-[639px]:pb-6 max-[639px]:flex-col max-[639px]:text-center max-[639px]:min-h-0"
            >
              <div class="emblems__text-content">
                <h3
                  class="emblems__color-name text-[2.2rem] m-0 max-[767px]:text-[1.8rem] max-[639px]:text-[1.4rem]"
                >
                  Green
                </h3>
                <p
                  class="emblems__description text-[1.1rem] opacity-90 mb-[15px] max-[767px]:text-[0.95rem] max-[639px]:text-[0.85rem] max-[639px]:mb-2"
                >
                  Multi Cultural Sports
                </p>
                <p
                  class="emblems__motto italic text-[1.1rem] mt-[10px] max-[767px]:text-[0.95rem] max-[639px]:text-[0.82rem] max-[639px]:mt-1"
                >
                  ${escHtml(mottoText)}
                </p>
              </div>
              <nav
                class="flex gap-[10px] flex-shrink-0 ml-4 max-[639px]:ml-0 max-[639px]:mt-4 max-[639px]:justify-center"
              >
                <button
                  class="emblems__btn emblems__btn--prev rounded-full border-2 border-white bg-transparent! text-white cursor-pointer flex items-center justify-center transition-all duration-300 w-[45px] h-[45px] text-2xl max-[639px]:w-[34px] max-[639px]:h-[34px] max-[639px]:text-base"
                  aria-label="Previous"
                >
                  <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button
                  class="emblems__btn emblems__btn--next rounded-full border-2 border-white bg-transparent! text-white cursor-pointer flex items-center justify-center transition-all duration-300 w-[45px] h-[45px] text-2xl max-[639px]:w-[34px] max-[639px]:h-[34px] max-[639px]:text-base"
                  aria-label="Next"
                >
                  <i class="fa-solid fa-chevron-right"></i>
                </button>
              </nav>
            </article>
          </div>
        </div>
`;

  initColorwheel({ emblems: Array.isArray(emblems) ? emblems : [], motto: mottoText });
};
