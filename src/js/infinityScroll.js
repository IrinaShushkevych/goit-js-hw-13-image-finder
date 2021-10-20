export class Infinityscroll {
  constructor({ targetEl = 'li' }) {
    this.target = targetEl;
  }

  setScroll = () => {
    const option = {
      rootMargin: '-50px',
      threshold: 0.5,
    };
    this.observer = new IntersectionObserver(this.isScrolling, option);
    this.observer.observe(document.querySelector(this.target));
  };

  isScrolling = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        this.getDataService();
      }
    });
  };
}
