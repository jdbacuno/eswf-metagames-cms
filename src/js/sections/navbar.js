import { initNavInteractions, initNavLinks } from "../main.js";
const DATA_NAV = "/api/public/get-section.php?section=navbar";

// initNavLinks();

export const loadNavbarSection = async () => {
  try {
    const response = await fetch(DATA_NAV);
    if (!response.ok) throw new Error("Navbar data not found.");
    const data = await response.json();     
    renderNavbar(data);
  } catch (err) {
    console.error("Navbar Error:", err);
  }
};

const renderNavbar = (data) => {
  const navbar = document.querySelector("#navbar");
  const { logo, links, cta } = data;
  
  // 1. DESKTOP LINKS
  const desktopLinksHtml = links
  .map(
    (link, index) => `
    <li class="animate-link-drop-${index + 1}">
    <a href="${link.url}" class="nav-link relative block py-[7px] px-[6px] text-[0.75rem] text-white rounded-[4px] whitespace-nowrap transition transition-all duration-200 hover:bg-white/[0.14] hover:-translate-y-px xl:text-[0.88rem] xl:px-2">
    ${link.text}
    </a>
    </li>
    `,
  )
  .join("");
  
  // 2. MOBILE LINKS
  const mobileLinksHtml = links
  .map(
    (link) => `
    <li class="w-full">
    <a href="${link.url}" class="block py-[7px] px-3 text-[0.85rem] text-white rounded-md w-full hover:bg-white/[0.14]">
    ${link.text}
    </a>
    </li>
    `,
  )
  .join("");
  
  // 3. INJECT ENTIRE STRUCTURE
  navbar.innerHTML = `
  <div class="flex items-center px-[18px] h-[58px]">
  <a href="#" class="max-lg:hidden flex-shrink-0">
  <img src="${logo.src}" alt="${logo.alt}" class="animate-logo-slide-in h-[42px] w-auto block ml-[10px] transition-all duration-200 hover:scale-[1.08] hover:opacity-85 xl:h-[50px] xl:ml-[50px]"></img>
  </a>
  
  <ul class="nav-links nav-links-desktop hidden lg:flex items-center list-none flex-1 justify-between px-2 gap-0 xl:px-[90px]">
  ${desktopLinksHtml}
  </ul>

            <a href="${cta.url}" class="animate-btn-slide-in hidden lg:inline-block bg-btn-red text-white font-bold py-2 px-3 rounded-md no-underline whitespace-nowrap flex-shrink-0 mr-[10px] text-[0.78rem] transition-all duration-200 hover:bg-[#cc0000] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,0,0,0.4)] xl:px-[18px] xl:mr-[130px] xl:text-[0.88rem]">
            ${cta.text}
            </a>
            
            <button class="lg:hidden flex items-center bg-transparent border-none cursor-pointer text-white text-[1.4rem] ml-auto p-[6px] transition-all duration-300 hover:text-light-blue hover:scale-110" id="menuOpenBtn">
            <i class="fa-solid fa-bars"></i>
            </button>
            </div>
            
            <ul class="nav-links lg:hidden fixed top-0 right-0 w-[60%] h-screen list-none flex flex-col items-start pt-[70px] px-4 pb-20 gap-[2px] z-[999] shadow-[-4px_0_24px_rgba(0,0,0,0.4)] invisible opacity-0 translate-x-full transition-[transform,opacity,visibility] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] [&.open]:visible [&.open]:opacity-100 [&.open]:translate-x-0" style="background: linear-gradient(to bottom, #0a1a6e, #1e88e5)" id="navLinks">        
            <li class="absolute top-3 right-3">
            <button id="hamburger" class="bg-transparent border-none cursor-pointer text-white text-[1.4rem] p-[6px] transition-all duration-300 hover:text-light-blue hover:scale-110" aria-label="Close menu">
            <i class="fa-solid fa-xmark"></i>
            </button>
            </li>
            ${mobileLinksHtml}
            <li class="absolute bottom-4 left-0 right-0 px-4">
            <a href="${cta.url}" class="block bg-btn-red text-white font-bold text-[0.88rem] py-[10px] px-[14px] rounded-md no-underline text-center w-full transition-colors duration-200 hover:bg-[#cc0000]">
            ${cta.text}
            </a>
            </li>
        </ul>
    `;
    
    initNavLinks();
    initNavInteractions();
  };