const header = document.querySelector('#header-section');
const logo = header.querySelector('.logo a');
const nav = document.querySelector('.nav');
const menu = nav.querySelector('.menu');
const menuLinks = menu.querySelectorAll('a');
const menuBar = document.querySelector('.toggle-menu');
const upArrow = document.querySelector('.page-up a');
const cards = document.querySelectorAll('.fade-in');
const page = document.querySelector('#home');
const about = document.querySelector('#about');
const body = document.querySelector('body');

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
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

// FOR HOME AND ABOUT SECTION
const galleryFun = () => {
  // GALLERY SECTION
  const galleryImg = document.querySelectorAll('.img');
  const modal = document.querySelector('.modal-container');
  const closeIcon = document.querySelector('.close');
  const zoom = document.querySelector('.zoom');

  galleryImg.forEach((img) => {
    img.addEventListener('click', () => {
      zoom.src = img.getAttribute('src');
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  closeIcon.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  });
};

// SLIDER FUNCTION FOR THE HOME SECTION
if (body === page) {
  const slider = document.querySelector('.slider__container');
  const slides = Array.from(slider.children);
  const slideSize = slides[0].getBoundingClientRect().width;
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;
  let auto = false;
  let slideTime = 7000;
  let slideInterval;

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

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // GALLERY FUNCTION FOR THE HOME SECTION
  galleryFun();
}

// GALLERY FUNCTION FOR THE ABOUT SECTION
if (body === about) {
  galleryFun();
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
