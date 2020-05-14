import Swiper from 'swiper';

let listenerAdded = false;

export default () => {
  new Swiper('.almo-project-actions-slider__block .swiper-container', {
    loop: true,
    speed: 1000,
    // autoplay: {
    //   delay: 6000
    // },
    pagination: {
      el: '.almo-project-actions-slider__block .slider-pagination'
    },
    navigation: {
      nextEl: '.almo-project-actions-slider__block .almo-btn--slider-next',
      prevEl: '.almo-project-actions-slider__block .almo-btn--slider-prev'
    },
    breakpoints: {
    },
    on: {
      init() {
        const attr = 'data-lazy-slider-src';
        const setSrc = () => {
          Array.from(this.slides).forEach(item => {
            const img = item.querySelector('img');
            const wrap = img.parentNode;

            const removeAttr = () => {
              // wrap.removeAttribute(`${attr}`);
              // wrap.classList.remove('lazy-img-loaded');
              wrap.removeEventListener('transitionend', removeAttr);
            };
            wrap.addEventListener('transitionend', removeAttr);

            img.onload = () => {
              wrap.classList.add('lazy-img-loaded');
              img.onload = null;
            };

            img.src = wrap.getAttribute(`${attr}`);
          });
        };
        // Create lazy load for images
        if (!('IntersectionObserver' in window)) {
          const loadLazyImages = () => {
            window.removeEventListener('load', loadLazyImages);

            setSrc();
          };
          window.addEventListener('load', loadLazyImages);
          return false;
        }

        const options = {
          rootMargin: '0px',
          threshold: 0
        };

        const onIntersection = (entries) => {
          entries.forEach(entry => {
            if (entry.intersectionRatio >= 0 && entry.isIntersecting) {
              observer.unobserve(entry.target);

              setSrc();
            }
          });
        };

        const observer = new IntersectionObserver(onIntersection, options);

        observer.observe(document.querySelector('.almo-project-actions-slider__block'));
      }
    }
  });

  const perspectiveSlider = () => {
    const sliders = document.querySelectorAll('.js-slider-perspective');
    const slider = Array.from(sliders).find(item => item.scrollHeight);

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
      delayAutoplay: 10000,
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
      slider.classList.remove('direction--prev');
      slider.classList.add('direction--next');

      if (e && e.isTrusted) {
        listenAutoStart();
      }

      pagination.items[current.index].classList.remove('swiper-pagination-bullet-active');
      current.index = getNext(current.index);

      switchSlide();
    };

    const switchSlideToPrev = (e) => {
      slider.classList.remove('direction--next');
      slider.classList.add('direction--prev');

      if (e && e.isTrusted) {
        listenAutoStart();
      }

      pagination.items[current.index].classList.remove('swiper-pagination-bullet-active');
      current.index = getPrev(current.index);
      switchSlide();
    };

    const startAutoChange = () => {
      if (autoChangeTimer.enable && config.autoplay) {
        autoChangeTimer.timer = setTimeout(() => {
          switchSlideToNext();
          startAutoChange();
        }, config.delayAutoplay);
      }
    };

    const stopAutoChange = () => {
      if (autoChangeTimer.enable && config.autoplay) {
        autoChangeTimer.enable = false;
        clearTimeout(autoChangeTimer.timer);
      }
    };

    const initPerspective = () => {
      if (slider.classList.contains('slider-perspective--active')) return;
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

        // Stop autochange by hover
        slider.addEventListener('mouseenter', stopAutoChange);
        slider.addEventListener('mouseleave', listenAutoStart);

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

      slider.classList.remove('direction--next');
      slider.classList.remove('direction--prev');

      btnNext.removeEventListener('click', switchSlideToNext);
      btnPrev.removeEventListener('click', switchSlideToPrev);

      slider.removeEventListener('mouseenter', stopAutoChange);
      slider.removeEventListener('mouseleave', listenAutoStart);
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
