export default () => {
  const header = document.querySelector('.almo-header-mob');

  if (!header) return false;

  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    document.body.classList.add('ios-device');
  }

  const burger = header.querySelector('.js-burger');
  const back = header.querySelector('.js-back');
  const nav = header.querySelector('.js-mob-nav');
  const subMenuBtns = Array.from(header.querySelectorAll('.js-open-subpopup'));

  if (!burger || !nav) return;

  function openSubmenu(e) {
    const btn = e.target.closest('button');
    const submenu = header.querySelector(`#${btn.dataset.submenu}`);

    closeSubMenu();

    if (submenu) {
      submenu.classList.add('js-active');
      const event = new CustomEvent('submenuOpened', {
        detail: submenu
      });
      header.dispatchEvent(event);
    }

    if (btn.dataset.noTran) {
      console.log('no-trab');
      const curSubMenu = btn.closest('.almo-header-mob__panel');
      if (curSubMenu) curSubMenu.classList.add('js-no-tran');
      submenu.classList.add('js-no-tran');

      setTimeout(() => {
        if (curSubMenu) curSubMenu.classList.add('js-no-tran');
        submenu.classList.remove('js-no-tran');
      }, 100);
    }
    header.classList.add('open-submenu');
    nav.classList.remove('js-active');
  };

  function closeSubMenu() {
    const submenu = header.querySelector('.almo-header-mob__panel.js-active');
    if (!submenu) return false;
    submenu.classList.remove('js-active');
  }

  function toggleNav() {
    header.classList.remove('open-submenu');
    const current = header.querySelector('.almo-header-mob__panel.js-active');
    const errorMessage = document.querySelector('.js-signin-error-message');
    if (errorMessage) {
      errorMessage.style.display = 'none';
    }

    if (current) {
      current.classList.remove('js-active');
    } else {
      nav.classList.add('js-active');
    }
    let headBanner = document.querySelector('.js-header-banner');
    if (headBanner) {
      headBanner.classList.add('js-hide');
    }

    burger.classList.toggle('js-active');
    document.body.classList.toggle('js-no-scroll');
    document.documentElement.classList.toggle('js-no-scroll');
  }

  const backToNav = () => {
    closeSubMenu();
    header.classList.remove('open-submenu');
    nav.classList.add('js-active');
  };

  window.addEventListener('needOpenSubMenu', (e) => {
    let btn = document.createElement('button');
    btn.dataset.submenu = e.detail.submenu;
    console.dir(e);

    if (e.detail.noTran) {
      btn.dataset.noTran = true;
      btn.setAttribute('data-no-tran', true);
    }
    openSubmenu({
      target: btn
    });
  });

  burger.addEventListener('click', toggleNav, false);
  back.addEventListener('click', backToNav, false);

  subMenuBtns.forEach(btn => btn.addEventListener('click', openSubmenu));
};
