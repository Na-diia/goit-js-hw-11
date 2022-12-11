import "./css/main.css";
import { fetchImage } from "./fetch-image.js";
import { onScroll, onToTopBtn } from "./scroll.js";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
 searchForm: document.querySelector('#search-form'),
 btnSearch: document.querySelector('.search-btn'),
 btnLoad: document.querySelector('.load-more'),
 gallery: document.querySelector('.gallery'),
};

let simpleLightBox;
let page = 1;
let query = '';
const limit = 40;

// onScroll();
// onToTopBtn();

refs.searchForm.addEventListener('submit', onSearchForm);
refs.btnLoad.addEventListener('click', onLoadBtn);
refs.btnLoad.classList.add("is-hidden");

function onSearchForm (event) {
  event.preventDefault();
 //window.scrollTo({ top: 0 });

 query = event.currentTarget.searchQuery.value.trim();

 let page = 1;

 refs.gallery.innerHTML = '';
 refs.btnLoad.classList.add("is-hidden");

 if(query === '') {
    emptyString();
    return;
 }  fetchImage(query, page, limit)
   .then(({ data }) => {
    if(data.totalHits === 0) {
        alertNoImages();
    } else if (data.hits > limit) {
        refs.btnLoad.classList.remove('is-hidden');
    } else {
        refs.gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        greenAnswer(data.totalHits);
        refs.btnLoad.classList.remove('is-hidden');
      }
      })
   .catch(error => console.log(error))
   .finally(() => {
     refs.searchForm.reset();
   });
};

function onLoadBtn(event) {
  event.preventDefault();

  page += 1;
  simpleLightBox.destroy();

  refs.btnLoad.classList.remove('is-hidden');

  fetchImage(query, page, limit)
   .then(({ data }) => {
    refs.gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();

    const totalNumberImages = Math.ceil(data.hits / limit);

    if(page > totalNumberImages) { 
      toEndGallery();

      refs.btnLoad.classList.add('is-hidden');
    };
  }).catch(error => console.log(error));
};

function renderGallery(images) {
  const markup = images.map((image) => {
      return `<a class="image-link" href="${image.largeImageURL}"><div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" width= 300px height = 150px loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${image.likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${image.views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${image.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${image.downloads}</b>
          </p>
        </div>
      </div></a>`
    }).join('');

  return markup;
};

function alertNoImages() {
 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
};

function toEndGallery() {
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
};

function greenAnswer(totalHits) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
};

function emptyString() {
    Notiflix.Notify.failure('Please, enter a request. The string cannot be empty!') 
};