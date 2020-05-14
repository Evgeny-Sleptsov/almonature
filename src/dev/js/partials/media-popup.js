export default (() => {
  const MEDIA_POPUP = document.querySelector('#media-popup');

  if (!MEDIA_POPUP) return;

  const activityList = document.body;

  activityList.onclick = function(e) {
    let target = e.target;
    let box = target.closest('.js-togglePopup');
    if (!box) return;
    if (!activityList.contains(box)) return;
      e.preventDefault();
      openPopup(box);
  }

  function openPopup(el) {
    const href = el.href;
    const classListElem = el.classList;

    const mediaType = classListElem.contains('is-audio') ? 'is-audio'
      : classListElem.contains('is-video') ? 'is-video'
      : classListElem.contains('is-youtube') && 'is-youtube';
  
    if (!mediaType) return true;

    const mediaTag = Array.from(MEDIA_POPUP.querySelectorAll('.js-media'))
      .find(item => item.classList.contains(mediaType));

    if (mediaType == 'is-youtube') {
      let idVideo = parseMediaURL(el);
      mediaTag.setAttribute('src', generateURL(idVideo));
    }
    else {
      mediaTag.setAttribute('src', href);
    }
    mediaTag.classList.add('is-opened');
    MEDIA_POPUP.classList.add('js-opened');

    return false;
  }


  function parseMediaURL(link) {
    var regexp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let url = link.href;
    let match = url.match(regexp);
  
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      console.log('error');
    }
  }

  function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1';
  
    return 'https://www.youtube.com/embed/' + id + query;
  }

  window.addEventListener('closePopup', e => {
    const mediaTags = Array.from(MEDIA_POPUP.querySelectorAll('.js-media'));

    mediaTags.forEach(item => {
      item.classList.remove('is-opened');
      if (item.hasAttribute('controls')) {
        item.pause();
        item.currentTime = 0;
      }
      item.removeAttribute('src');
    });
  });
  //console.count();
})();
