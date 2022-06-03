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
const cards = document.querySelectorAll('.fade-in');

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

// CARDS
// fade in options
cardOptions = {
  threshold: 0,
  rootMargin: '0px 0px -150px 0px',
};

// fade in cards
const showCardsOnScroll = new IntersectionObserver(function (
  entries,
  showCardsOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      showCardsOnScroll.unobserve(entry.target);
    }
  });
},
cardOptions);

cards.forEach((card) => {
  showCardsOnScroll.observe(card);
});

// show goToTop arrow on scroll
const pageUp = () => {
  const scroll = window.scrollY;

  if (scroll > 1300) {
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

// MODAL
// Get the modal
const modal = document.querySelector('#myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
const img = document.querySelector('#myImg');
const modalImg = document.querySelector('#img01');

img.addEventListener('click', () => {
  modal.style.display = 'block';
  modalImg.src = './img/ximg_1.jpg.pagespeed.ic.1H3zXpM6hU.webp';
  img.classList.add('removeCursor');
});

// img.onclick = function () {
//   modal.style.display = 'block';
//   modalImg.src = this.src;
//   img.style.cursor = 'none';
//   // document.body.classList.toggle('fixed');
// };
