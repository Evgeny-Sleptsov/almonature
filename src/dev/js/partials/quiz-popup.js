export default () => {
  const QUIZ_POPUP = document.querySelector('#quiz-pupop');
  const ZIP_CODE_REG_EXP = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  if (!QUIZ_POPUP) return;

  const DATA = {
    anim: {}
  };

  const QUIZ_MORE = QUIZ_POPUP.querySelector('.almo-quiz__more');
  // quiz more block elements
  const QUIZ_MORE_COMP = {
    anim: {
      step: QUIZ_MORE.querySelector('[data-target="quiz-more-anim"]'),
      block: QUIZ_MORE.querySelector('#quiz-more-anim'),
      btn: QUIZ_MORE.querySelector('#quiz-more-anim .almo-btn'),
      carts: Array.from(
        QUIZ_MORE.querySelectorAll(
          '.almo-quiz__more__anim__cart input[type="checkbox"]'
        )
      )
    },
    year: {
      step: QUIZ_MORE.querySelector('[data-target="quiz-more-years"]'),
      block: QUIZ_MORE.querySelector('#quiz-more-years'),
      btn: QUIZ_MORE.querySelector('#quiz-more-years .almo-btn'),
      list: QUIZ_MORE.querySelector('.almo-quiz__more__years__list'),
      dog: QUIZ_MORE.querySelector('.almo-quiz__more__years__list__item--dog'),
      cat: QUIZ_MORE.querySelector('.almo-quiz__more__years__list__item--cat'),
      template: QUIZ_MORE.querySelector('.almo-quiz__more__years__list template'),
      listStartInner: QUIZ_MORE.querySelector('.almo-quiz__more__years__list')
        .innerHTML
    },
    country: {
      step: QUIZ_MORE.querySelector('[data-target="quiz-more-done"]'),
      block: QUIZ_MORE.querySelector('#quiz-more-country'),
      btn: QUIZ_MORE.querySelector('#quiz-more-country .almo-btn'),
      input: QUIZ_MORE.querySelector('#quiz-more-country .almo-input-text')
    },
    currentBlock: null
  };

  // quiz done block
  const QUIZ_DONE = QUIZ_POPUP.querySelector('.almo-quiz__done');

  // quiz block functions
  function quizAnimCartsClickHandler(e) {
    let target = e.target;

    if (e.target.value === 'no') {
      DATA.anim = {};
      let temp = QUIZ_MORE_COMP.anim.carts.filter(cart => cart.value !== 'no');
      temp.forEach(cart => {
        cart.checked = false;
      });
    } else {
      QUIZ_MORE_COMP.anim.carts[QUIZ_MORE_COMP.anim.carts.length - 1].checked = false;
      if (DATA.anim[target.value] !== undefined) {
        delete DATA.anim[target.value];
      } else if (target.value !== 'another') {
        DATA.anim[e.target.value] = [];
      }
    }
    quizAnimBlockValid();
  };

  function quizAnimBlockValid() {
    console.log("valid: ", QUIZ_MORE_COMP.anim.carts.some(cart => cart.checked));
    QUIZ_MORE_COMP.anim.btn.disabled = !QUIZ_MORE_COMP.anim.carts.some(cart => cart.checked);
  };

  function quizYearBlockValid() {
    let valid = true;
    Object.keys(DATA.anim).forEach(key => {
      DATA.anim[key].forEach(anim => {
        if (!anim.years && !anim.month) {
          valid = false;
          return false;
        }
      });
    });
    QUIZ_MORE_COMP.year.btn.disabled = !valid;
  };

  function quizCountryBlockValid(e) {
    if (e.target.valid !== '') {
      QUIZ_MORE_COMP.country.btn.disabled = false;
    } else {
      QUIZ_MORE_COMP.country.btn.disabled = true;
    }
  };

  function quizSwitchBlocks(nextBlock) {
    if (QUIZ_MORE_COMP.currentBlock !== nextBlock) {
      QUIZ_MORE_COMP.currentBlock.block.classList.remove('js-showed');
      QUIZ_MORE_COMP.currentBlock = nextBlock;
      QUIZ_MORE_COMP.currentBlock.block.classList.add('js-showed');
      QUIZ_MORE_COMP.currentBlock.step.checked = true;
      return true;
    }
    return false;
  };

  function quizYearAddItemToList(anim) {
    let tempList = QUIZ_MORE_COMP.year[anim].querySelector('ul');
    let tempTemplate = QUIZ_MORE_COMP.year.template.innerHTML.replace(
      /@@anim/gi,
      anim
    );
    DATA.anim[anim].push({
      years: null,
      month: null
    });
    tempTemplate = tempTemplate.replace(/@@index/gi, DATA.anim[anim].length);
    tempList.insertAdjacentHTML('beforeEnd', tempTemplate);

    quizYearBlockValid();
  };

  function quizYearListClickHandler(e) {
    let link = e.target.closest('.almo-link');
    if (link) quizYearAddItemToList(e.target.dataset.anim);
  };

  function YearListInputHandler(e) {
    let input = e.target;
    let li = input.closest('li');

    DATA.anim[li.dataset.anim][li.dataset.index - 1][input.dataset.type] =
      parseFloat(input.value);
    quizYearBlockValid();
  };

  function quizFromAnimToYear(e) {
    let keys = Object.keys(DATA.anim);
    if (keys.length > 0) {
      keys.forEach(key => {
        DATA.anim[key].push({
          years: null,
          month: null
        });
        QUIZ_MORE_COMP.year[key].style.display = 'flex';
      });
      quizSwitchBlocks(QUIZ_MORE_COMP.year);
    } else {
      quizSwitchBlocks(QUIZ_MORE_COMP.country);
    }
  };

  function quizFromYearToCountry(e) {
    quizSwitchBlocks(QUIZ_MORE_COMP.country);
  };

  function quizSubmitHandler(e) {
    hideElement(QUIZ_MORE);
    doneDetectFinState();
    showElement(QUIZ_DONE);

    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  function doneDetectFinState() {
    QUIZ_DONE.dataset.anim = '';
    const keys = Object.keys(DATA.anim);
    if (keys.length) {
      keys.forEach(key => { QUIZ_DONE.dataset.anim += key.toString(); });
    } else {
      QUIZ_DONE.dataset.anim = 'another';
    }
  };

  function initResetQuizPopup(action) {
    const eventAction =
      action === 'init' ? 'addEventListener' : 'removeEventListener';
    DATA.anim = {};

    // init more
    showElement(QUIZ_MORE);
    if (action === 'init') {
      QUIZ_MORE_COMP.currentBlock = QUIZ_MORE_COMP.anim;
    } else {
      quizSwitchBlocks(QUIZ_MORE_COMP.anim);
      resetAllFilds();
    }

    QUIZ_MORE_COMP.anim.carts.forEach(cart =>
      cart[eventAction]('change', quizAnimCartsClickHandler)
    );
    QUIZ_MORE_COMP.anim.btn[eventAction]('click', quizFromAnimToYear);
    QUIZ_MORE_COMP.year.list[eventAction]('click', quizYearListClickHandler);
    QUIZ_MORE_COMP.year.list[eventAction]('input', YearListInputHandler);
    QUIZ_MORE_COMP.year.btn[eventAction]('click', quizFromYearToCountry);
    QUIZ_MORE_COMP.country.input[eventAction]('input', quizCountryBlockValid);
    QUIZ_MORE[eventAction]('submit', quizSubmitHandler);

    // init done
    QUIZ_DONE.dataset.anim = '';
    hideElement(QUIZ_DONE);

    // mobile
    const backBtns = Array.from(QUIZ_POPUP.querySelectorAll('.almo-quiz__mob-head__close'));
    backBtns.forEach(btns => btns.addEventListener('click', (e) => {
      QUIZ_POPUP.querySelector('.js-close-popup-btn').click();
    }));
  };

  function resetAllFilds() {
    QUIZ_MORE_COMP.anim.carts.forEach(cart => {
      cart.checked = false;
    });
    QUIZ_MORE_COMP.year.list.innerHTML = QUIZ_MORE_COMP.year.listStartInner;
    QUIZ_MORE_COMP.year.dog = QUIZ_MORE.querySelector(
      '.almo-quiz__more__years__list__item--dog'
    );
    QUIZ_MORE_COMP.year.cat = QUIZ_MORE.querySelector(
      '.almo-quiz__more__years__list__item--cat'
    );
    QUIZ_MORE_COMP.country.input.value = '';
    QUIZ_MORE_COMP.anim.btn.disabled = true;
    QUIZ_MORE_COMP.year.btn.disabled = true;
    QUIZ_MORE_COMP.country.btn.disabled = true;
  };

  window.addEventListener('openPopup', e => {
    if (e.detail.dataset.popup !== 'quiz-pupop') return;
    initResetQuizPopup('init');
  });

  window.addEventListener('closePopup', e => {
    if (e.detail !== QUIZ_POPUP) return;
    initResetQuizPopup('reset');
  });

  // suport function
  function hideElement(elem) {
    elem.style.display = 'none';
  };

  function showElement(elem) {
    elem.style.display = 'block';
  };
};
