const header = document.querySelector('#header-section');
const slider = document.querySelector('.slider__container');
const slides = Array.from(slider.children);
const slideSize = slides[0].getBoundingClientRect().width;
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;
let auto = true;
let slideTime = 7000;
let slideInterval;

// change bg color on scroll
const showBg = () => {
  const scroll = window.scrollY;

  if (scroll > 200) {
    header.classList.add('showBg');
  } else {
    header.classList.remove('showBg');
  }
};

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

// EVENT LISTENERS
window.addEventListener('scroll', showBg);
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
