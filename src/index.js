import { refs } from './js/refs';
import { ApiImagesSearch, picturesPerPage } from './js/search';
import { imagesMarkup } from './js/markup';
import { smoothScrolling } from './js/smoothScrolling';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new SimpleLightbox('.photo-card a');
const options = {
  width: '500px',
  position: 'center-center',
  fontSize: '20px',
  closeButton: true,
};

refs.form.addEventListener('submit', onSearch);
refs.loadButton.addEventListener('click', loadMore);

const imagesSearch = new ApiImagesSearch();

function onSearch(e) {
  e.preventDefault();
  imagesSearch.resetPage();
  clearImagesContainer();
  imagesSearch.request = e.currentTarget.elements.searchQuery.value;
  loadMore();
}




async function loadMore() {
  refs.loadButton.classList.add('hide');
  window.removeEventListener("scroll", scroll);

  try {
const images = await imagesSearch.fetchImges();
if (images.hits.length === 0) {
  Notify.failure('Nothing found!', options);
  refs.form.reset();
  return;
}

appendImagesMarkup(images.hits);
gallery.refresh();
if (imagesSearch.pageNumber > 1) smoothScrolling();


console.log(Math.ceil(Number(images.totalHits) / picturesPerPage));
console.log(imagesSearch.pageNumber);
console.log(Math.ceil(Number(images.totalHits) / picturesPerPage) ===
imagesSearch.pageNumber);



if (
  Math.ceil(Number(images.totalHits) / picturesPerPage) ===
  imagesSearch.pageNumber
) {
  window.addEventListener("scroll", scroll); 
    
    return;
}

imagesSearch.incrementPage();
refs.loadButton.classList.remove('hide');
} catch (error) {
  console.log(error.message);
}

//Then 
  // imagesSearch.fetchImges().then(images => {
  //   if (images.hits.length === 0) {
  //     Notify.failure('Nothing found!', options);
  //     refs.form.reset();
  //     return;
  //   }

  //   appendImagesMarkup(images.hits);

  //   if (
  //     Math.ceil(Number(images.totalHits) / picturesPerPage) ===
  //     imagesSearch.pageNumber
  //   ) {
  //     Notify.info(
  //       "We're sorry, but you've reached the end of search results.",
  //       options
  //     );
  //     return;
  //   }
  //   gallery.refresh();

  //   if (imagesSearch.pageNumber > 1) smoothScrolling();
  //   imagesSearch.incrementPage();
  //   refs.loadButton.classList.remove('hide');
  // }).catch(error => console.log(error));
}

function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup(images));
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}


function scroll(ev) {
  if ((window. innerHeight + window. scrollY) >= document. body. scrollHeight) {
    Notify.info(
      "We're sorry, but you've reached the end of search results.",
      options
    );
    console.log("Bottom");
  }
  };
  