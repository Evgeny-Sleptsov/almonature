export default () => {
  const SIGN_IN_SUB_MENU = document.querySelector('#submenu-sign');
  if (!SIGN_IN_SUB_MENU) return;
  const SIGN_IN_FORM = SIGN_IN_SUB_MENU.querySelector('form');

  function signInFormSubmitHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    /* Below actions are triggered based on API Response in main.js in WP */

    /*const eventOpenChangeTempPass = new CustomEvent('needOpenSubMenu', {detail: {
      submenu: 'submenu-change-temp-pass',
      noTran: true
    }});
    window.dispatchEvent(eventOpenChangeTempPass);*/
  }

  SIGN_IN_FORM.addEventListener('submit', signInFormSubmitHandler);
}