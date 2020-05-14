export default (wrap, anchors) => {
  const undLine = document.querySelector('hr.almo-tabs__undline');
  const list = wrap.querySelector('.almo-tabs__list');

  function moveLine() {
    const active = wrap.querySelector('.almo-tab.js-active');
    undLine.style.width = `${active.offsetWidth}px`;
    undLine.style.left = `${active.getBoundingClientRect().left - list.getBoundingClientRect().left}px`;
  }

  wrap.addEventListener('secInViewEvent', (e) => {
    moveLine();
  });

  if (document.fonts) {
    if (!document.fonts.check('16px Poppins')) {
      document.fonts.addEventListener('loadingdone', () => {
        moveLine();
      });
    } else {
      moveLine();
    }
  } else {
    setTimeout(() => {
      moveLine();
    }, 3000);
  }
};