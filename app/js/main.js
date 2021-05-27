const openBtn = document.querySelector('.header__btn');
const closeBtn = document.querySelector('.rightside-menu');

openBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  closeBtn.classList.remove('rightside-menu--close');
});

document.addEventListener('click', () => {
  closeBtn.classList.add('rightside-menu--close');
});

$('.slider__inner').slick({
  dots: true,
  arrows: false,
  fade: true,
  autoplay: true,
  autoplaySpeed: 3000,
});

const galleryButtons = document.querySelectorAll('.gallery__btn');
document.querySelector('.gallery__buttons').addEventListener('click', (e) => {
  e.stopPropagation();
  if (e.target.nodeName === 'DIV') {
    return;
  }
  galleryButtons.forEach((btn) => {
    btn.classList.remove('gallery__btn--active');
  });
  e.target.classList.add('gallery__btn--active');
});
