import listMarkup from '../templates/list.hbs';

export class ServicePixabay {
  constructor({ root = 'main' }) {
    this.root = root;
    this.currentPage = 1;
    this.DASE_URL = 'https://pixabay.com/api/';
    this.searchQuery = 'cat';
    this.perPage = 4;
    this.API_KEY = '23908386-2e3165467d660ea2c64c020be';
    this.lastPage = false;
  }

  get query() {
    return this.searchQuery;
  }

  set query(value) {
    if (!value.trim()) return false;
    this.searchQuery = value;
  }

  get page() {
    return this.currentPage;
  }

  set page(value) {
    if (!Number(value)) return false;
    this.currentPage = value;
  }

  get countPageElement() {
    return this.perPage;
  }

  set countPageElement(value) {
    if (!Number(value)) return false;
    this.perPage = value;
  }

  isLastPage = value => {
    this.lastPage = this.countPageElement * (this.page - 1) >= value ? true : false;
    return this.lastPage;
  };

  fetchData = async () => {
    try {
      const response = await fetch(
        `${this.DASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.currentPage}&per_page=${this.perPage}&key=${this.API_KEY}`,
      );
      const result = await response.json();
      this.nextPage();
      return result;
    } catch (error) {
      alert(error);
    }
  };

  nextPage = () => {
    this.currentPage += 1;
  };
}
