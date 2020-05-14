import header from './partials/header';
import footer from './partials/footer';
import inputUtils from './plugs/inputUtils';
import popups from './plugs/popups';
import banners from './partials/banners';

// sliders for blog page
import slider from './partials/projects/article-slider';
import sliderGraph from './partials/projects/graph-slider';
import projectSlider from './partials/projects/projectSlider';

import './partials/projectsSlider';

import lazyImages from './partials/lazy-images';

export default (() => {
  popups();

  window.inputUtils = inputUtils;

  header();
  footer();

  lazyImages('data-lazy-src');
})();

projectSlider();
slider();
sliderGraph();
banners();
