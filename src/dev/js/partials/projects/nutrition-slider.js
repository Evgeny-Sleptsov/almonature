import Swiper from 'swiper';
export default () => {
  const sliderBlock = document.querySelector('.nutritional__slider');
  const prev = document.querySelector('.nutritional__slider-wrap .almo-btn--slider-prev');
  const next = document.querySelector('.nutritional__slider-wrap .almo-btn--slider-next');
  const pag = document.querySelector('.nutritional__slider-wrap .slider-pagination');
  const slidesItems = document.querySelectorAll('.nutritional__slider-item');

  if (!sliderBlock) return false;

  const mediaDesktop = window.matchMedia('(max-width: 1023px)');

  const newSlider = new Slider(sliderBlock, prev, next, pag);

  function mediaChangeHandler(mediaQuery) {
    if (slidesItems.length > 5) {
      if (mediaQuery.matches) {
        return newSlider.mobile();
      }
      return newSlider.init();
    } else if (slidesItems.length < 5) {
      sliderBlock.querySelector('.swiper-wrapper').style.justifyContent = 'center';
    }
  }

  mediaDesktop.addListener(mediaChangeHandler);
  mediaChangeHandler(mediaDesktop);
};

function hideControlBox() {
  const sliderBtnBox = document.querySelector('.nutritional__slider-wrap .slider-control');
  const pag = document.querySelector('.nutritional__slider-wrap .slider-pagination');
  sliderBtnBox.style.display = 'none';
  pag.style.display = 'block';
}
function showControlBox() {
  const sliderBtnBox = document.querySelector('.nutritional__slider-wrap .slider-control');
  const pag = document.querySelector('.nutritional__slider-wrap .slider-pagination');
  sliderBtnBox.style.display = 'flex';
  pag.style.display = 'none';
}
class Slider {
  constructor(elem, next, prev, pag) {
    this.slider = null;
    this.elem = elem;
    this.next = next;
    this.prev = prev;
    this.pag = pag;
  }

  init() {
    if (this.slider) this.slider.destroy();
    showControlBox();
    this.slider = new Swiper(this.elem, {
      speed: 400,
      loop: true,
      slidesPerView: 'auto',
      autoplay: {
        delay: 8000,
        disableOnInteraction: false
      },
      keyboard: {
        enabled: true
      },
      navigation: {
        nextEl: this.prev,
        prevEl: this.next
      },
      allowTouchMove: false
    });
  }

  mobile() {
    if (this.slider) this.slider.destroy();
    hideControlBox();
    this.slider = new Swiper(this.elem, {
      speed: 400,
      loop: true,
      slidesPerView: 'auto',
      autoplay: {
        delay: 8000,
        disableOnInteraction: false
      },
      allowTouchMove: true,
      pagination: {
        el: this.pag,
        clickable: true
      }
    });
  }

    }
