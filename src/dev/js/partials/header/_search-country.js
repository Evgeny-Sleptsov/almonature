export default () => {
  const header = document.querySelector('.almo-header-mob');
  const searchLists = document.querySelectorAll('.almo-header__country');
  const searchBlocks = [];

  const back = header.querySelector('.js-back');
  const burger = header.querySelector('.js-burger');
  const box = document.querySelector('#country-search');

  let currValue = '';

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  let timer = null;

  const handlerResponse = (res, obj) => {
    if (res.length === 0) {
      obj.wrapper.dataset.state = 'not-found';
      obj.list.innerHTML = '';
      return false;
    }

    obj.wrapper.dataset.state = 'found';
    let txt = '';

    res.forEach(item => {
      const index = item.name.toLowerCase().indexOf(currValue);
      let name = '';

      if (index !== -1) {
        let temp = [];
        temp.push(item.name.slice(0, index));
        temp.push(item.name.slice(index, index + currValue.length));
        temp.push(item.name.slice(index + currValue.length));

        name = `${temp[0]}<strong>${temp[1]}</strong>${temp[2]}`;
      } else {
        name = item.name;
      }

      txt += `<li>
                <a href="${item.link}">
                    <i class="almo-icon bg-${item.id}"></i>
                    ${name}
                </a>
              </li>`;
    });

    obj.list.innerHTML = txt;
  };

  const sendRequest = (obj) => {
    fetch(obj.path, {
      method: obj.method
      // headers,
      // body: obj.query
    })
    .then(res => res.json())
    .then(res => handlerResponse(res, obj));
  };

  const handlerInput = (index, e) => {
    const obj = searchBlocks[index];

    clearTimeout(timer);

    const input = obj.input;

    const value = input.value.toLowerCase().trim();

    if (value === '') {
      obj.wrapper.dataset.state = 'empty';
      obj.list.innerHTML = '';
      return false;
    }

    obj.query = JSON.stringify({
      query: value
    });
    timer = setTimeout(() => {
      sendRequest(obj);
    }, 300);
  };

  const startState = () => {
    setTimeout(() => {
      searchBlocks.forEach(item => {
        item.input.value = '';
        item.wrapper.dataset.state = 'empty';
        item.list.innerHTML = '';
      });
    }, 300);
  };

  Array.from(searchLists).forEach((item, index) => {
    const input = item.querySelector('.js-country-search');

    const temp = {
      input,
      parent: item,
      query: '',
      wrapper: item.querySelector('[data-state]'),
      list: item.querySelector('.js-country-list'),
      path: input.parentNode.action || '#',
      method: input.parentNode.method || 'post'
    };

    input.addEventListener('keyup', handlerInput.bind(null, index), false);
    searchBlocks.push(temp);
  });

  back.addEventListener('click', startState);
  burger.addEventListener('click', startState);
  box.addEventListener('closeBox', startState);
};