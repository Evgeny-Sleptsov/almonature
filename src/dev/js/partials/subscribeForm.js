import NativeValid from '../plugs/nativeValid';

export default () => {
  const SUBSCR_FORM = Array.from(document.querySelectorAll('.js-subsrc-form'));
  if (!SUBSCR_FORM.length) return;

  const emailRegExp = /^\S+@\S+\.\S+$/;
  function subscrFormSubmitHandler(form) {
    const input = form.querySelector('input[type="email"]');

    if (validEmail(input)) {
      const btn = form.querySelector('.js-togglePopup');
      btn.dataset.email = input.value;
      btn.click();
    }
  };

  function validEmail(input) {
    if (!emailRegExp.test(input.value)) {
      input.parentNode.classList.add('almo-input-block--error');
      input.nextElementSibling.innerText = input.dataset.customErrorMessagePatternMismatch || 'Something is wrong with the email. Please, enter correct';
      return false;
    } else {
      input.parentNode.classList.remove('almo-input-block--error');
      return true;
    }
  };

  SUBSCR_FORM.forEach(form => {
    const input = form.querySelector('input[type="email"]');

    if (!input) return false;
    form.onsubmit = (e) => {
      input.removeAttribute('data-first-input');
      input.setAttribute('data-valid-input', '');
      e.preventDefault();
      subscrFormSubmitHandler(form);
    };
    
    input.addEventListener('input', () => {
      if (!input.hasAttribute('data-valid-input')) return false;
      validEmail(input);
    });
    input.addEventListener('focus', () => {
      if (input.hasAttribute('data-valid-input')) return false;
      input.setAttribute('data-first-input', '');
    });
    input.addEventListener('blur', () => {
      input.removeAttribute('data-first-input');
      input.setAttribute('data-valid-input', '');
      validEmail(input);
    });
  });

  // SUBSCR_FORM.forEach(form => new NativeValid(form, {
  //   error: '.almo-input-block--error',
  //   messages: {
  //     patternMismatch: null,
  //     rangeOverflow: null,
  //     rangeUnderflow: null,
  //     stepMismatch: null,
  //     valueMissing: null,
  //     typeMismatch: null
  //   },
  //   form: {
  //     preventSubmit: subscrFormSubmitHandler
  //   }
  // }).init());
}
