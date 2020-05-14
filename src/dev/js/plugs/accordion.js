export default class {
  constructor(accCont, settings) {
    const defaultSettings = {
      accItem: 'js-acc-item',
      targetClass: 'js-acc-target',
      buttonClass: 'js-acc-btn',
      accItemShowClass: 'js-show',
      accordionClass: 'accordion'
    };
    this.settings = this.extendObject(defaultSettings, settings || {});
    this.accCont = accCont;
    this.accItems = Array.from(accCont.querySelectorAll(`.${this.settings.accItem}`))
      .filter(accItem => (accItem.querySelector(`.${this.settings.targetClass}`) && accItem.querySelector(`.${this.settings.buttonClass}`)))
      .map(accItem => this.setAccItem(accItem));
    this.needMaxHeight = false;
  };

  extendObject(a, b) {
    let c = {};
    let key;
    for (key in a) {
      if (a.hasOwnProperty(key)) {
        c[key] = key in b ? b[key] : a[key];
      }
    }
    return c;
  }

  setAccItem(accItemEl) {
    return {
      accItemEl: accItemEl,
      target: accItemEl.querySelector(`.${this.settings.targetClass}`),
      button: accItemEl.querySelector(`.${this.settings.buttonClass}`),
      isOpened: false,
      clickHandler: null,
      transEndHandler: null
    };
  };

  openAccItem(accItem) {
    if (this.needMaxHeight) {
      accItem.target.style.maxHeight = `${accItem.target.scrollHeight}px`;
      accItem.transEndHandler = this.transEndHandler.bind(accItem);
      accItem.target.addEventListener('transitionend', accItem.transEndHandler);
    }
    accItem.isOpened = true;
    accItem.accItemEl.classList.add(this.settings.accItemShowClass);
  };

  closeAccItem(accItem) {
    accItem.target.style.maxHeight = `${accItem.target.scrollHeight}px`;

    setTimeout(() => {
      accItem.target.style.maxHeight = '';
      accItem.isOpened = false;
      accItem.accItemEl.classList.remove(this.settings.accItemShowClass);
    }, 100);
  };

  transEndHandler() {
    this.target.removeEventListener('transitionend', this.transEndHandler);
    this.target.style.maxHeight = `initial`;
  };

  toggleAccItem(e) {
    if (this.accItem.isOpened) {
      this.self.closeAccItem(this.accItem);
    } else {
      const openedAccItem = Array.from(this.self.accItems).find(accItem => accItem.isOpened);
      if (openedAccItem) this.self.closeAccItem(openedAccItem);
      this.self.openAccItem(this.accItem);
    };
  };

  destroyAccItem(accItem) {
    accItem.button.removeEventListener('click', accItem.clickHandler);
  };

  destroyAccItems() {
    this.accItems.forEach(accItem => this.destroyAccItem(accItem));
  };

  destroy() {
    this.accCont.classList.remove(this.settings.accordionClass);
    this.destroyAccItems();
  };

  initAccItem(accItem) {
    accItem.clickHandler = this.toggleAccItem.bind({
      accItem,
      self: this
    });
    accItem.button.addEventListener('click', accItem.clickHandler, false);
  };

  initAccItems() {
    this.accItems.forEach(accItem => this.initAccItem(accItem));
  };

  onMaxHeight() {
    this.needMaxHeight = true;

    // const openedAccItem = Array.from(this.accItems).find(accItem => accItem.isOpened);
    // if (openedAccItem) this.openAccItem(openedAccItem);
  };

  offMaxHeight() {
    this.needMaxHeight = false;

    // const openedAccItem = Array.from(this.accItems).find(accItem => accItem.isOpened);
    // if (openedAccItem) {
    //   openedAccItem.target.style.maxHeight = '';
    //   openedAccItem.accItemEl.classList.remove(this.settings.accItemShowClass);
    // }
  };

  onOfAccorMaxHeight() {
    if (window.innerWidth <= 768) {
      this.onMaxHeight();
    } else {
      this.offMaxHeight();
    }
  };

  init() {
    this.accCont.classList.add(this.settings.accordionClass);
    this.initAccItems();

    window.addEventListener('resize', this.onOfAccorMaxHeight.bind(this), false);
    this.onOfAccorMaxHeight();
  };
};