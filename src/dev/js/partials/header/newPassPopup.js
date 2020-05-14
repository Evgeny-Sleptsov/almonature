export default () => {
  const NEW_PASS_POPUP = document.querySelector('#new-pass-popup');
  if (!NEW_PASS_POPUP) return;
  const FORM = NEW_PASS_POPUP.querySelector('form');
  const CLOSE_POPUP_BTN = NEW_PASS_POPUP.querySelector('.js-close-popup-btn');

  function newPassSubmitHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    let preloader = document.getElementsByClassName('holder');

    if ( typeof jQuery !== 'undefined' ) {
    	$ = jQuery;

    	jQuery.ajax({
			url: ajaxUrl,
			type : 'post',
			data: {
			  action: 'set_new_password',
			  username: NEW_PASS_POPUP.querySelector('.almo-input-email').value,
			  password: NEW_PASS_POPUP.querySelector('.almo-input-text[name="password"]').value,
			  confirmation_code: NEW_PASS_POPUP.querySelector('.almo-input-text[name="code"]').value
			},
			beforeSend: function() {
				$('.js-resetpass-error-message').hide();
        preloader[0].classList.add('js-reload-show');
			},
			success: function( response ) {
			  if ( response.status === 'OK' ) {
			    CLOSE_POPUP_BTN.click();

			    const event = new CustomEvent('needOpenPopup', { detail: 'pass-reseted-popup' });
	            window.dispatchEvent(event);
          preloader[0].classList.remove('js-reload-show');
			  } else {
			    console.error( response.msg );

			    $('.js-resetpass-error-message .js-text-container').text( response.msg );
			  	$('.js-resetpass-error-message').show();
          preloader[0].classList.remove('js-reload-show');
			  }
			}
		});
		}
	}

	FORM.addEventListener('submit', newPassSubmitHandler);
}