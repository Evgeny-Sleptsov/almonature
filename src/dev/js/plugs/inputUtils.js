const emailRegExp = /^\S+@\S+\.\S+$/;

class Inputs {
  constructor() {
    this.setts = {
      wrapper: '.almo-input-block',
    };
  }
  validEmail(e) {
    if (!emailRegExp.test(e.target.value)) {
      e.target.parentNode.classList.add('almo-input-block--error');
      e.target.nextElementSibling.innerText = e.target.dataset.errorInputEmail || 'Something is wrong with the email. Please, enter correct';
    } else {
      e.target.parentNode.classList.remove('almo-input-block--error');
    }
  }
  togglePassVisible(e) {
    const target = e.target.closest('button');
    const wrap = target.closest(this.setts.wrapper);

    if (wrap.classList.contains('pass-visible')) {
      wrap.classList.remove('pass-visible');
      const input = wrap.querySelector('input[type=text]');

      if (!input) return false;

      input.setAttribute('type', 'password');
    } else {
      wrap.classList.add('pass-visible');
      const input = wrap.querySelector('input[type=password]');

      if (!input) return false;

      input.setAttribute('type', 'text');
    }
  }
};

export default new Inputs();
