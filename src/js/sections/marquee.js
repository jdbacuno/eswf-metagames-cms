const DATA_MARQUEE = './src/data/marquee.json';

export const loadMarqueeSection = async () => {
  try {
    const response = await fetch(DATA_MARQUEE);
    if (!response.ok) throw new Error('Cannot find the file');
    const data = await response.json();
    renderMarqueeSection(data);
  } catch (err) {
    console.log('Error:', err);
  }
}

const renderMarqueeSection = (data) => {
  const marqueeSection = document.querySelector('#infinite-slide-loop');
  const { text } = data;

  marqueeSection.innerHTML = `
    <p class="marquee-text inline-block animate-marquee text-[2rem] font-semibold text-white tracking-[0.03rem] max-md:text-[1.4rem] max-[480px]:text-[1.1rem]">${text}</p>
  `;
}