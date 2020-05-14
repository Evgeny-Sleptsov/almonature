export default () => {
  const COUNTRY_LOC_POPUP = document.querySelector('#country-loc-popup');
  if (!COUNTRY_LOC_POPUP) return;

  if (true) {
    setTimeout(() => {
      if (window.innerWidth <= 768) COUNTRY_LOC_POPUP.removeAttribute('data-with-scroll');
      const openPopupEvent = new CustomEvent('needOpenPopup', {detail: 'country-loc-popup'});
      window.dispatchEvent(openPopupEvent);
    }, 100);
  }
}