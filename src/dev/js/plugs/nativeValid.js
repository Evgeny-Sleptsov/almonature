class Valid {
  constructor(form, setts) {
    this.form = form;
    this.inputs = form.elements;
    this.formState = 'success';
    this.settsDefault = {
      wrapper: '.input-block',
      message: '.input-error',
      error: '.input-state--error',
      form: {
        error: '.form-state--error',
        preventSubmit: false
      },
      messages: {
        patternMismatch: null,
        rangeOverflow: null,
        rangeUnderflow: null,
        stepMismatch: null,
        valueMissing: null,
        typeMismatch: null
      }
    };

    this.setts = this.extendObject(this.settsDefault, setts || {});
    this.components = [];
  }

  findElements(item) {
    const wrapp = item.closest(this.setts.wrapper);

    if (!wrapp) return false;

    return {
      input: item,
      wrapper: wrapp,
      message: wrapp.querySelector(this.setts.message),
      showError: false,
      firstEnter: true
    };
  }

  init() {
    Array.from(this.inputs).filter(item => item.willValidate).forEach(item => {
      const temp = this.findElements(item);

      if (temp) this.components.push(temp);

      item.addEventListener('input', this.checkValid.bind(this));
      item.addEventListener('change', this.checkValid.bind(this));

      // item.addEventListener('invalid', this.showError.bind(this, this.components.find(i => i.input === item)));

      // item.addEventListener('invalid', this.checkValid.bind(this));

      item.addEventListener('focus', this.addFirstInput.bind(this));
      item.addEventListener('blur', this.removeFirstInput.bind(this));
    });

    this.form.addEventListener('submit', this.handlerSubmitForm.bind(this));

    this.checkAllToValid();
  }

  destroy() {
    Array.from(this.inputs).filter(item => item.willValidate).forEach(item => {
      this.hideError(this.components.find(item => item.input === item));

      item.removeEventListener('input', this.checkValid);
      item.removeEventListener('change', this.checkValid);

      // item.removeEventListener('invalid', this.checkValid);

      item.removeEventListener('focus', this.addFirstInput);
      item.removeEventListener('blur', this.removeFirstInput);
    });

    this.form.removeEventListener('submit', this.handlerSubmitForm);
  }

  handlerSubmitForm(e) {
    if (!this.form.checkValidity()) {
      e.preventDefault();
      return false;
    }

    if (this.setts.form.preventSubmit && typeof this.setts.form.preventSubmit === 'function') {
      e.preventDefault();
      this.setts.form.preventSubmit(this.form);
    }
  }

  addFirstInput(e) {
    const input = e.target;

    const current = this.components.find(item => item.input === input);

    if (!current) return false;

    input.removeEventListener('focus', this.addFirstInput);

    if (!current.firstEnter) {
      current.firstEnter = true;

      this.hideError(current);
    }
  }

  removeFirstInput(e) {
    const input = e.target;

    const current = this.components.find(item => item.input === input);

    if (!current) return false;

    input.removeEventListener('blur', this.removeFirstInput);

    if (current.firstEnter) {
      current.firstEnter = false;

      this.checkValid(e);
    }
  }

  getClearSelector(item) {
    return item.split('.').join('');
  }

  getMessage(input) {
    const validity = input.validity;
    const currentMessage = input.validationMessage;

    if (validity.patternMismatch) {
      return input.dataset.customErrorMessagePatternMismatch || (this.setts.messages.patternMismatch || currentMessage);
    }

    if (validity.rangeOverflow) {
      let max = input.getAttribute('max');
      return `${this.setts.messages.rangeOverflow || currentMessage} ${max}`;
    }

    if (validity.rangeUnderflow) {
      let min = input.getAttribute('min');
      return `${this.setts.messages.rangeOverflow || currentMessage} ${min}`;
    }

    if (validity.stepMismatch) {
      let step = input.getAttribute('step');
      return `${input.dataset.customErrorMessageStep} ${step}` || (`${this.setts.messages.stepMismatch || currentMessage} ${step}`);
    }

    if (validity.valueMissing) {
      return input.dataset.customErrorMessageReqiured || (this.setts.messages.valueMissing || currentMessage);
    }

    if (validity.typeMismatch) {
      return input.dataset.customErrorMessageTypeMismatch || (this.setts.messages.typeMismatch || currentMessage);
    }

    if (!validity.valueMissing && validity.typeMismatch) {
      return input.dataset.customErrorMessageTypeMismatch || (this.setts.messages.typeMismatch || currentMessage);
    }
  }

  showError(el, e) {
    if (!el.firstEnter) {
      el.wrapper.showError = true;
      el.wrapper.classList.add(this.getClearSelector(this.setts.error));
      el.message.innerText = this.getMessage(el.input);
    }
  }

  hideError(el) {
    el.wrapper.showError = false;
    el.wrapper.classList.remove(this.getClearSelector(this.setts.error));
    el.message.innerText = '';
  }

  checkValid(e) {
    const input = e.target ? e.target : e;

    const current = this.components.find(item => item.input === input);

    if (!input.checkValidity()) {
    // if (!input.validity.valid) {
      this.showError(current);
    } else {
      this.hideError(current);
    }

    if (e.target) e.preventDefault();

    if (!this.form.checkValidity()) {
      if (this.formState === 'success') {
        this.formState = 'invalid';

        const clearForm = new CustomEvent('change-state', {
          detail: {
            state: this.formState
          }
        });
        this.form.dispatchEvent(clearForm);
      }

      this.form.classList.add(this.getClearSelector(this.setts.form.error));
    } else {
      if (this.formState === 'invalid') {
        this.formState = 'success';

        const clearForm = new CustomEvent('change-state', {
          detail: {
            state: this.formState
          }
        });
        this.form.dispatchEvent(clearForm);
      }

      this.form.classList.remove(this.getClearSelector(this.setts.form.error));
    }
  }

  submitForm() {
    this.form.submit();
  }

  checkAllToValid() {
    this.components.forEach(item => {
      this.checkValid(item.input);
    });
  }

  checkAllToValidOnState() {
    this.components.forEach(item => {
      item.firstEnter = false;

      this.checkValid(item.input);
    });
  }

  extendObject(a, b) {
    let c = {};
    let key;
    for (key in a) {
      if (a.hasOwnProperty(key)) {
        c[key] = key in b ? (typeof b[key] === 'object' ? this.extendObject(a[key], b[key]) : b[key]) : a[key];
      }
    }
    return c;
  }
};

export default Valid;
