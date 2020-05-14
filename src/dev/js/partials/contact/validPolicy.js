const validPolicy = (callBack) => {
  const sendFormBtn = document.getElementById('sendForm');

  const form = document.getElementById('form-privacy');

  const checkboxes = Array.from(form.elements);
  const required = checkboxes.filter(item => item.required);

  required.forEach(item => {
    item.addEventListener('change', (e) => {
      const parent = item.closest('.almo-checkbox-block');
      if (item.checked) {
        parent.classList.remove('almo-checkbox-block--error');
      } else {
        parent.classList.add('almo-checkbox-block--error');
      }
    });
  });

  sendFormBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const errors = required.filter(item => {
      return !item.checked;
    });

    if (errors.length > 0) {
      errors.forEach(item => {
        const parent = item.closest('.almo-checkbox-block');
        parent.classList.add('almo-checkbox-block--error');
      });
    } else {
      if (callBack && typeof callBack === 'function') {
        callBack(window.resultForm, sendFormBtn.href);
      }
    }
  });
};

export default validPolicy;