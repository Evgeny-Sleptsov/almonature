export default () => {
  const SUB_POPUP = document.querySelector('#subscr-pupop');
  const EMAIL_REG_EXP = /^\S+@\S+\.\S+$/;

  if (!SUB_POPUP) return;

  const DATA = {
    email: ''
  };

  // email block elements
  const EMAIL_FORM = SUB_POPUP.querySelector('.almo-subscr__email');
  const EMAIL_COMP = {
    emailInput: EMAIL_FORM.querySelector('.almo-subscr__email__input'),
    emailInputBlock: EMAIL_FORM.querySelector('.almo-subscr__email__input__block'),
    checkPromo: EMAIL_FORM.querySelector('.almo-subscr__email__check-promo'),
    checkPromoBlock: EMAIL_FORM.querySelector('.almo-subscr__email__check-promo__block'),
    checkPesonal: EMAIL_FORM.querySelector('.almo-subscr__email__check-personal'),
    checkPesonalBlock: EMAIL_FORM.querySelector('.almo-subscr__email__check-personal__block')
  };
  let isSocBlock = true;

  // soc block elements
  const SOC_BLOCK = SUB_POPUP.querySelector('.almo-subscr__soc');
  const SOC_BTNS = Array.from(SOC_BLOCK.querySelectorAll('.almo-btn--soc'));

  // done block elements
  const DONE_BLOCK = SUB_POPUP.querySelector('.almo-subscr__done');

  let hiddenElemsAnimated = false;

  // email block functions
  function emailInputFocusHandler(e, preventAnim) {
    const hiddenElem = Array.from(EMAIL_FORM.querySelectorAll('.almo-subscr__email--hidden-block'));

    if (!preventAnim) {
      hiddenElem.forEach(elem => (elem.addEventListener('transitionend', transitionEndHandler), elem.style.maxHeight = `${elem.scrollHeight}px`));
    } else {
      hiddenElemsAnimated = true;
      hiddenElem.forEach(elem => elem.style.maxHeight = 'initial');
    }

    function transitionEndHandler(e) {
      const target = e.target;
      hiddenElemsAnimated = true;
      target.style.maxHeight = 'initial';
      target.removeEventListener('transitionend', transitionEndHandler);
    };

    EMAIL_COMP.emailInput.removeEventListener('focus', emailInputFocusHandler);
  };

  function emailInputTypeHandler(e) {
    emailInputErrorToggler();
  };

  function emailPromoChecboxChangeHandler(e) {
    emailPromoChecboxErrorToggler();
  };

  function emailPersonalCheckboxChangeHandler(e) {
    emailPersonalCheckboxErrorToggler();
  };

  function emailInputErrorToggler() {
    toggleElemClass(EMAIL_COMP.emailInputBlock, 'almo-input-block--error', isEmailInputValid());
  };

  function emailPromoChecboxErrorToggler() {
    toggleElemClass(EMAIL_COMP.checkPromoBlock, 'almo-checkbox-block--error', isPromoCheckboxValid());
  };

  function emailPersonalCheckboxErrorToggler() {
    toggleElemClass(EMAIL_COMP.checkPesonalBlock, 'almo-checkbox-block--error', isPersonalChecboxValid());
  };

  function emailSubmitHandler(e) {
    if (isEmailFormValid()) {
      DATA.email = EMAIL_COMP.emailInput.value;
      SUB_POPUP.querySelector('.js-close-popup-btn').click();

      const openQiuzPopupEvent = new CustomEvent('needOpenPopup', {
        detail: 'quiz-pupop'
      });
      window.dispatchEvent(openQiuzPopupEvent);

      // TODO: add subscribed state
    } else {
      emailFormValidTips();
    }

    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  function isEmailFormValid() {
    return isEmailInputValid() && isPromoCheckboxValid() && isPersonalChecboxValid();
  };

  function isEmailInputValid() {
    return EMAIL_REG_EXP.test(EMAIL_COMP.emailInput.value);
  };

  function isPromoCheckboxValid() {
    return EMAIL_COMP.checkPromo.checked;
  };

  function isPersonalChecboxValid() {
    return EMAIL_COMP.checkPesonal.checked;
  };

  function emailFormValidTips() {
    emailInputErrorToggler();
    emailPromoChecboxErrorToggler();
    emailPersonalCheckboxErrorToggler();
  };

  // soc block functions
  function socSubmitHandler(e, preventAnim) {
    if (e == null) {
      hideElement(SOC_BLOCK);
      showElement(EMAIL_FORM);
    }
    emailInputFocusHandler(e, preventAnim);
  };
  

  // suport function
  function toggleElemClass(el, clss, action) {
    el.classList[action ? 'remove' : 'add'](clss);
  };

  function hideElement(elem) {
    elem.style.display = 'none';
  };

  function showElement(elem) {
    elem.style.display = 'block';
  };

  // init functions
  function initResetSubscribePopup(action) {
    const eventAction = action === 'init' ? 'addEventListener' : 'removeEventListener';

    // init email
    if (!hiddenElemsAnimated) EMAIL_COMP.emailInput[eventAction]('focus', emailInputFocusHandler, false);
    EMAIL_COMP.emailInput[eventAction]('input', emailInputTypeHandler, false);
    EMAIL_COMP.checkPromo[eventAction]('change', emailPromoChecboxChangeHandler, false);
    EMAIL_COMP.checkPesonal[eventAction]('change', emailPersonalCheckboxChangeHandler, false);
    EMAIL_FORM[eventAction]('submit', emailSubmitHandler, false);
    hideElement(EMAIL_FORM);

    // init soc
    SOC_BTNS.forEach(btn => btn[eventAction]('click', (e) => {socSubmitHandler(e, true)} ));
    hideElement(SOC_BLOCK);

    // init done
    hideElement(DONE_BLOCK);
  };

  window.addEventListener('openPopup', e => {
    if (e.detail.dataset.popup !== 'subscr-pupop') return;
    switch (e.detail.dataset.subscribe) {
      case 'soc':
        initResetSubscribePopup('init');
        hideElement(EMAIL_FORM);
        showElement(SOC_BLOCK);
        EMAIL_FORM.classList.remove('js-use-email');
        EMAIL_FORM.classList.add('js-use-soc');
        e.detail.dataset.email
        if (e.detail.dataset.email) {
          EMAIL_COMP.emailInput.value = e.detail.dataset.email;
          socSubmitHandler(null, true);
        }
        if (!e.detail.dataset.email) {
          EMAIL_COMP.emailInput.value = e.detail.dataset.email;
          socSubmitHandler(false, true);
        }
        break;


      case 'registered':
        initResetSubscribePopup('init');
        hideElement(SOC_BLOCK);
        showElement(EMAIL_FORM);
        EMAIL_FORM.classList.remove('js-use-email');
        EMAIL_FORM.classList.add('js-use-soc');

        if (isSocBlock) {
        setTimeout(function() {
          const hiddenElem = Array.from(EMAIL_FORM.querySelectorAll('.almo-subscr__email--hidden-block'));
          hiddenElem.forEach(elem => (elem.addEventListener('transitionend', transitionEndHandler), elem.style.maxHeight = `${elem.scrollHeight}px`));

          function transitionEndHandler(e) {
            const target = e.target;
            target.style.maxHeight = 'initial';
            target.removeEventListener('transitionend', transitionEndHandler);
          };
        }, 1000);
        isSocBlock = false;
      }

        break;

      case 'email':
        initResetSubscribePopup('init');
        hideElement(SOC_BLOCK);
        showElement(EMAIL_FORM);
        EMAIL_FORM.classList.remove('js-use-soc');
        EMAIL_FORM.classList.add('js-use-email');
        EMAIL_COMP.emailInput.value = '';
        break;

      default:
        break;
    }
  });
};
