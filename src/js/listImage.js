import listMarkup from '../templates/list.hbs';
import itemMarkup from '../templates/item.hbs';

export class ListImage {
  constructor({ root = 'body' }) {
    this.root = root;
  }

  createMarkupList = () => {
    document.querySelector(this.root).insertAdjacentHTML('beforeend', listMarkup());
    this.listEl = document.querySelector('.gallery');
  };

  createMarkupItems = data => {
    this.listEl.insertAdjacentHTML('beforeend', itemMarkup(data));
  };

  clearList = () => {
    this.listEl.innerHTML = '';
  };
}
