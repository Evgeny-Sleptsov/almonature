import Accordion from '../plugs/accordion';

export default () => {
  const footerList = document.querySelector('.almo-footer__links__list');
  if (footerList) {
    const accFooter = new Accordion(
      footerList, {
        accItem: 'js-accor-item',
        targetClass: 'js-accor-target',
        buttonClass: 'js-accor-btn',
        accordionClass: 'mobile'
      }
    );

    accFooter.init();
  }
};
