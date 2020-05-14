export default () => {
  const HEADER = document.querySelector('.almo-header-mob');
  const RESET_PASS_MOB = document.querySelector('#submenu-reset-pass');
  const EMAIL_REG_EXP = /^\S+@\S+\.\S+$/;

  if (!HEADER || !RESET_PASS_MOB) return;

  const FORM = RESET_PASS_MOB.querySelector('form');
  const EMAIL_INPUT_BLOCK = RESET_PASS_MOB.querySelector('.almo-input-block');
  const EMAIL_INPUT = RESET_PASS_MOB.querySelector('.almo-input-text');

  function clearResetSubMenu(e) {
    if (e.detail === RESET_PASS_MOB) {
      EMAIL_INPUT_BLOCK.classList.remove('almo-input-block--error');
      EMAIL_INPUT.value = '';
    }
  };

  function resetPassSubmitHandler(e) {
    e.preventDefault();
    e.stopPropagation();

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
          success: function( response ) {
            if ( response.status == 'OK' ) {
              const eventOpenNewPass = new CustomEvent('needOpenSubMenu', {detail: {
                submenu: 'submenu-new-pass',
                noTran: true
              }});
              window.dispatchEvent(eventOpenNewPass);
            } else {
              console.error( response.msg );
              EMAIL_INPUT_BLOCK.classList.add('almo-input-block--error');
            }
          }
        });
      }
    } else {
      EMAIL_INPUT_BLOCK.classList.add('almo-input-block--error');
    }

    return false;
  };

  FORM.addEventListener('submit', resetPassSubmitHandler);
  HEADER.addEventListener('submenuOpened', clearResetSubMenu);
}