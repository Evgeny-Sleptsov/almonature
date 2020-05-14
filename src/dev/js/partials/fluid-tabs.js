import sectionInView from '../plugs/sectionInView';
import undLine from '../partials/anchorUndLine';

export default (() => {
  const tabsWrap = document.getElementById('tabs');

  if (!tabsWrap) return false;

  const anchors = tabsWrap.querySelectorAll('.almo-tab');
  if (tabsWrap && anchors.length > 0) {
    sectionInView(tabsWrap, anchors);
    undLine(tabsWrap, anchors);
  }
})();
