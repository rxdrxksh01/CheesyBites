const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav__toggle"),
  navClose = document.getElementById("nav__close"),
  navLinks = document.querySelectorAll(".nav__link"); // Select all nav links

// Check if navMenu exists before adding event listeners
if (navMenu) {
  // Show Menu
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }

  // Hide Menu
  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }

  // Hide menu when a link is clicked
  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    })
  );
}
1
2
3
4
5
6
7
8
const shadowHeader = () =>{
const header = document.getElementById('header')
    window.scrollY>=50 
    ? header.classList.add('shadow-header')
    : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)



const swiperPopular = new Swiper(".popular__swiper", {
  loop: true,
  grabCursor: true,
  slidesPerView:  'auto',
  centeredSlides: 'auto',
});

// const scrollup = () =>{
// const scrollUp = document.getElementById('scroll-up')
// // When the scroll is higher than 350 viewport height,
// this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
//                     : scrollUp. classList.remove('show-scroll')
// window.addEventListener('scroll', scrollUp)}
const scrollup = () => {
  const scrollUp = document.getElementById("scroll-up");
  if (scrollUp) {
    window.addEventListener("scroll", () => {
      window.scrollY >= 350
        ? scrollUp.classList.add("show-scroll")
        : scrollUp.classList.remove("show-scroll"); // Fixed typo
    });
  }
};

// Call the function to add event listener
scrollup();

 