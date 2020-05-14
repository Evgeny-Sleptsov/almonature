export default animCounterClass => {
  // const animCounterClass = 'js-anim-counter';
  let animated = 0;
  let numbers = Array.from(document.querySelectorAll(`.${animCounterClass}`));

  function detectInView(el) {
    return (el.getBoundingClientRect().top - window.innerHeight * .85) <= 0;
    // return (el.getBoundingClientRect().top - window.innerHeight * 0.5) <= 0;
  }

  function destroy() {
    window.removeEventListener('scroll', handlerScroll);
    numbers = null;
  }

  function handlerScroll(e) {
    if (animated >= numbers.length) {
      destroy();
      return;
    }

    numbers.forEach((number, index) => {
      if (number.classList.contains(animCounterClass) && detectInView(number)) {
        const startValue = parseFloat(number.innerHTML);
        const endValue = parseFloat(number.dataset.end.replace(/\s/g, ''));
        const dur = parseFloat(number.dataset.dur);
        // const startTime = e.timeStamp;
        const startTime = Date.now();

        animateValue(number, startValue, endValue, dur, startTime);
        number.classList.remove(animCounterClass);
        animated++;
      }
    });
  }

  function animateValue(el, start, end, dur, startTime) {
    const dif = end - start;
    const finishTime = startTime + dur;

    // function rafAnimation(curTime) {
    function rafAnimation() {
      const curTime = Date.now();
      if (curTime <= finishTime) {
        const percent = Math.abs(((finishTime - curTime) / dur) - 1);
        el.innerHTML = Math.floor(dif * percent + start).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        requestAnimationFrame(rafAnimation);
      } else {
        el.innerHTML = end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
    }
    rafAnimation(startTime);
  }

  window.addEventListener('scroll', handlerScroll);
  // handlerScroll(performance.now());
  handlerScroll(Date.now());
};
