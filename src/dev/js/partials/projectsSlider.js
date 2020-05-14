import Swiper from 'swiper';

export default (() => {
  const projSliderWrap = document.querySelectorAll('.almo-slider');

  if (!projSliderWrap.length === 0) return;

  let projSlider = [];

  const initSlider = () => {
    if (window.innerWidth <= 576) {
      if (projSlider.length > 0) return;
      Array.from(projSliderWrap).forEach(item => {
        const pagin = item.querySelector('.slider-pagination');
        const temp = new Swiper(item, {
          pagination: {
            el: pagin
          },
          on: {
            beforeDestroy() {
              this.pagination.$el[0].innerHTML = '';
            }
          }
        });
        projSlider.push(temp);
      });
    } else {
      if (projSlider.length === 0) return;
      projSlider.forEach(item => {
        item.destroy(true, true);
      });
      projSlider = [];
    }
  };

  initSlider();

  window.addEventListener('resize', initSlider);
})();
