const tabs = ({
  selectorControllWrap = '.tabs-controll',
  selectorTabsWrap = '.tabs-container',
  classToShowTab = 'tab-active',
  selectorTag = 'input[type="radio"]',
  selectorAttr = 'value',
  listener = 'change',
  defaultEl
} = {}, callback) => {
  const tabsGroup = document.querySelectorAll(selectorControllWrap);

  const handlerChange = (e) => {
    const target = e.target || e;
    const tab = document.querySelector(`[data-tab-target="${target[selectorAttr]}"]`);

    if (!tab) return false;

    const prevTarget = document.querySelector(`${selectorTag}.${classToShowTab}`);
    const prevTab = tab.closest(selectorTabsWrap).querySelector(`.${classToShowTab}`);

    target.classList.add(classToShowTab);
    tab.classList.add(classToShowTab);

    if (!prevTab || prevTab.isSameNode(tab)) return false;

    prevTarget.classList.remove(classToShowTab);
    prevTab.classList.remove(classToShowTab);

    callback && callback();
  };

  defaultEl && handlerChange(defaultEl);

  Array.from(tabsGroup).forEach(item => {
    const inputs = item.querySelectorAll(selectorTag);

    Array.from(inputs).forEach(input => {
      input.addEventListener(listener, handlerChange);

      if (input.checked) {
        handlerChange({
          target: input
        });
      }
    });
  });
};

export default tabs;
