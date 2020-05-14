export default () => {
  const openModalBtns = Array.from(document.querySelectorAll('.js-togglePopup'));
  const modalOverlay = Array.from(document.querySelectorAll('.almo-popup'));
  const modalCloseBtn = Array.from(document.querySelectorAll('.js-close-popup-btn'));
  const scrollBarWidth = getScrollbarWidth();
  // const header = document.querySelector('.js-header');
  const mapHashToPopup = {
    '#registered': {
      subscribe: 'registered',
      popup: 'subscr-pupop'
    },
    '#register': {
      subscribe: 'register',
      popup: 'sign-up-pupop'
    }
  };

  const isiOS = !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
  let scrollVal;

  function getScrollbarWidth() {
    let outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    document.body.appendChild(outer);

    let widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';

    let inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    let widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  };

  window.addEventListener('load', function() {
    const dataset = mapHashToPopup[window.location.hash];

    if (!dataset) return;

    window.location.hash = '';

    const detail = { dataset };
    const event = new CustomEvent('openPopup', { detail });

    const popup = detail.dataset.popup ? document.getElementById(detail.dataset.popup) : detail.parentElement.querySelector('.chf-modal');
    if (popup) {
      if (!popup.dataset.withScroll) {
        document.documentElement.classList.add('js-no-scroll');
        document.body.classList.add('js-no-scroll');
        document.body.style.paddingRight = scrollBarWidth + 'px';
      }

      window.dispatchEvent(event);
      toggleModal(popup);
    }
  });

  function openModal(e) {
    let target = e.target.closest('.js-togglePopup');
    if (!target) return;

    const event = new CustomEvent('openPopup', {
      detail: target
    });

    let popup = target.dataset.popup ? document.getElementById(target.dataset.popup) : target.parentElement.querySelector('.chf-modal');

    if (popup) {
      if (!popup.dataset.withScroll) {
        if (isiOS && !findInputEmail(target) ||
            isiOS && findInputEmail(target) && chechValidInput(target)) {
          scrollVal = window.pageYOffset;
          document.body.style.position = 'fixed';
          document.body.style.marginTop = `-${scrollVal}px`;
        }
        else if (isiOS && findInputEmail(target) && !chechValidInput(target)) {
          scrollVal = window.pageYOffset;
          document.body.style.position = '';
          document.body.style.marginTop = '';
          document.documentElement.style.scrollBehavior = 'auto';
          window.scrollTo({
            top: scrollVal,
            behavior: 'auto'
          });
        }
          else {
          setTimeout(() => {
            document.documentElement.classList.add('js-no-scroll');
            document.body.classList.add('js-no-scroll');
            document.body.style.paddingRight = `${scrollBarWidth}px`;
          }, 100);
        }
      }

      window.dispatchEvent(event);
      toggleModal(popup);
    }
  };

  function closeModal(modal) {
    if (isiOS) {
      document.body.style.position = '';
      document.body.style.marginTop = '';
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo({
        top: scrollVal,
        behavior: 'auto'
      });
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = ' ';
      }, 10);
    } else {
      document.documentElement.classList.remove('js-no-scroll');
      document.body.classList.remove('js-no-scroll');
      document.body.style.paddingRight = '';
    }

    const event = new CustomEvent('closePopup', {
      detail: modal
    });

    window.dispatchEvent(event);

    toggleModal(modal);
  };

  function toggleModal(modal) {
    modal.classList.toggle('js-opened');
    // header.style.paddingRight = header.style.paddingRight === '' ? `${scrollBarWidth}px` : '';

    setTimeout(() => {
      if (modal.children[0].scrollHeight > modal.offsetHeight) {
        modal.classList.add('js-fullscreen');
      } else {
        modal.classList.remove('js-fullscreen');
      }
    }, 100);
  };

  function closeByOverlay(e) {
    if (e.target === this) {
      closeModal(this);
    }
  };

  function closeByCloseBtn(e) {
    let target = e.target;

    let error = target.parentElement.querySelector('.js-signin-error-message');

    if (error) error.style.display = 'none';

    while (!target.classList.contains('almo-popup')) {
      target = target.parentElement;
    }

    closeModal(target);
  };

  function init() {
    openModalBtns.forEach(btn => btn.addEventListener('click', openModal, false));
    modalOverlay.forEach(overlay => overlay.addEventListener('click', closeByOverlay.bind(overlay), false));
    modalCloseBtn.forEach(btn => btn.addEventListener('click', closeByCloseBtn, false));
    window.addEventListener('needOpenPopup', (e) => {
      let btn = document.createElement('button');
      btn.classList.add('js-togglePopup');
      btn.dataset.popup = e.detail;
      openModal({target: btn});
      btn.remove();
    });

    window.addEventListener('needClosePopup', (e) => {
      const popup = document.querySelector(`#${e.detail}`);
      if (popup) closeModal(popup);
    });
  };

  init();

  function findInputEmail(elem) {
    const inputSubscr = elem.previousElementSibling
    if (inputSubscr) {
      return true;
    }
    return false;
  }
  function chechValidInput(elem) {
    let inputSubscrValue = elem.previousElementSibling.value;
      if (inputSubscrValue && /(^\w.*@\w+\.\w)/.test(inputSubscrValue)) {
        return true;
      } else {
        return false;
      }
  }
};
