const openBtn = document.querySelector('.header__btn');
const closeBtn = document.querySelector('.rightside-menu');

openBtn.addEventListener('click', (e) => {
  closeBtn.classList.remove('rightside-menu--close');
  e.stopPropagation();
});

document.addEventListener('click', () => {
  closeBtn.classList.add('rightside-menu--close');
});

$('.slider__inner').slick({
  dots: true,
  arrows: false,
  fade: true,
});