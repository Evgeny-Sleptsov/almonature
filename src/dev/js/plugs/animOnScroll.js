
import Scroll from './scrollHandler';

export default class PlayAnimationOnScroll {
  constructor(classAnimEl = 'start', classAfterFinish = 'finish') {
    this.isAnimScroll = true;
    this.startClass = classAnimEl;
    this.finishClass = classAfterFinish;
    this.diffDisplay = window.innerWidth < 600 ? 0.75 : 0.6;
    this.elements = [];
    this.scroll = null;
  };

  scrollAnim(param) {
    if (this.elements.length === 0) {
      this.scroll.destroy();
      this.scroll = null;
    };

    this.elements.forEach((item) => {
      const posEl = item.elem.getBoundingClientRect();

      const diff = item.elem.dataset.inView ? window.innerHeight * (1 - Number(item.elem.dataset.inView)) : window.innerHeight * this.diffDisplay;

      if (posEl.top <= diff) {
        if (!item.animEnd) {

          // If transition missing - remove listener and classes in 20sec
          const timer = setTimeout(() => {
            item.animEnd();
          }, 20000);

          item.animEnd = this.animEnd.bind({ item, self: this, timer });
          item.elem.addEventListener('transitionend', item.animEnd);

          if (item.willChange) {
            item.elem.style.willChange = item.willChange;
          };
        };
        item.elem.classList.remove(this.startClass);
      };
    });
  }

  animEnd(e) {
    if (this.timer) clearTimeout(this.timer);

    this.item.elem.removeEventListener('transitionend', this.item.animEnd);
    if (this.item.willChange) {
      this.item.elem.removeAttribute('data-will-change');
      this.item.elem.style.willChange = '';
    };
    this.item.elem.classList.add(this.self.finishClass);
    this.self.elements.splice(this.self.elements.findIndex(item => item.index === this.item.index), 1);
  };

  init() {
    Array.from(document.querySelectorAll(`.${this.startClass}`)).forEach((elem, index) => {
      this.elements.push({
        index,
        elem,
        willChange: elem.dataset.willChange,
        animEnd: null
      });
    });

    this.scroll = new Scroll(this.scrollAnim.bind(this));
    this.scroll.init();
  };
};
