export default () => {
  // animation header banner
  let headerBanner = document.querySelector('.js-header-banner');
  let topBanner = document.querySelector('.js-top-banner');
  let spotBanner = document.querySelector('.js-spot-banner');
  let promoBanner = document.querySelector('.js-promo-banner');

  // Stack of banners on a page
  let banners_stack = [];

  let gdpr_on_init = document.cookie.match('cookie-banner');

  let accept_gdpr = setInterval(function() {
    if (document.cookie.match('cookie-banner')) {
      clearInterval(accept_gdpr);

      if (
        headerBanner &&
        !document.cookie.match('ab_header-banner') &&
        gdpr_on_init
      ) {
        banners_stack.push(headerBanner);
      }
      if (topBanner && !document.cookie.match('ab_top-banner')) {
        banners_stack.push(topBanner);
      }
      if (
        spotBanner &&
        !document.cookie.match('ab_spot-banner') &&
        window.innerWidth > 767
      ) {
        banners_stack.push(spotBanner);
      }
      if (promoBanner && !document.cookie.match('ab_promo-banner')) {
        banners_stack.push(promoBanner);
      }

      banners_lifetime(banners_stack);

      window.addEventListener('scroll', Handler);
      window.addEventListener('touchmove', Handler);

      function Handler() {
        if (banners_stack.length) {
          let banner = banners_stack[0];

          if (banner.dataset.disappearanceType == 'scroll') {
            if (banner == topBanner && window.innerWidth < 767) {
              setTimeout(function() {
                closeBanner(banner);
              }, banner.dataset.disappearanceTimeout * 1000);
            } else {
              closeToScroll(banner);
            }
          }
        }
      }
    }
  }, 500);

  if (headerBanner) {
    let headerBannerMob = headerBanner.querySelector(
      '.almo-header-banner__mob'
    );
    let headerBannerImg = headerBanner.querySelector('.img-block');
    let goBtn = headerBanner.querySelector('a');
    let closeBtn = headerBanner.querySelector('.js-banner-close');

    goBtn.addEventListener('click', function(e) {
      setCookie(headerBanner);
    });

    closeBtn.addEventListener('click', function(e) {
      closeBanner(headerBanner);
    });

    function dropHeaderBanner() {
      let dropBtn = headerBanner.querySelector('.js-banner-drop');
      dropBtn.addEventListener('click', function(e) {
        let heightBanner = headerBannerMob.scrollHeight;
        toggleStyle(headerBannerMob, 'maxHeight', heightBanner + 'px');
        headerBannerImg.classList.toggle('js-show');
        dropBtn.classList.toggle('js-rotate');
      });
    }
    dropHeaderBanner();
  }

  // animation top banner
  if (topBanner) {
    let goBtn = topBanner.querySelector('a');
    let closeBtn = topBanner.querySelector('.js-banner-top-close');

    goBtn.addEventListener('click', function(e) {
      setCookie(topBanner);
    });

    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeBanner(topBanner);
    });
  }

  // animation spot banner

  if (spotBanner) {
    let goBtn = spotBanner.querySelector('a');
    let closeSpot = spotBanner.querySelector('.js-spot-close');

    goBtn.addEventListener('click', function(e) {
      setCookie(spotBanner);
    });

    closeSpot.addEventListener('click', function() {
      closeBanner(spotBanner);
    });
  }

  if (promoBanner) {
    let goBtn = promoBanner;

    goBtn.addEventListener('click', function(e) {
      setCookie(promoBanner);
    });
  }

  function banners_lifetime(banners_stack) {
    if (banners_stack.length == 0) return false;

    let banner = banners_stack[0];

    if (banner != headerBanner) openBanner(banner);

    if (banner.dataset.disappearanceType == 'timeout') {
      setTimeout(function() {
        closeBanner(banner);
      }, banner.dataset.disappearanceTimeout * 1000);

      return true;
    }

    return false;
  }

  function toggleStyle(el, styleName, value) {
    if (el.style[styleName] !== value) {
      el.style[styleName] = value;
    } else {
      el.style[styleName] = '';
    }
  }

  function openBanner(name) {
    setTimeout(function() {
      if (name == spotBanner) {
        let scrollPos = document.documentElement.scrollTop;
        let positionBanner =
          scrollPos + window.innerHeight - spotBanner.scrollHeight;
        spotBanner.style.top = positionBanner + 40 + 'px';
      }
      if (name == promoBanner && window.innerWidth < 768) {
        let height = promoBanner.scrollHeight;
        const reactWrap = document.getElementById('catalogue');
        if (reactWrap) {
          const checkFilterBtn = setInterval(function() {
            let reactFilterBtn = document.querySelector(
              '.Catalogue-Filter__expand'
            );
            if (reactFilterBtn) {
              reactFilterBtn.style.bottom = `${height + 16}px`;
              clearInterval(checkFilterBtn);
            }
          }, 500);
        }
      }

      name.classList.remove('js-hide');
    }, 4000);

    if (name == promoBanner && window.innerWidth < 768) {
      let footer = document.querySelector('.almo-footer');
      let height = promoBanner.scrollHeight;
      footer.style.paddingBottom += height + 'px';
    }
  }

  function closeBanner(name) {
    if (!name.classList.contains('js-hide')) {
      name.classList.add('js-hide');

      setCookie(name);

      banners_stack.shift();

      banners_lifetime(banners_stack);
    }
  }

  function closeToScroll(banner) {
    let windowPos = document.documentElement.scrollTop;
    let bannerPos =
      banner.getBoundingClientRect().top + document.documentElement.scrollTop;
    if (windowPos > bannerPos + banner.scrollHeight) {
      closeBanner(banner);
    }
  }

  function getBannerName(name) {
    switch (name) {
    case headerBanner:
      return 'header-banner';
    case topBanner:
      return 'top-banner';
    case spotBanner:
      return 'spot-banner';
    case promoBanner:
      return 'promo-banner';
    }

    return '';
  }

  function setCookie(name) {
    let lang = document.querySelector('html').lang;
    if (lang.length == 2) lang = lang.toLowerCase();
    lang = lang ? lang + '/' : '';
    let expires = getCookieExpireTime();

    document.cookie =
      'ab_' +
      getBannerName(name) +
      '=true; expires=' +
      expires +
      '; path=/' +
      lang;
  }

  function getCookieExpireTime() {
    let time = new Date();
    time.setDate(time.getDate() + 1); // + 1 day

    return time; // 1 day expiration
  }
};
