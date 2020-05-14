export default (() => {
  const catalogueBlock = document.querySelector('.almo-app-wrapper #catalogue');
  const url = window.location.href;
  const regex = /\?(.+)/;
  if (!regex.test(url) || !catalogueBlock) {
    return;
  }

  const top = catalogueBlock.offsetTop;
  window.scrollTo(0, top);
})();

