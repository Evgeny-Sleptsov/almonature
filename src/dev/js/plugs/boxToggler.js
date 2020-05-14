export default (togglers) => {
  const classAct = 'js-opened';
  let activeToggler = null;
  let curBodyClickHand = null;

  function toggleBox(e) {
    e.preventDefault();
    e.stopPropagation();
    let target = e.target;
    let box = null;

    while (!target.classList.contains('js-toggler')) {
      target = target.parentElement;
    }

    box = document.getElementById(target.dataset.box);

    if (target.classList.contains(classAct)) {
      closeBox(target, box);
    } else {
      openBox(target, box);
    }
  }

  function openBox(target, box) {
    if (activeToggler && activeToggler !== target) {
      closeBox(activeToggler, document.getElementById(activeToggler.dataset.box));
    }
    activeToggler = target;
    box.classList.add(classAct);
    target.classList.add(classAct);
    curBodyClickHand = closeBoxByBody.bind({
      target,
      box
    });
    document.body.addEventListener('click', curBodyClickHand, false);

    const event = new CustomEvent('openBox');
    box.dispatchEvent(event);
  }

  function closeBoxByBody(e) {
    let box = this.box;
    let target = e.target;

    while (target !== box && target !== document.body) {
      target = target.parentElement;
    }

    if (target !== box) {
      closeBox(this.target, this.box);
    }
  }

  function closeBox(target, box) {
    activeToggler = null;
    box.classList.remove(classAct);
    target.classList.remove(classAct);
    document.body.removeEventListener('click', curBodyClickHand);

    const event = new CustomEvent('closeBox');
    box.dispatchEvent(event);
  }

  for (let i = 0; i < togglers.length; i++) {
    togglers[i].addEventListener('click', toggleBox, false);
  }
};
