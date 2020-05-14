import './common';
import './partials/fluid-tabs';

import AnimOnScrool from './plugs/animOnScroll';

import subscribe from './partials/subscrPopup';
import quiz from './partials/quiz-popup';
import fixHeight from './partials/main/fixHeight';

const playAnim = new AnimOnScrool('js-hidden');
playAnim.init();

subscribe();
quiz();
fixHeight();
