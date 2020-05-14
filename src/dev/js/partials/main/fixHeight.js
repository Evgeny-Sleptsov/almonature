export default () => {
  const buttons = Array.from(document.querySelectorAll('.almo-main-expl__list__item a.almo-btn'));
  buttons.forEach((btn) => {
    const span = btn.querySelector('span');
    const height = span.scrollHeight;
    btn.style.marginTop = `${height + 6}px`;
  });
};
