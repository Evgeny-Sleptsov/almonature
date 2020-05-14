import Snap from 'snapsvg';

export default class Section {
  constructor(svg, speed = 1.2) {
    if (!svg.querySelector('.roller')) return false;

    this.enableAnim = true;

    this.snap = Snap(svg);
    this.path = this.snap.select('.svg-bg-path');

    this.startCircle = this.snap.select('.start-point');
    this.finishCircle = this.snap.select('.finish-point');

    this.roller = this.snap.select('.roller');
    this.pattern = this.snap.select('.ball-pattern g');
    this.clip = this.snap.select('.clip-path-el');
    this.clipOffset = parseInt(this.clip.attr()['stroke-dasharray']);

    this.lenPath = Snap.path.getTotalLength(this.path.attr('d'));
    this.firstPoint = this.path.getPointAtLength(0);

    this.counter = 0;
    this.speed = speed;

    this.startPosition;
    this.position;
    this.relativePoints;
    this.relativeScroll;
    this.correction;

    this.delayToShowRoller = this.startCircle ? 50 : 5;

    this.init();
  };

  init() {
    this.startPosition = this.roller.node.getBoundingClientRect().top - this.snap.node.getBoundingClientRect().top;

    this.position = this.path.node.getBoundingClientRect();
    this.relativePoints = this.lenPath / this.position.height;
    this.relativeScroll = window.pageYOffset + this.position.top;
    this.correction = window.innerHeight * 0.25;

    this.roller.attr({
      style: 'opacity: 0;'
    });

    this.render(0);
  };

  getScroll(scroll) {
    return scroll - this.relativeScroll + this.correction;
  };

  transformPattern() {
    this.counter = this.counter >= 32 ? 0 : this.counter * this.speed;

    this.pattern.attr({
      transform: 't' + [0, -this.counter]
    });
  };

  transformRoller(pos) {
    if (pos.y <= this.delayToShowRoller) {
      this.roller.attr({
        style: 'opacity: 0;'
      });
    } else {
      this.roller.attr({
        style: 'opacity: 1;'
      });
    }

    this.roller.attr({
      cx: pos.x,
      cy: pos.y,
      transform: 'r' + (pos.alpha - 90)
    });
  };

  showPath(pers) {
    this.clip.attr({
      strokeDashoffset: this.clipOffset * (1 - pers)
    });
  };

  render(index) {
    const pos = this.path.getPointAtLength(index);

    this.counter++;

    // this.transformRoller(pos);

    // this.transformPattern();

    this.showPath(index / this.lenPath);

    if (index < this.lenPath) return false;

    if (this.finishCircle) {
      this.finishCircle.attr({
        fill: '#EC422B'
      });
    }

    this.roller.attr({
      style: 'opacity: 0;'
    });

    this.snap.node.parentNode.classList.add('finished-roll');
    this.roller.node.classList.add('hide-roller');
    this.showPath(1);
    this.enableAnim = false;
  };

  changePosition(y) {
    if (!this.enableAnim) return false;

    if (this.startCircle) {
      this.startCircle.attr({
        fill: '#EC422B'
      });
    }

    const scroll = this.getScroll(y);

    this.render(scroll * this.relativePoints);
  };
};