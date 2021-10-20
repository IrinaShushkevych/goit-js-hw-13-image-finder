export class LoadMore {
  constructor({ btn }) {
    this.ref = btn;
  }

  setLoad = () => {
    this.ref.textContent = 'Loading.....';
    this.ref.classList.add('is-load');
    this.ref.disabled = true;
  };

  removeLoad = () => {
    this.ref.textContent = 'Load more';
    this.ref.classList.remove('is-load');
    this.ref.disabled = false;
  };

  hidden = () => {
    this.ref.classList.add('is-hidden');
  };

  show = () => {
    this.ref.classList.remove('is-hidden');
    this.ref.textContent = 'Load more';
  };
}
