import axios from 'axios';
import Notiflix from 'notiflix';
export default class NewApi {
  constructor() {
    this.query = '';
    this.page = 1;
    this.length = '';
    this.notifi = '';
    this.totalHits = 0;
    this.hits = '';
  }

  async findPicture() {
    const axiosApi = axios.create({
      baseURL: `https://pixabay.com/api/`,
    });
    const API_KEY = '30146674-87ba08c163562e3719dbdc1b2';
    const result = await axiosApi.get(
      `?key=${API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`
    );
    console.log(result);
    if (result.data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    this.length = result.data.hits.length;
    this.totalHits = result.data.totalHits;

    return result.data.hits;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  notifiSearch() {
    console.log(this.totalHits);
    return Notiflix.Notify.success(`Hooray! We found ${this.totalHits}images.`);
  }

  get searchQuery() {
    return this.query;
  }
  set searchQuery(newQuery) {
    this.query = newQuery;
  }
}
