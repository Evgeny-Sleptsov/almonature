import loadHero from './load-hero';
// import Section from './animation-section';
// import Scroll from '../plugs/scrollHandler';

const animation = () => {
  // const paths = Array.from(document.querySelectorAll('.animation-roll-item'));
  // const sections = [];

  // paths.forEach(wrap => {
  //   if (!wrap.querySelector('.roller')) return;
  //   sections.push(new Section(wrap));
  // });

  // const scroll = new Scroll(
  //   (e) => {
  //     sections.forEach(section => {
  //       if (section.path.node.getBoundingClientRect().top > window.innerHeight * 0.25) return false;

  //       if (window.innerWidth > 992) {
  //         section.changePosition(e.scrollPage);
  //       }
  //     });
  //   }
  // );

  window.addEventListener('load', () => {

    if (window.innerWidth > 1024) {
      loadHero();
    }

    // scroll.init();
  });
};

export default animation();
