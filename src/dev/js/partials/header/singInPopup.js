export default () => {
  const SIGN_IN_POPUP = document.querySelector('#sign-in-pupop');

  if (!SIGN_IN_POPUP) return;

  const SIGN_IN_FORM = SIGN_IN_POPUP.querySelector('form');

  function signInFormSubmitHandler(e) {
    e.preventDefault();
    e.stopPropagation();


    /* Below actions are triggered based on API Response in main.js in WP */

    /*if (true) {
      const eventOpenChangePassPopup = new CustomEvent('needOpenPopup', {detail: 'change-temp-pass-popup'});
      window.dispatchEvent(eventOpenChangePassPopup);

      const eventCloseSignInPopup = new CustomEvent('needClosePopup', {detail: 'sign-in-pupop'});
      window.dispatchEvent(eventCloseSignInPopup);
    }*/
  }

  SIGN_IN_FORM.addEventListener('submit', signInFormSubmitHandler);
}