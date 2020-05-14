import Accordion from '../plugs/accordion';
import boxToggler from '../plugs/boxToggler';
import topNav from './header/topNav';
import signInPopup from './header/singInPopup';
import signInMob from './header/singInMob';
import signMob from './header/signMob';
import resetPassPopup from './header/resetPassPopup';
import resetPassMob from './header/resetPassMob';
import countryLocPopup from './header/countryLocPopup';
import newPassPopup from './header/newPassPopup';
import newPassMob from './header/newPassMob';
// import changeTempPassPopup from './header/changeTempPassPopup';
// import searchCountry from './header/_search-country';

export default () => {
  const togglers = document.querySelectorAll('.js-toggler');
  if (togglers) {
    boxToggler(togglers);
  }

  const headerList = document.querySelector('.almo-header-mob__nav__links');

  const scrollToSection = (e) => {
    document.querySelector('.js-burger').click();
    // if(e) e.peventDefault();
  };

  if (headerList) {
    const accHeader = new Accordion(
      headerList, {
        accItem: 'js-accor-item',
        targetClass: 'js-accor-target',
        buttonClass: 'js-accor-btn',
        accordionClass: 'mobile'
      }
    );
    accHeader.init();

    const anchors = headerList.querySelectorAll('[href*="#"]');
    Array.from(anchors).forEach(item => {
      item.addEventListener('click', scrollToSection);
    });
  }

  topNav();

  const checkRegionUser = () => {
    const delayToShowPopup = 3000;
    const region = localStorage.getItem('RegionName');

    if (region) return false;

    const closePopup = (obj) => {
      obj.agree.removeEventListener('click', agreeRegion);
      obj.disagree.removeEventListener('click', disagreeRegion);
      obj.close.removeEventListener('click', closePopup);
      obj.popup.classList.remove('js-opened');
    };

    const agreeRegion = (obj) => {
      localStorage.setItem('RegionName', obj.agree.dataset.region);

      closePopup(obj);
    };

    const disagreeRegion = (obj) => {
      closePopup(obj);

      // document.querySelector('[data-box="country-search"]').click();
    };

    const popup = document.getElementById('loc-popup');

    setTimeout(() => {
      if (!popup) return;

      popup.classList.add('js-opened');

      const obj = {
        popup,
        agree: popup.querySelector('.js-loc-popup-agree'),
        disagree: popup.querySelector('.js-loc-popup-disagree'),
        close: popup.querySelector('.js-loc-popup-close')
      };

      obj.agree.addEventListener('click', agreeRegion.bind(null, obj));
      obj.disagree.addEventListener('click', disagreeRegion.bind(null, obj));
      obj.close.addEventListener('click', closePopup.bind(null, obj));
    }, delayToShowPopup);
  };

  checkRegionUser();
  signMob();
  resetPassPopup();
  resetPassMob();
  signInPopup();
  signInMob();
  countryLocPopup();
  newPassPopup();
  newPassMob();
  // searchCountry();
};
