export default class Scroll {
  constructor(functionToCall = () => {}) {
    this.functionToCall = functionToCall;
    this.ticking = false;
    this.prevValueV = 0;
    this.prevValueH = 0;
    this.param = {
      direct: {
        vertical: 'no-scroll',
        horizontal: 'no-scroll'
      },
      scrollPage: 0,
      scrollLeft: 0
    };
    this.curScrollHandler = null;
  };

  directScrollV(scrollTop) {
    const result = (scrollTop - this.prevValueV > 0) ? 'down'
      : (scrollTop - this.prevValueV < 0) ? 'up'
      : 'no-scroll';
    this.prevValueV = scrollTop;
    return result;
  };

  directScrollH(scrollLeft) {
    const result = (scrollLeft - this.prevValueH > 0) ? 'right'
      : (scrollLeft - this.prevValueH < 0) ? 'left'
      : 'no-scroll';
    this.prevValueH = scrollLeft;
    return result;
  };

  handlerScroll(e) {
    this.param.scrollPage = window.pageYOffset || document.documentElement.scrollTop;
    this.param.scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    this.param.direct.vertical = this.directScrollV(this.param.scrollPage);
    this.param.direct.horizontal = this.directScrollH(this.param.scrollLeft);
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.functionToCall(this.param);
        this.ticking = false;
      });
    };
    this.ticking = true;
  };

  destroy() {
    window.removeEventListener('scroll', this.curScrollHandler);
  };

  init() {
    this.curScrollHandler = this.handlerScroll.bind(this);
    window.addEventListener('scroll', this.curScrollHandler, false);
    this.curScrollHandler();
  };
};
