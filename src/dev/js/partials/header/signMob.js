export default () => {
  const header = document.querySelector('.almo-header-mob');
  const signBtn = header.querySelector('#almo-sign-mob__btn');
  const signUp = header.querySelector('#almo-sign-mob__in');
  const singIn = header.querySelector('#almo-sign-mob__up');

  if (!signBtn || !signUp || !singIn) return;

  signBtn.addEventListener('click', (e) => {
    signBtn.classList.toggle('js-sign-up');
    signUp.classList.toggle('js-active');
    singIn.classList.toggle('js-active');
  });
}
  
