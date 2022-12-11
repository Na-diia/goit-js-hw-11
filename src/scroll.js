export { onScroll, onToTopBtn };

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
const toTopBtn = document.querySelector('.btn-to-top');

// window.addEventListener('scroll', onScroll);
// toTopBtn.addEventListener('click', onToTopBtn);

// function onScroll() {
//   const scrolled = window.pageYOffset;
//   const coords = document.documentElement.clientHeight;

//   if (scrolled > coords) {
//     toTopBtn.classList.add('is-visible');
//   }
//   if (scrolled < coords) {
//     toTopBtn.classList.remove('is-visible');
//   }
// }

// function onToTopBtn() {
//   if (window.pageYOffset > 0) {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }
// }