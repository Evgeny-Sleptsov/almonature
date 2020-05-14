export default (attr) => {
  const lazyBlocks = document.querySelectorAll(`[${attr}]`);

  const setSrc = (item) => {
    const img = item.children[0];
    const removeAttr = () => {
      // item.removeAttribute(`${attr}`);
      // item.classList.remove('lazy-img-loaded');
      item.removeEventListener('transitionend', removeAttr);
    };
    item.addEventListener('transitionend', removeAttr);
    img.onload = () => {
      requestAnimationFrame(() => {
        item.classList.add('lazy-img-loaded');
        img.onload = null;
      });
    };
    requestAnimationFrame(() => {
      img.src = item.getAttribute(`${attr}`);
    });
  };

  const loadLazyImages = () => {
    window.removeEventListener('load', loadLazyImages);

    Array.from(lazyBlocks).forEach(item => {
      setSrc(item);
    });
  };

  if (!('IntersectionObserver' in window)) {
    window.addEventListener('load', loadLazyImages);
    return false;
  }

  const options = {
    rootMargin: '0px',
    threshold: 0
  };

  const onIntersection = (entries) => {
    entries.forEach(entry => {

      requestAnimationFrame(() => {
        if (entry.intersectionRatio >= 0 && entry.isIntersecting) {
          window.lazyImagesObserver.unobserve(entry.target);
          setSrc(entry.target);
        }
      });
    });
  }

  window.lazyImagesObserver = new IntersectionObserver(onIntersection, options);

  Array.from(lazyBlocks).forEach(item => {
    window.lazyImagesObserver.observe(item);
  });
};