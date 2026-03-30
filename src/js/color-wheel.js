export function initColorwheel() {
  const initialize = () => {
      const emblemData = [
        {
          color: 'Green',
          desc: 'Multi Cultural Sports',
          background: 'var(--green)',
        },
        { color: 'Blue', desc: 'Electronic Sports', background: 'var(--blue)' },
        {
          color: 'Yellow',
          desc: 'Traditional Sports',
          background: 'var(--yellow)',
        },
        {
          color: 'Red',
          desc: 'Active/Digital/Virtual Sports',
          background: 'var(--red)',
        },
        { color: 'White', desc: 'The ESWF Member Nations', background: '#ffffff' }, // Overriding for clarity
        { color: 'Black', desc: 'The Meta Movement', background: '#000000' },
        {
          color: 'Grey',
          desc: 'Professional & Amateur Sports',
          background: 'var(--slate)',
        },
      ];

      let currentIndex = 0;
      const step = 360 / emblemData.length;

      const wheel = document.querySelector('.wheel');
      const card = document.querySelector('.emblems__card'); // Target the container
      const colorName = document.querySelector('.emblems__color-name');
      const colorDesc = document.querySelector('.emblems__description');
      const nextBtn = document.querySelector('.emblems__btn--next');
      const prevBtn = document.querySelector('.emblems__btn--prev');

      if (!wheel || !card || !colorName || !colorDesc || !nextBtn || !prevBtn) {
        return;
      }

      function updateEmblem(index) {
        currentIndex = (index + emblemData.length) % emblemData.length;
        const activeData = emblemData[currentIndex];

        // Check if we are on mobile (pointer moved to bottom)
        const isMobile = window.innerWidth < 640;

        /* LOGIC:
            - Desktop Pointer (3 o'clock): +90deg offset
            - Mobile Pointer (6 o'clock): +180deg offset
            */
        const pointerOffset = isMobile ? 180 : 90;
        const rotation = -(currentIndex * step) + (pointerOffset - step / 2);

        wheel.style.transform = `rotate(${rotation}deg)`;

        // Update Container Color
        card.style.background = activeData.background;

        // Update Text and Contrast
        colorName.textContent = activeData.color;
        colorDesc.textContent = activeData.desc;

        // Contrast check for Yellow/White
        if (activeData.color === 'White' || activeData.color === 'Yellow') {
          card.style.color = '#000000';
        } else {
          card.style.color = '#ffffff';
        }

        // Contrast check for card prev/next buttons
        if (activeData.color === 'White') {
          prevBtn.style.borderColor = '#000';
          prevBtn.style.color = '#000';
          nextBtn.style.borderColor = '#000';
          nextBtn.style.color = '#000';
        } else if (activeData.color === 'Black') {
          prevBtn.style.borderColor = '#fff';
          prevBtn.style.color = '#fff';
          nextBtn.style.borderColor = '#fff';
          nextBtn.style.color = '#fff';
        }
      }

      nextBtn.addEventListener('click', () => updateEmblem(currentIndex + 1));
      prevBtn.addEventListener('click', () => updateEmblem(currentIndex - 1));

      updateEmblem(0);
      window.addEventListener('resize', () => updateEmblem(currentIndex));
    };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
}