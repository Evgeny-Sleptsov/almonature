export default () => {
  const dropBtn = Array.from(document.querySelectorAll('.js-drop-content-btn'));
  const paralaxElem = document.querySelector('.js-paralax');
  const media = window.matchMedia('(min-width: 768px)');
  const isiOS = !!navigator.userAgent.match(/iPhone|iPad|iPod/i);

  function openDropContent() {
    let openPosition = 0;
    dropBtn.forEach(item => {
      item.addEventListener('click', function() {
        item.classList.toggle('js-rotate');
        const contentData = item.dataset.content;
        const contentBlock = document.querySelector(
          `[data-content='${contentData}']`
        );
        item.classList.toggle('js-show-text-btn');
        toggleStyle(contentBlock, 'display', `block`);
        if (contentData === 'hqs') {
          document.querySelector('.hqs-why-sic').classList.toggle('js-show');
        }
        if (item.classList.contains('js-rotate')) {
          openPosition = window.scrollY;
        }
        if (!item.classList.contains('js-rotate')) {
          document.documentElement.classList.add('without-animation');
          window.scrollTo(0, openPosition);
          document.documentElement.classList.remove('without-animation');
        }
      });
    });
  }

  function toggleStyle(el, styleName, value) {
    if (el.style[styleName] !== value) {
      el.style[styleName] = value;
    } else {
      el.style[styleName] = '';
      window.scrollTo(0, window.scrollY - el.scrollHeight);
    }
  }

  let paralax = function(maxL, maxM, maxS) {
    let transformPosition =
      window.innerWidth < 1024 ? maxM : window.innerWidth < 768 ? maxS : maxL;
    let min = 0;
    let max = transformPosition;
    let scrollPos = 0;

    window.addEventListener('scroll', event => {
      const paralaxBlock = document.querySelector('.representation__middle');
      const paralaxBlockPos =
        paralaxBlock.getBoundingClientRect().top + window.scrollY;
      const paralaxStartPos = document.querySelector('.representation__natural-text')
        .getBoundingClientRect().top + window.scrollY;
      let nowPositionScroll = window.scrollY;
      let step = Math.abs(nowPositionScroll - scrollPos);
      if (window.scrollY < paralaxBlockPos && window.scrollY >= paralaxStartPos) {
        if (nowPositionScroll > scrollPos) {
          if (max >= 0) {
            max = max - step >= 0 ? max - step : 0;
            min = max;
            paralaxElem.style.transform = `translateY(${max}px)`;
          }
        } else {
          if (min <= transformPosition) {
            min =
              min + step <= transformPosition ? min + step : transformPosition;
            max = min;
            paralaxElem.style.transform = `translateY(${min}px)`;
          }
        }
      }
      scrollPos = nowPositionScroll;
    });
  };

  function mediaChangeHandler(mediaQuery) {
    if (mediaQuery.matches && paralaxElem) {
      return paralax(240, 121, 120);
    } else {
      return false;
    }
  }

  if (dropBtn) {
    openDropContent();
  }

  media.addListener(mediaChangeHandler);
  mediaChangeHandler(media);
};
