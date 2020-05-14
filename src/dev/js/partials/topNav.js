export default () => {
  const burger = document.querySelector('.js-burger');
  const nav = document.querySelector('.js-mob-nav');

  if (!burger || !nav) return;

  function toggleNav() {
    burger.classList.toggle('js-active');
    nav.classList.toggle('js-active');
    document.body.classList.toggle('js-no-scroll');
    document.documentElement.classList.toggle('js-no-scroll');
  }

  burger.addEventListener('click', toggleNav, false);
};
