export { onScroll };

function onScroll() {
const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 1,
  behavior: "smooth",});
};