import { initNewsUpdateInteractions } from '../main.js';
const DATA_NEWSUPDATE = './src/data/news.json';

export const loadNewsUpdateSection = async () => {
  try {
    const response = await fetch(DATA_NEWSUPDATE);
    if (!response.ok) throw new Error('File not found');
    const data = await response.json();
    renderNewsUpdateSection(data);
  } catch (err) {
    console.log('Error:', err);
  }
}

const renderNewsUpdateSection = data => {
  const newsUpdate = document.querySelector('#news-and-update');
  const { title, image } = data;

  newsUpdate.innerHTML = `
    <h1
      class="news-header text-[clamp(1.4rem,3vw,2rem)] font-extrabold text-white mb-5 xl:pl-10"
    >
      ${title}
    </h1>
    <div class="news-containter max-w-[1020px] mx-auto">
      <img
        src="${image.src}"
        alt="${image.alt}"
        class="w-full block mx-auto rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-md:rounded-[10px] max-[480px]:rounded-lg max-[480px]:shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
      />
    </div>
  `;

  initNewsUpdateInteractions();
}