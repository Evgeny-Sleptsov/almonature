export default () => {
  const subscribe = document.querySelector('#subscr-pupop');
  const emailRegExp = /^\S+@\S+\.\S+$/;

  if (!subscribe) return;

  let data = null;
  let userEmail = null;
  let state = null;

  // 0 - subscribe(email)
  // 1 - more(chose animals)
  // 2 - more(select years)
  // 3 - more(enter zip-code)
  // 4 - done

  // emailBlock
  const email = subscribe.querySelector('.almo-subscr__email');
  const emailComp = {
    emailInput: email.querySelector('.almo-subscr__email__input'),
    emailInputBlock: email.querySelector('.almo-subscr__email__input__block'),
    checkPromo: email.querySelector('.almo-subscr__email__check-promo'),
    checkPromoBlock: email.querySelector('.almo-subscr__email__check-promo__block'),
    checkPesonal: email.querySelector('.almo-subscr__email__check-personal'),
    checkPesonalBlock: email.querySelector('.almo-subscr__email__check-personal__block')
  };

  // socBlock
  const soc = subscribe.querySelector('.almo-subscr__soc');
  const socBtns = Array.from(soc.querySelectorAll('.almo-btn--soc'));

  // moreBlock
  const more = subscribe.querySelector('.almo-subscr__more');
  const moreBlocks = {
    anim: {
      step: more.querySelector('[data-target="subscr-more-anim"]'),
      block: more.querySelector('#subscr-more-anim'),
      btn: more.querySelector('#subscr-more-anim .almo-btn'),
      carts: Array.from(
        more.querySelectorAll(
          '.almo-subscr__more__anim__cart input[type="checkbox"]'
        )
      )
    },
    year: {
      step: more.querySelector('[data-target="subscr-more-years"]'),
      block: more.querySelector('#subscr-more-years'),
      btn: more.querySelector('#subscr-more-years .almo-btn'),
      list: more.querySelector('.almo-subscr__more__years__list'),
      dog: more.querySelector('.almo-subscr__more__years__list__item--dog'),
      cat: more.querySelector('.almo-subscr__more__years__list__item--cat'),
      template: more.querySelector('.almo-subscr__more__years__list template'),
      listStartInner: more.querySelector('.almo-subscr__more__years__list')
        .innerHTML
    },
    country: {
      step: more.querySelector('[data-target="subscr-more-done"]'),
      block: more.querySelector('#subscr-more-country'),
      btn: more.querySelector('#subscr-more-country .almo-btn'),
      input: more.querySelector('#subscr-more-country .almo-input-text')
    },
    currentBlock: null
  };

  // doneBlock
  const done = subscribe.querySelector('.almo-subscr__done');

  // functions
  function emailInputFocusHandler(e) {
    email.classList.add('js-focused');
    email.removeEventListener('focus', emailInputFocusHandler);
  };

  function emailSubmitHandler(e) {
    if (isEmailFormValid()) {
      userEmail = emailComp.emailInput.value;
      showElement(more);
      hideElement(email);

      state = 1;
      // send email to backend
    } else {
      emailFormValidTips();
    }

    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  function isEmailFormValid() {
    return emailRegExp.test(emailComp.emailInput.value) && emailComp.checkPromo.checked && emailComp.checkPesonal.checked;
  };

  function emailFormValidTips() {
    toggleElemClass(emailComp.emailInputBlock, 'almo-input-block--error', getClassListAction(emailRegExp.test(emailComp.emailInput.value)));
    toggleElemClass(emailComp.checkPromoBlock, 'almo-checkbox-block--error', getClassListAction(emailComp.checkPromo.checked));
    toggleElemClass(emailComp.checkPesonalBlock, 'almo-checkbox-block--error', getClassListAction(emailComp.checkPesonal.checked));
  };

  function toggleElemClass(el, clss, action) {
    el.classList[action](clss);
  }

  function getClassListAction(bolean) {
    return bolean ? 'remove' : 'add';
  }

  function socSubmitHandler(e) {
    hideElement(soc);
    showElement(email);
    emailInputFocusHandler(e);
  }

  function moreAnimCartsClickHandler(e) {
    let target = e.target;

    if (e.target.value === 'no') {
      data = {};
      let temp = moreBlocks.anim.carts.filter(cart => cart.value !== 'no');
      temp.forEach(cart => {
        cart.checked = false;
      });
    } else {
      moreBlocks.anim.carts[moreBlocks.anim.carts.length - 1].checked = false;
      if (data[target.value] !== undefined) {
        delete data[target.value];
      } else if (target.value !== 'another') {
        data[e.target.value] = [];
      }
    }

    console.log(data);

    moreAnimBlockValid();
  };

  function moreAnimBlockValid() {
    let temp = moreBlocks.anim.carts.filter(cart => cart.checked);

    moreBlocks.anim.btn.disabled = !temp.length;
  };

  function moreYearBlockValid() {
    let valid = true;
    Object.keys(data).forEach(key => {
      data[key].forEach(anim => {
        if (!anim.years && !anim.month) {
          valid = false;
          return false;
        }
      });
    });
    moreBlocks.year.btn.disabled = !valid;
  };

  function moreCountryBlockValid(e) {
    if (e.target.valid !== '') {
      moreBlocks.country.btn.disabled = false;
    } else {
      moreBlocks.country.btn.disabled = true;
    }
  };

  function moreSwitchBlocks(nextBlock) {
    if (moreBlocks.currentBlock !== nextBlock) {
      moreBlocks.currentBlock.block.classList.remove('js-showed');
      moreBlocks.currentBlock = nextBlock;
      moreBlocks.currentBlock.block.classList.add('js-showed');
      moreBlocks.currentBlock.step.checked = true;
      return true;
    }
    return false;
  }

  function moreYearAddItemToList(anim) {
    let tempList = moreBlocks.year[anim].querySelector('ul');
    let tempTemplate = moreBlocks.year.template.innerHTML.replace(
      /@@anim/gi,
      anim
    );
    data[anim].push({
      years: null,
      month: null
    });
    tempTemplate = tempTemplate.replace(/@@index/gi, data[anim].length);
    tempList.insertAdjacentHTML('beforeEnd', tempTemplate);

    moreYearBlockValid();
  }

  function moreYearListClickHandler(e) {
    let target = e.target;

    while (
      !target.classList.contains('almo-link') &&
      !target.classList.contains('almo-subscr__more__years__list')
    ) {
      target = target.parentElement;
    }

    if (target.classList.contains('almo-link')) {
      moreYearAddItemToList(target.dataset.anim);
    }
  }

  function moreYearListInputHandler(e) {
    let input = e.target;
    let li = e.target;

    while (li.tagName !== 'LI') {
      li = li.parentElement;
    }

    data[li.dataset.anim][li.dataset.index - 1][input.dataset.type] =
      input.value;
    moreYearBlockValid();
  }

  function moreFromAnimToYear(e) {
    let keys = Object.keys(data);
    if (keys.length > 0) {
      keys.forEach(key => {
        data[key].push({
          years: null,
          month: null
        });
        moreBlocks.year[key].style.display = 'flex';
      });
      state = 2;
      moreSwitchBlocks(moreBlocks.year);
    } else {
      state = 3;
      moreSwitchBlocks(moreBlocks.country);
    }
  }

  function moreFromYearToCountry(e) {
    state = 3;
    moreSwitchBlocks(moreBlocks.country);
  }

  function moreSubmitHandler(e) {
    hideElement(more);
    doneDetectFinState();
    showElement(done);

    state = 4;

    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  function doneDetectFinState() {
    const keys = Object.keys(data); 
    if (keys.length) {
      keys.forEach(key => done.classList.add(key));
    } else {
      done.classList.add('another');
    }
  };

  function doneSubmitHandler(e) {}

  function hideElement(elem) {
    elem.style.display = 'none';
  };

  function showElement(elem) {
    elem.style.display = 'block';
  };

  function resetAllFilds() {
    emailComp.emailInput.value = '';
    moreBlocks.anim.carts.forEach(cart => {
      cart.checked = false;
    });
    moreBlocks.year.list.innerHTML = moreBlocks.year.listStartInner;
    moreBlocks.year.dog = more.querySelector(
      '.almo-subscr__more__years__list__item--dog'
    );
    moreBlocks.year.cat = more.querySelector(
      '.almo-subscr__more__years__list__item--cat'
    );
    moreBlocks.country.input.value = '';
    moreBlocks.anim.btn.disabled = true;
    moreBlocks.year.btn.disabled = true;
    moreBlocks.country.btn.disabled = true;
  };

  function initResetSubscribePopup(action) {
    const eventAction =
      action === 'init' ? 'addEventListener' : 'removeEventListener';
    data = {};

    // init email
    emailComp.emailInput[eventAction]('focus', emailInputFocusHandler, false);
    email[eventAction]('submit', emailSubmitHandler, false);
    hideElement(email);

    // init soc
    socBtns.forEach(btn => btn[eventAction]('click', socSubmitHandler));
    hideElement(soc);

    // init more
    if (action === 'init') {
      moreBlocks.currentBlock = moreBlocks.anim;
    } else {
      moreSwitchBlocks(moreBlocks.anim);
      resetAllFilds();
    }

    moreBlocks.anim.carts.forEach(cart =>
      cart[eventAction]('input', moreAnimCartsClickHandler)
    );
    moreBlocks.anim.btn[eventAction]('click', moreFromAnimToYear);
    moreBlocks.year.list[eventAction]('click', moreYearListClickHandler);
    moreBlocks.year.list[eventAction]('input', moreYearListInputHandler);
    moreBlocks.year.btn[eventAction]('click', moreFromYearToCountry);
    moreBlocks.country.input[eventAction]('input', moreCountryBlockValid);
    more[eventAction]('submit', moreSubmitHandler);
    hideElement(more);

    // init done
    hideElement(done);

    // mobile
    const backBtns = Array.from(subscribe.querySelectorAll('.almo-subscr__mob-head__close'));
    backBtns.forEach(btns => btns.addEventListener('click', (e) => {
      subscribe.querySelector('.almo-popup__cont__close-btn').click();
    }))
  };

  window.addEventListener('openPopup', e => {
    state = 0;
    switch (e.detail.dataset.subscribe) {
      case 'soc':
        initResetSubscribePopup('init');
        hideElement(email);
        showElement(soc);
        email.classList.remove('js-use-email');
        email.classList.add('js-use-soc');
        emailComp.emailInput.value = 'some@email.com';
        break;

      case 'email':
        initResetSubscribePopup('init');
        hideElement(soc);
        showElement(email);
        email.classList.remove('js-use-soc');
        email.classList.add('js-use-email');
        emailComp.emailInput.value = '';
        break;

      default:
        break;
    }
  });

  // window.addEventListener('closePopup', e => {
  //   const popup = e.detail;

  //   if (popup === subscribe) {

  //     data.email = userEmail;

  //     if (state > 0) {
  //       Array.from(
  //         document.querySelectorAll('[data-popup="subscr-pupop"]')
  //       ).forEach(btn => {
  //         btn.disabled = true;
  //       });
  //       subscribe.remove();
  //     }

  //     initResetSubscribePopup('reset');
  //   }
  // });
};