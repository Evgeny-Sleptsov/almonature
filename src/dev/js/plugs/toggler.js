export default class {
  constructor(accCont, settings) {
    const defaultSettings = {
      accItem: 'item',
      targetClass: 'target',
      buttonClass: 'btn',
      accItemShowClass: 'show',
      accItemAnimationClass: 'toggle-amination',
      accordionClass: 'accordion',
      isNeedClosePrev: false,
      isFirstToOpen: false
    };
    this.active = false;
    this.settings = this.extendObject(defaultSettings, settings || {});
    this.accCont = accCont;
    this.accItems = Array.from(accCont.querySelectorAll(`.${this.settings.accItem}`))
                         .filter(accItem => (accItem.querySelector(`.${this.settings.targetClass}`) && accItem.querySelector(`.${this.settings.buttonClass}`)))
                         .map(accItem => this.setAccItem(accItem));
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
    accItem.transEndHandler = this.transEndHandler.bind(this, accItem);
    accItem.target.addEventListener('transitionend', accItem.transEndHandler);
    accItem.target.classList.add(this.settings.accItemAnimationClass);

    requestAnimationFrame(() => {
      accItem.target.style.maxHeight = `${accItem.target.scrollHeight}px`;

      accItem.isOpened = true;
      accItem.accItemEl.classList.add(this.settings.accItemShowClass);
    });
  };

  closeAccItem(accItem) {
    accItem.transEndHandler = this.transEndHandler.bind(this, accItem);
    accItem.target.style.maxHeight = `${accItem.target.scrollHeight}px`;
    accItem.target.classList.add(this.settings.accItemAnimationClass);

    requestAnimationFrame(() => {
      accItem.target.addEventListener('transitionend', accItem.transEndHandler);

      setTimeout(() => {
        accItem.target.style.maxHeight = 0;
        accItem.isOpened = false;
        accItem.accItemEl.classList.remove(this.settings.accItemShowClass);
      }, 0);
    });
  };

  transEndHandler(accItem) {
    accItem.target.classList.remove(this.settings.accItemAnimationClass);
    accItem.target.removeEventListener('transitionend', accItem.transEndHandler);

    accItem.target.style.maxHeight = accItem.isOpened ? 'initial' : 0;
  };

  toggleAccItem(e) {
    if (this.accItem.isOpened) {
      this.self.closeAccItem(this.accItem);
    } else {
      if (this.self.settings.isNeedClosePrev) {
        const openedAccItem = Array.from(this.self.accItems).find(accItem => accItem.isOpened);
        if (openedAccItem) this.self.closeAccItem(openedAccItem);
      }

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
    if (!this.active) return false;
    this.accCont.classList.remove(this.settings.accordionClass);
    this.destroyAccItems();
    this.active = false;
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

  init() {
    if (this.active) return false;
    this.accCont.classList.add(this.settings.accordionClass);
    this.initAccItems();

    if (this.settings.isFirstToOpen) this.openAccItem(this.accItems[0]);
    this.active = true;
  };
};
