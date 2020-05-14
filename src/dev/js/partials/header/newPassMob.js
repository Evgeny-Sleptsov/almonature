export default () => {
  const NEW_PASS_POPUP = document.querySelector('#new-pass-popup-mob');

  if (!NEW_PASS_POPUP) return;

  const FORM = NEW_PASS_POPUP.querySelector('form');

  function newPassSubmitHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    if ( typeof jQuery !== 'undefined' ) {
    	$ = jQuery;

		jQuery.ajax({
			url: ajaxUrl,
			type : 'post',
			data: {
			  action: 'set_new_password',
			  username: document.querySelector('#submenu-reset-pass').querySelector('.almo-input-text').value,
			  password: document.querySelector('#new-pass-popup-mob').querySelector('.almo-input-text[name="password"]').value,
			  confirmation_code: document.querySelector('#new-pass-popup-mob').querySelector('.almo-input-text[name="code"]').value
			},
			beforeSend: function() {
				$('.js-resetpass-error-message').hide();
			},
			success: function( response ) {
			  if ( response.status == 'OK' ) {
			  	const openResetedPassSubmenuEvent = new CustomEvent('needOpenSubMenu', {detail: {
				  submenu: 'submenu-pass-reseted',
				  noTran: true
				}});
				window.dispatchEvent(openResetedPassSubmenuEvent);
			  } else {
			    console.error( response.msg );

			    $('.js-resetpass-error-message .js-text-container').text( response.msg );
			  	$('.js-resetpass-error-message').show();
			  }
			}
		});
		}
	}

	FORM.addEventListener('submit', newPassSubmitHandler);
}