export default () => {
  const RESET_PASS = document.querySelector('#reset-pass-popup');
  const VERIFICATION_POPUP = document.querySelector('#new-pass-popup');
  const EMAIL_REG_EXP = /^\S+@\S+\.\S+$/;

  if (!RESET_PASS) return;

  const FORM = RESET_PASS.querySelector('form');
  const EMAIL_INPUT_BLOCK = RESET_PASS.querySelector('.almo-input-block');
  const EMAIL_INPUT = RESET_PASS.querySelector('.almo-input-text');
  const CLOSE_POPUP_BTN = RESET_PASS.querySelector('.js-close-popup-btn');
  const VERIFICATION_POPUP_EMAIL = VERIFICATION_POPUP.querySelector('.almo-input-email');

  function clearResetPopup() {
    EMAIL_INPUT_BLOCK.classList.remove('almo-input-block--error');
    EMAIL_INPUT.value = '';
  };

  function resetPassSubmitHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    let preloader = document.getElementsByClassName('holder');

    if (EMAIL_REG_EXP.test(EMAIL_INPUT.value)) {
      EMAIL_INPUT_BLOCK.classList.remove('almo-input-block--error');

      if ( typeof jQuery !== 'undefined' ) {
        $ = jQuery;

        $('.js-resetpass-error-message').hide();

        jQuery.ajax({
          url: ajaxUrl,
          type : 'post',
          data: {
            action: 'forgot_password',
            username: EMAIL_INPUT.value
          },
          beforeSend: function() {
            preloader[0].classList.add('js-reload-show');
          },
          success: function( response ) {
            if ( response.status === 'OK' ) {
              CLOSE_POPUP_BTN.click();
              const openPopupEvent = new CustomEvent('needOpenPopup', {detail: 'new-pass-popup'});
              window.dispatchEvent(openPopupEvent);
              VERIFICATION_POPUP_EMAIL.value = EMAIL_INPUT.value;
              preloader[0].classList.remove('js-reload-show');
            } else {
              console.error( response.msg );
              EMAIL_INPUT_BLOCK.classList.add('almo-input-block--error');
              preloader[0].classList.remove('js-reload-show');
            }
          }
        });
      }
    } else {
      EMAIL_INPUT_BLOCK.classList.add('almo-input-block--error');
    }

    return false;
  };

  window.addEventListener('openPopup', e => {
    if (e.detail.dataset.popup !== 'reset-pass-popup') return;
    clearResetPopup();
  });

  FORM.addEventListener('submit', resetPassSubmitHandler);
}
