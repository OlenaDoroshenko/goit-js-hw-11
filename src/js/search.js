import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29964442-a5edbec7c684d468053165f7c';

export const picturesPerPage = 40;

export class ApiImagesSearch {
  constructor() {
    this.searchRequest = '';
    this.page = 1;
  }

  async fetchImges() {
    const config = {
      params: {
        key: API_KEY,
        q: this.searchRequest,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: picturesPerPage,
      },
    };
    const response = await axios.get(`${BASE_URL}?`, config);
    return response.data;
  }

  // async fetchImges() {
  //   const params = new URLSearchParams({
  //     key: API_KEY,
  //     q: this.searchRequest,
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: true,
  //     page: this.page,
  //     per_page: picturesPerPage,
  //   });

  //   const url = `${BASE_URL}?${params}`;
  //   const response = await fetch(url);
  //   console.log(typeof response);
  //   const photos = await response.json();
  //   return photos;
  //   // return fetch(url).then(response => response.json());
  // }

  set request(newRequest) {
    this.searchRequest = newRequest;
  }

  get request() {
    return this.searchRequest;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get pageNumber() {
    return this.page;
  }
}
