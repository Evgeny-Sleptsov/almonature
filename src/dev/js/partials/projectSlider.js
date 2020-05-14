import Swiper from 'swiper';

export default () => {
  new Swiper('.almo-project-actions-slider__block .swiper-container', {
    loop: true,
    autoplay: {
      delay: 6000
    },
    pagination: {
      el: '.almo-project-actions-slider__block .slider-pagination'
    },
    navigation: {
      nextEl: '.almo-project-actions-slider__block .almo-btn--slider-next',
      prevEl: '.almo-project-actions-slider__block .almo-btn--slider-prev'
    },
  });

  const perspectiveSlider = () => {
    const slider = document.querySelector('.js-slider-perspective');

    if (!slider) return;

    const container = slider.children[0];

    const slides = slider.querySelectorAll('ul li');
    const len = slides.length;

    if (len === 0) return;

    const styleClasses = {
      item: 'slider-perspective-item',
      prev: 'slider-perspective-prev',
      active: 'slider-perspective-active',
      next: 'slider-perspective-next'
    };

    const config = {
      autoplay: true,
      // autoplay: false,
      delayAutoplay: 6000,
      delayAutoplayAfterClick: 10000,
      breakPoint: 800
    };

    const btnNext = slider.querySelector('.js-slider-perspective-control-next');
    const btnPrev = slider.querySelector('.js-slider-perspective-control-prev');
    const pagination = {
      el: slider.querySelector('.slider-perspective-pagination'),
      items: []
    };
    let createdNow = '';
    let mobileSlider = null;

    let autoChangeTimer = {
      enable: true,
      timer: null
    };

    let current = {
      active: null,
      prev: null,
      next: null,
      index: 0
    };

    const getNext = (start) => {
      start += 1;
      return start === len ? 0 : start;
    };

    const getPrev = (start) => {
      start -= 1;
      return start < 0 ? len - 1 : start;
    };

    const switchSlide = () => {
      if (current.active) current.active.classList.remove(styleClasses.active);
      if (current.prev) current.prev.classList.remove(styleClasses.prev);
      if (current.next) current.next.classList.remove(styleClasses.next);

      pagination.items[current.index].classList.add('swiper-pagination-bullet-active');

      current.active = slides[current.index];
      current.prev = slides[getPrev(current.index)];
      current.next = slides[getNext(current.index)];

      current.active.classList.add(styleClasses.active);
      current.prev.classList.add(styleClasses.prev);
      current.next.classList.add(styleClasses.next);
    };

    const listenAutoStart = () => {
      autoChangeTimer.enable = false;
      clearTimeout(autoChangeTimer.timer);
      autoChangeTimer.timer = setTimeout(() => {
        autoChangeTimer.enable = true;
        startAutoChange();
      }, config.delayAutoplayAfterClick);
    };

    const switchSlideToNext = (e) => {
      if (e.isTrusted) {
        listenAutoStart();
      }

      pagination.items[current.index].classList.remove('swiper-pagination-bullet-active');
      current.index = getNext(current.index);

      switchSlide();
    };

    const switchSlideToPrev = (e) => {
      if (e.isTrusted) {
        listenAutoStart();
      }

      pagination.items[current.index].classList.remove('swiper-pagination-bullet-active');
      current.index = getPrev(current.index);
      switchSlide();
    };

    const startAutoChange = () => {
      if (autoChangeTimer.enable && config.autoplay) {
        autoChangeTimer.timer = setTimeout(() => {
          btnNext.click();

          startAutoChange();
        }, config.delayAutoplay);
      }
    };

    const initPerspective = () => {
      autoChangeTimer.enable = true;
      slider.classList.add('slider-perspective--active');

      slider.querySelector('.slider-perspective-control').style.display = 'block';

      requestAnimationFrame(() => {
        container.style.height = container.scrollHeight + 'px';

        Array.from(slides).forEach(item => {
          item.classList.add(styleClasses.item);
        });

        pagination.el.innerHTML = '';
        pagination.items = [];
        current = {
          active: null,
          prev: null,
          next: null,
          index: 0
        };

        for (let i = 0; i < len; i++) {
          const span = document.createElement('span');
          span.classList.add('swiper-pagination-bullet');
          pagination.el.appendChild(span);
          pagination.items.push(span);
        }

        requestAnimationFrame(() => {
          slider.classList.remove('no-transition');
        });

        switchSlide();

        btnNext.addEventListener('click', switchSlideToNext);
        btnPrev.addEventListener('click', switchSlideToPrev);

        startAutoChange();
      });
    };

    const removeMobile = () => {
      Array.from(slides).forEach(item => {
        item.classList.remove('swiper-slide');
      });

      const container = slider.children[0];
      container.classList.remove('swiper-container');
      mobileSlider.destroy(true, true);
    };

    const removePerspective = () => {
      autoChangeTimer.enable = false;
      clearTimeout(autoChangeTimer.timer);

      slider.querySelector('.slider-perspective-control').style.display = '';

      slider.classList.remove('slider-perspective--active');
      container.style.height = '';

      Array.from(slides).forEach(item => {
        item.classList.remove(styleClasses.item);
      });

      if (current.active) current.active.classList.remove(styleClasses.active);
      if (current.prev) current.prev.classList.remove(styleClasses.prev);
      if (current.next) current.next.classList.remove(styleClasses.next);

      btnNext.removeEventListener('click', switchSlideToNext);
      btnPrev.removeEventListener('click', switchSlideToPrev);
    };

    const createPerspective = () => {
      if (document.fonts) {
        if (!document.fonts.check('16px Poppins')) {
          document.fonts.addEventListener('loadingdone', () => {
            initPerspective();
          });
        } else {
          initPerspective();
        }
      } else {
        setTimeout(() => {
          initPerspective();
        }, config.delayAutoplay);
      }
    };

    const initMobile = () => {
      Array.from(slides).forEach(item => {
        item.classList.add('swiper-slide');
      });

      const container = slider.children[0];
      container.classList.add('swiper-container');

      mobileSlider = new Swiper(container, {
        loop: true,
        autoplay: {
          delay: config.delayAutoplay
        },
        spaceBetween: 20,
        pagination: {
          el: '.slider-perspective-pagination'
        }
      });

      requestAnimationFrame(() => {
        slider.classList.remove('no-transition');
      });
    };

    const createMobile = () => {
      removePerspective();
      initMobile();
    };

    const init = () => {
      if (window.innerWidth >= config.breakPoint) {
        if (createdNow !== 'perspective') {
          if (mobileSlider) {
            removeMobile();
          }
          createPerspective();
          createdNow = 'perspective';
        }
      } else {
        if (createdNow !== 'mobile') {
          createMobile();
          createdNow = 'mobile';
        }
      }
    };

    window.addEventListener('resize', () => {
      requestAnimationFrame(() => {
        init();
      });
    });

    init();
  };

  perspectiveSlider();
};
