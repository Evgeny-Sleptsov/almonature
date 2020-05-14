import Steps from './controllSteps';

const step = new Steps();
step.steps = 4;

const defaultResult = () => {
  return {
    theme: '',
    kind: '',
    form: {
      name: '',
      email: '',
      story: ''
    }
  };
};

const stepsArr = [];


window.resultForm = defaultResult();

const wrapper = document.querySelector('.almo-contact-top');

const switchSteps = () => {
  if (!wrapper) return false;

  let steps = wrapper.querySelectorAll('[data-step]');
  const links = wrapper.querySelectorAll('[href*="#step-"]');
  const stepLink = wrapper.querySelectorAll('.almo-contact-top__content-list a')
  const callToActionBtns = wrapper.querySelectorAll('.js-call-to-action');
  const previousStepBtn = wrapper.querySelectorAll('.js-back-to-action');
  const breadcrumbsBlock = wrapper.querySelector('.js-breadcrumbs');
  const topTitleText = wrapper.querySelector('.almo-contact-top__title > p');
  const dropdownStepsButton = wrapper.querySelector('.js-bread-link');

  let currentVisible = null;

  const showHint = (e) => {

    if (!checkActiveClass(e)) {
      const target = e.target.href ? e.target : e.target.closest('.almo-btn');
      e.preventDefault();
      target.nextElementSibling.classList.add('show-hint');

      setTimeout(() => {
        target.nextElementSibling.classList.remove('show-hint');
      }, 2000);
    }
  };

  const updateHref = (e) => {
    let href = e.target.getAttribute("href");
    let parent = e.target.closest('[data-step]');
    let nextBtn = parent.querySelector(".js-call-to-action");
    if (nextBtn) {
      nextBtn.href = href;
    }
  };
  const backStep = (e) => {
    e.preventDefault();
   // console.log(getCurrentStep());
    if(getCurrentStep() == 3 || getCurrentStep() == 4 ){
      document.getElementsByClassName('js-accor')[0].style.display = 'inline-block';
      document.getElementsByClassName('almo-text-lead')[0].style.display = 'inline-block';
    }
    
    window.history.go(-1);
  }

  const getCurrentStep = () =>
    window.location.hash ?
      parseInt(window.location.hash.split('step-')[1].split('-')[0]) :
      1;

  const getLinkStep = () =>
    window.location.hash ?
      window.location.hash :
      '#step-1';

  const animationSelect = (svg, addAnim) => {
    const snap = Snap(svg);

    const checkedPath = 'M10 5.7l3.5-4.3-3.6 4.4M2.2 5.9l4.5 3.8 6.8-8.3';
    const arrowPath = 'M1 5h13M10 1l4 4-4 4';

    const arrow = snap.select('.svg-arrow');

    if (addAnim) {
      arrow.animate({
        d: checkedPath
      }, 200, mina.linear, () => {
      });
    }
    else {
      arrow.animate({
        d: arrowPath
      }, 200, mina.linear, () => {
        // setTimeout(() => {
        //   arrow.animate({
        //     d: arrowPath
        //   }, 0);
        // }, 300);
      });
    }
  };

  const handlerClick = (e) => {
    e.preventDefault();
    let stepBox = e.target.closest('[data-step]');
    let links = stepBox.querySelectorAll('.almo-contact-top__content-list a');
    Array.from(links).forEach(item => {
      const svg = item.querySelector(".svg-check-arrow")
      if (svg) {
        animationSelect(svg, false);
      }
      if (e.target == item && svg) {
        animationSelect(svg, true);
      }
    });

  };

  if (steps.length === 0) return false;

  steps = Array.from(steps).reduce((obj, item) => {
    obj[item.dataset.step] = item;
    return obj;
  }, {});

  Array.from(stepLink).forEach(item => {
    item.addEventListener('click', function (e) {
      if(item.getAttribute('rel') !== 'noopener'){
        console.log('link clicked');
        updateHref(e);
        removeActiveClass(e);
        item.classList.add('js-active');
        handlerClick(e);
      }

    });
  });

  Array.from(previousStepBtn).forEach(item => {
    item.addEventListener('click', backStep);
  });

  dropdownStepsButton.addEventListener( "click", function (e) {
    if (this.classList.contains('js-accor')) {
      e.preventDefault();
      let stepListBox = wrapper.querySelector('.step-list');
      stepListBox.classList.toggle('js-show');
    }
  });
  const removeActiveClass = (e) => {
    let stepBox = e.target.closest('[data-step]');
    let links = stepBox.querySelectorAll('.almo-contact-top__content-list a');
    Array.from(links).forEach(item => {
      item.classList.remove("js-active");
    });
  }
  const checkActiveClass = (e) => {
    let stepBox = e.target.closest('[data-step]');
    let links = stepBox.querySelectorAll('.almo-contact-top__content-list a');
    let result = false;
    Array.from(links).forEach(item => {
      if (item.classList.contains("js-active")) {
        result = true;
      }
    });
    return result;
  }

  Array.from(callToActionBtns).forEach(item => {
    item.addEventListener('click', showHint);
  });


  const prepareSteps = () => {
    let currentHash = window.location.hash;

    const currentVisible = currentHash ? currentHash.split('#').join('') : 'step-1';

    let result;
    if (currentVisible === 'step-1') {
      result = '4';
      window.resultForm = defaultResult();
    } else {
      const regOrigin = new RegExp(
        `step-(\\d-){1,}(${currentVisible.split(/step-\d-/).join('')})$`
      );
      const regOther = new RegExp(
        `step-(\\d-){1,}(0-0-0)$`
      );

      result =
        Object.keys(steps)
          .filter(item => regOrigin.test(item) || regOther.test(item))
          .reduce(
            (max, item) => item
              .split('step-')
              .join('')
              .split('-').length > max ?
              item
                .split('step-')
                .join('')
                .split('-').length :
              max,
            0
          );
    }

    step.steps = ![5, 6].includes(getCurrentStep()) ? result : 1;
  };

  const openState = (state) => {
    prepareSteps();

    state = parseInt(state.split('-')[0]) === 3 ? `3-0-0` : state;

    const current = document.querySelector(`[data-step=step-${state}]`);

    if (!current) return;
    if (currentVisible) currentVisible.classList.remove('active');

    if ([3, 4, 6].includes(getCurrentStep())) {
      wrapper.dataset.stepOpened = 'finish';
    } else {
      wrapper.dataset.stepOpened = '';
    }

    current.classList.add('active');

    currentVisible = current;

    const clearForm = new CustomEvent('clearForm');
    window.dispatchEvent(clearForm);
  };

  const changeBredcrumbsText = (e) => {

    let breadLink = wrapper.querySelector('.js-bread-link');
    let stepListBox = wrapper.querySelector('.step-list');

    //writing steps to an array
    let objStep = {};
    objStep.href = getLinkStep();

    let linkStep = getLinkStep();

    
    if (linkStep.toString().indexOf('4-0-2-1') > 0) {
      document.getElementsByClassName('js-accor')[0].style.display = 'none';
      document.getElementsByClassName('almo-text-lead')[0].style.display = 'none';
    }

    


   // console.log(links);
    Array.from(links).forEach(item => {
      if (item.getAttribute("href") === getLinkStep() && item.classList.contains("js-active")) {
        objStep.name = item.dataset.value ? item.dataset.value : 'Details';
      }
    });
    stepsArr.push(objStep);
    //console.log(stepsArr);

    //clear step list
    stepListBox.innerHTML = '';
    stepListBox.classList.remove('js-show');
    if (getCurrentStep() === 6) {
      stepsArr.splice(3);
    }
    else {
      stepsArr.splice(getCurrentStep());
    }


    //create DOM steps elements
    stepsArr.forEach((item, i, arr) => {
      if ( i !== 0) {
        breadLink.innerHTML = arr[i].name;
        breadLink.setAttribute("href", arr[i - 1].href);

        let listBox = document.createElement("li");

        let span = document.createElement("span");
        span.innerHTML = "Step " + i;
        span.className = "almo-head-h5";
        listBox.appendChild(span);

        let link = document.createElement("a");
        link.setAttribute("href", arr[i - 1].href);
        link.innerHTML = arr[i].name;
        link.className = "almo-link";
        listBox.appendChild(link);

        stepListBox.appendChild(listBox);
      }
    });

    if (breadLink.nextElementSibling.children.length > 1) {
      breadLink.classList.add('js-accor');
    }
    else breadLink.classList.remove('js-accor');
  }

  const parseHash = () => {
    let currentHash = window.location.hash;
    const currentVisible = currentHash ? currentHash.split('#').join('') : 'step-1';

    const steps = currentVisible.split('step-').join('').split('-').reverse();

    changeBredcrumbsText();

    let buff = '';

    if (getCurrentStep() !== 4) window.resultForm = defaultResult();

    Array.from(previousStepBtn).forEach(item => {
      if (getCurrentStep() == 1) {
        item.closest('p').style.display = 'none';
      }
      else {
        item.closest('p').style.display = '';
      }
    });

    if (getCurrentStep() == 1 || getCurrentStep() == 5) {
      breadcrumbsBlock.style.display = '';
      topTitleText.style.display = '';
    }
    else {
      breadcrumbsBlock.style.display = 'flex';
      topTitleText.style.display = 'none';
    }

    steps.forEach((item, index) => {
      let current = null;
      if (index !== steps.length - 1) {
        const str = buff ? `[data-step=step-${index + 1}-${buff}]` : `[data-step=step-${index + 1}]`;

        let val = null;
        const key = Object.keys(window.resultForm)[index];

        if (key === 'form') {
          const form = document.querySelector(`[data-step=step-3-0-0]`).querySelector('form');

          val = {
            name: form.elements.name.value,
            email: form.elements.email.value,
            subject: form.elements.subject.value,
            story: form.elements.story.value
          };
        } else {
          current = document.querySelectorAll(`${str} [data-value]`)[item - 1];

          if (current) val = current.dataset.value;
        }

        if (key && val) {
          window.resultForm[key] = val;
        }
      }

      buff = buff ? `${item}-${buff}` : `${item}`;

      if (index === steps.length - 1) {
        step.active = index + 1;

        openState(buff);
      }
    });
  };

  if ([5, 4].includes(getCurrentStep())) {
    window.location.hash = '';
  }

  parseHash();
  window.addEventListener('hashchange', parseHash);
};

export default switchSteps();
