const emailRegExp = /^\S+@\S+\.\S+$/;

const startCheck = function(e) {
  this.removeAttribute('data-listen-blur');
  this.removeEventListener('blur', startCheck);
  this.setAttribute('data-listen-input', 'true');

  validEmail(e);
};

const validEmail = (e) => {
  if (e.target.dataset.listenInput === 'true') {
    if (!emailRegExp.test(e.target.value)) {
      e.target.parentNode.classList.add('almo-input-block--error');
      e.target.nextElementSibling.innerText = 'Something is wrong with the email. Please, correct.';
    } else {
      e.target.parentNode.classList.remove('almo-input-block--error');
    }
  }

  if (e.target.dataset.listenBlur !== 'true' && e.target.dataset.listenInput !== 'true') {
    e.target.addEventListener('blur', startCheck);
    e.target.setAttribute('data-listen-blur', 'true');
  }
};

export default (() => { window.validEmail = validEmail; })();
