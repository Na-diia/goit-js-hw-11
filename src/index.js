import "./css/main.css";
import { fetchImage } from "./fetch-image.js";
import { onScroll } from "./scroll.js";
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

refs.searchForm.addEventListener('submit', onSearchForm);
refs.btnLoad.addEventListener('click', onLoadBtn);
refs.btnLoad.classList.add("is-hidden");

async function onSearchForm (event) {
  event.preventDefault();

 query = event.currentTarget.searchQuery.value.trim();

 let page = 1;

 refs.gallery.innerHTML = '';
 refs.btnLoad.classList.add("is-hidden");

 if(query === '') {
    emptyString();
    return;
 };

  const response = await fetchImage(query, page, limit);

  if (response.totalHits > limit) {
    refs.btnLoad.classList.remove('is-hidden');
   } else {
    refs.btnLoad.classList.add('is-hidden');
  }

  try {
  if(response.totalHits === 0) {
        alertNoImages();
        refs.searchForm.reset();
    } else {
        refs.gallery.insertAdjacentHTML('beforeend', renderGallery(response.hits));
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        greenAnswer(response.totalHits);
        refs.searchForm.reset();
      }
    } 
   catch(error) { console.log(error.message) };
};

async function onLoadBtn(event) {
  event.preventDefault();

  page += 1;

  refs.btnLoad.classList.remove('is-hidden');

  const response = await fetchImage(query, page, limit);
   try {
    refs.gallery.insertAdjacentHTML('beforeend', renderGallery(response.hits));
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();

    const totalNumberImages = response.totalHits / limit;
    onScroll();

    if(page > totalNumberImages) { 
      toEndGallery();

      refs.btnLoad.classList.add('is-hidden');
    };
  }
  catch (error) { 
    console.log(error.message); 
  }
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
