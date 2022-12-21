// import { fetchImg } from './fetch_img';
import Notiflix from 'notiflix';
import axiosGet from './fetch_img';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', loadMoreImages);

let searchQuery = '';
let page = 1;

async function onSubmit(e) {
  try {
    e.preventDefault();

    refs.gallery.innerHTML = '';
    searchQuery = e.currentTarget.elements.searchQuery.value;
    page = 1;

    if (searchQuery !== '') {
      // fetchImg(searchQuery, page).then(renderGallery).catch(onError);
      const response = await axiosGet(searchQuery, page);
      renderGallery(response);
    } else {
      onError();
    }
  } catch {
    onError();
  }
}

async function loadMoreImages() {
  try {
    page += 1;
    const per_page = 40;
    const response = await axiosGet(searchQuery, page);
    const totalHits = response.totalHits;

    if (page * per_page >= totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
      return overImages();
    }
    // fetchImg(searchQuery, page).then(renderMoreImages).catch(onError);

    renderMoreImages(response);
  } catch {
    onError();
  }
}

function renderGallery(images) {
  if (images.total === 0) {
    onError();
  } else {
    // refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', renderMarkUpCard(images));
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
}

function renderMoreImages(images) {
  if (images.total === 0) {
    onError();
  } else {
    refs.gallery.insertAdjacentHTML('beforeend', renderMarkUpCard(images));
  }
}

function renderMarkUpCard(images) {
  const MarkUpCard = images.hits
    .map(item => {
      return `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${item.downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
  return MarkUpCard;
}

function onError() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function overImages() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}
