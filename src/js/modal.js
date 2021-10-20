export class ModalImage {
  constructor() {
    this.backdrop = document.querySelector('.backdrop');
    this.image = this.backdrop.querySelector('img');
    this.close = this.backdrop.querySelector('.js-close');
    this.right = this.backdrop.querySelector('.js-right');
    this.left = this.backdrop.querySelector('.js-left');
  }

  listener = e => {
    let el = e.target;
    while (!el.dataset.large) {
      el = el.parentElement;
    }
    this.element = el;
    this.show();
  };

  show = () => {
    this.image.src = this.element.dataset.large;
    this.backdrop.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
    this.isEnableArrow();
    this.setEvent();
  };

  hide = () => {
    this.image.src = '';
    this.backdrop.classList.add('is-hidden');
    document.body.style.overflow = 'auto';
    this.removeEvent();
  };

  isEnableArrow = () => {
    this.left.style.display = this.element.previousElementSibling ? 'block' : 'none';
    this.right.style.display = this.element.nextElementSibling ? 'block' : 'none';
  };
  nextElement = () => {
    const el = this.element.nextElementSibling;
    if (el) {
      this.element = el;
      this.image.src = this.element.dataset.large;
    }
    this.isEnableArrow();
  };

  prevElement = () => {
    const el = this.element.previousElementSibling;
    if (el) {
      this.element = el;
      this.image.src = this.element.dataset.large;
    }
    this.isEnableArrow();
  };

  onKeyPress = e => {
    switch (e.key) {
      case 'Escape':
        this.hide();
        break;
      case 'ArrowLeft':
        this.prevElement();
        break;
      case 'ArrowRight':
        this.nextElement();
        break;
    }
  };

  setEvent = () => {
    window.addEventListener('keydown', this.onKeyPress);
    this.close.addEventListener('click', this.hide);
    this.left.addEventListener('click', this.prevElement);
    this.right.addEventListener('click', this.nextElement);
  };

  removeEvent = () => {
    window.removeEventListener('keydown', this.onKeyPress);
    this.close.removeEventListener('click', this.hide);
    this.left.removeEventListener('click', this.prevElement);
    this.right.removeEventListener('click', this.nextElement);
  };
}
