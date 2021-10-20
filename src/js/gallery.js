import formMarkup from '../templates/form.hbs';
import { ListImage } from './listImage';
import { debounce } from 'debounce';
import { ServicePixabay } from './apiService';
import { LoadMore } from './loadMore';
import { ModalImage } from './modal';

export class Gallery {
  constructor({ root = 'main' }) {
    this.root = root;
    this.apiServices = new ServicePixabay({ root: this.root });
    this.listImage = new ListImage({ root: this.root });
  }

  createMarkup = () => {
    document.querySelector(this.root).insertAdjacentHTML('beforeend', formMarkup());
    const formEl = document.getElementById('search-form');
    this.query = formEl.elements.query;
    this.countOnPage = formEl.elements.countOnPage;
    this.pagination = formEl.elements.pagination;
    this.isBtnMore = formEl.elements.pagination.checked;
    this.createMarkupLoadMore();
    this.modal = new ModalImage();
    this.modal.hide();
  };

  createMarkupLoadMore = () => {
    this.listImage.createMarkupList();
    this.btnMore = document.querySelector('.load-more');
    this.loadBtn = new LoadMore({ btn: this.btnMore });
    this.loadBtn.hidden();
  };

  setEvent = () => {
    this.query.addEventListener('input', debounce(this.getData, 300));
    this.countOnPage.addEventListener('input', debounce(this.changeCount, 300));
    this.pagination.addEventListener('change', this.onChangePagination);
    this.listImage.listEl.addEventListener('click', this.modal.listener);
    if (this.isBtnMore) {
      this.setEventLoadmore();
    }
  };

  setEventLoadmore = () => {
    this.loadBtn.show();
    this.btnMore.addEventListener('click', this.btnMoreclick);
  };

  removeEventLoadmore = () => {
    this.loadBtn.hidden();
    this.btnMore.addEventListener('click', this.btnMoreclick);
  };

  onChangePagination = e => {
    this.isBtnMore = e.target.checked;
    if (this.isBtnMore) {
      this.setEventLoadmore();
      this.removeInfinityScroll();
    } else {
      this.removeEventLoadmore();
      this.setInfinityScroll();
    }
  };

  btnMoreclick = e => {
    this.loadBtn.setLoad();
    this.getDataService();
  };

  setInfinityScroll = () => {
    if (!this.observer) {
      const option = {
        rootMargin: '0px',
        threshold: 0.6,
      };
      this.observer = new IntersectionObserver(this.isScrolling, option);
    }
    const target = document.querySelector('li:last-child');
    if (target) {
      this.observer.observe(target);
    }
  };

  isScrolling = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        this.getDataService();
      }
    });
  };

  removeInfinityScroll = () => {
    this.observer.unobserve(document.querySelector('.gallery li:last-child'));
    this.observer = null;
  };

  getDataService = async value => {
    if (value) {
      this.apiServices.query = value;
    }
    const data = await this.apiServices.fetchData();
    if (data.hits.length === 0) {
      alert('No Information');
      return;
    }
    this.listImage.createMarkupItems(data.hits);
    this.loadBtn.removeLoad();
    if (this.apiServices.isLastPage(data.totalHits)) {
      this.loadBtn.hidden();
    }
    if (!this.isBtnMore) {
      console.log(data);
      this.setInfinityScroll();
    } else {
      this.loadBtn.scrollIntoEnd()
    }
  };

  getData = e => {
    if (e.target.value.trim()) {
      this.listImage.clearList();
      this.apiServices.page = 1;
      this.getDataService(e.target.value);
    }
  };

  changeCount = e => {
    if (Number(e.target.value)) {
      this.listImage.clearList();
      this.apiServices.countPageElement = Number(e.target.value);
      if (this.query.value) {
        this.getDataService(this.query.value);
      }
    }
  };
}