const header = document.querySelector('#header-section');
const logo = header.querySelector('.logo a');
const nav = document.querySelector('.nav');
const menu = nav.querySelector('.menu');
const menuLinks = menu.querySelectorAll('a');
const menuBar = document.querySelector('.toggle-menu');
const slider = document.querySelector('.slider__container');
const slides = Array.from(slider.children);
const slideSize = slides[0].getBoundingClientRect().width;
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;
let auto = false;
let slideTime = 7000;
let slideInterval;
const upArrow = document.querySelector('.page-up a');

// change header background color on scroll
const showBg = () => {
  const scroll = window.scrollY;

  if (scroll > 200) {
    header.classList.add('showBg');
    logo.classList.add('color');
    menuBar.classList.add('color');
  } else {
    header.classList.remove('showBg');
    logo.classList.remove('color');
    menuBar.classList.remove('color');
  }
};

// NAV BAR
menuBar.addEventListener('click', () => {
  nav.classList.toggle('showMenu');
  let closeBar = menuBar.querySelector('i');
  closeBar.classList.toggle('showMenu');
  document.body.classList.toggle('fixed');
});

// NAV LINKS
menuLinks.forEach((link) => {
  const activePage = window.location.pathname;
  if (link.href.includes(`${activePage}`)) {
    const removeActiveClass = menu.querySelector('.active');
    removeActiveClass.classList.remove('active');
    link.classList.add('active');
  }
});

// SLIDERS
// reset slide
const reset = () => {
  slides.forEach((slide, index) => {
    slide.style.left = `${slideSize * index}px`;
  });

  slides[0];
};

reset();

// move slide
const moveSlide = () => {
  slider.style.transform = `translateX(-${currentSlide * slideSize}px)`;
};

// next slide
const nextSlide = () => {
  currentSlide++;

  if (currentSlide > slides.length - 1) {
    currentSlide = 0;
  }

  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideTime);
  }

  moveSlide();
};

// next slide
const prevSlide = () => {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideTime);
  }

  moveSlide();
};

// auto slide
if (auto) {
  slideInterval = setInterval(nextSlide, slideTime);
}

// show goToTop arrow on scroll
const pageUp = () => {
  const scroll = window.scrollY;

  if (scroll > 4000) {
    upArrow.classList.add('showArrow');
  } else {
    upArrow.classList.remove('showArrow');
  }
};

// EVENT LISTENERS
window.addEventListener('scroll', showBg);
window.addEventListener('scroll', pageUp);
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
