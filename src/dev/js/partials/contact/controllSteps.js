class Steps {
  constructor() {
    this._wrapper = document.querySelector('.almo-contact-top__steps ul');
    this._odd = document.getElementById('step-odd').innerHTML;
    this._even = document.getElementById('step-even').innerHTML;
    this._first = this._wrapper.innerHTML;
    this._sumSteps;
    this.li;
    this.step = 0;
  }

  clear() {
    this._wrapper.innerHTML = '';
  }

  set steps(val) {
    if (val !== 0 && this._sumSteps !== val) {
      let _val = val || 4;
      this._sumSteps = _val;
      let str = this._first;

      for (let i = 1; i < _val; i++) {
        if (i % 2 === 0) {
          str += this._even;
        } else {
          str += this._odd;
        }
      }
      this._wrapper.innerHTML = str;

      this.li = this._wrapper.querySelectorAll('ul > li');

      const temp = this.step;
      this.step = 0;
      this.active = temp + 1;
    }
  }

  set active(val) {
    if (this.li[this.step]) this.li[this.step].classList.remove('active');
    this.step = val - 1;
    if (this.li[this.step]) {
      this.li[this.step].classList.add('active');
    } else {
      this.clear();
    }
  }
}

export default Steps;
