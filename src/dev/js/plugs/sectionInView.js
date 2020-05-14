export default (wrap, anchors) => {
  const event = new CustomEvent('secInViewEvent');
  let sections = initSections(anchors);
  let think = false;
  let current = anchors[0];

  function initSections(anchors) {
    let arr = [];

    for (let i = 0; i < anchors.length; i++) {
      arr.push(document.querySelector(anchors[i].getAttribute('href')));
    }
    return arr;
  }

  function determineSectionInView(section) {
    if (!section || section && section.classList.contains('js-active')) return false;
    const rect = section.getBoundingClientRect();
    const top = rect.top <= window.innerHeight / 2;
    const bottom = rect.bottom >= window.innerHeight / 2;
    return top && bottom;
  }

  function scrollHandler(e) {
    if (!think) {
      think = true;
      requestAnimationFrame(() => {
        for (let i = 0; i < anchors.length; i++) {
          if (determineSectionInView(sections[i])) {
            if (current) current.classList.remove('js-active');
            current = anchors[i];
            current.classList.add('js-active');
            wrap.dispatchEvent(event);
          }
        }
        think = false;
      });
    }
  }

  window.addEventListener('scroll', scrollHandler);
  scrollHandler();
};
