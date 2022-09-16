import { refs } from './js/refs';
import { imagesMarkup } from './js/markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs.form.addEventListener("submit",onSearch);
refs.loadButton.addEventListener("click",loadMore);

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "29964442-a5edbec7c684d468053165f7c";
const picturesPerPage = 40;

class ApiImagesSearch{

    constructor(){
        this.searchRequest = "";
        this.page = 1;
    }



fetchImges(){
  const params = new URLSearchParams({
    key: API_KEY,
    q: this.searchRequest,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: this.page,
    per_page: picturesPerPage,
  })


    const url = `${BASE_URL}?${params}`;
    return fetch(url).then(response => response.json())
}

set request(newRequest){
    this.searchRequest = newRequest;
}

get request(){
    return this.searchRequest;
}

incrementPage(){
  this.page+=1;
}

resetPage(){
  this.page = 1;
}

get pageNumber(){
  return this.page;
}

}

const imagesSearch = new ApiImagesSearch();

function onSearch(e){
    e.preventDefault();
    imagesSearch.resetPage();
    clearImagesContainer();
    // refs.loadButton.classList.add("hide");
    imagesSearch.request = e.currentTarget.elements.searchQuery.value;
    loadMore();   
    // refs.loadButton.classList.remove("hide");
};




function loadMore(){
  refs.loadButton.classList.add("hide");
  

  imagesSearch.fetchImges().then(images => {
      
    if(images.hits.length === 0) {
      Notify.failure("Nothing found!");
      refs.form.reset();
      return;
    }

    appendImagesMarkup(images.hits); 

    if(Math.ceil(Number(images.totalHits) / picturesPerPage) === imagesSearch.pageNumber){
      Notify.info("We're sorry, but you've reached the end of search results.");
      return;
    }

    imagesSearch.incrementPage();
    refs.loadButton.classList.remove("hide");
    
  });
 
};


function appendImagesMarkup(images){
    refs.gallery.insertAdjacentHTML('beforeend',imagesMarkup(images));
}

function clearImagesContainer(){
  refs.gallery.innerHTML = "";
}
