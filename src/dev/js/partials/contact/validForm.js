import NativeValid from '../../plugs/nativeValid';

const validForm = () => {
  const validFormBtn = document.querySelector('.js-valid-form');

  const form = document.getElementById('form-step');
  const allInputs = Array.from(form.elements);

  const validation1 = new NativeValid(form, {
    error: '.almo-input-block--error'
  });

  validation1.init();

  const clearState = () => {
    allInputs.forEach((item) => {
      item.value = '';
      item.parentNode.classList.remove('almo-input-block--error');
    });
  };

  window.addEventListener('clearForm', clearState);

  validFormBtn.addEventListener('click', (e) => {
    validation1.checkAllToValidOnState();

    if (form.classList.contains('form-state--error')) {
      e.preventDefault();
    }
  });
};

export default validForm;
