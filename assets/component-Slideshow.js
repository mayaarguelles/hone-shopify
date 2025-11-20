class HoneSlideshow extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const slides = this.querySelectorAll('.image-slideshow--slides');
    jQuery(slides).slick({
      dots: false,
      arrows: false,
      cssEase: 'cubic-bezier(0.64, 0.04, 0.35, 1)',
      speed: 600,
    });

    this.prevButton = this.querySelector('button.prev');
    this.nextButton = this.querySelector('button.next');

    this.prevButton.addEventListener('click', () => {
      jQuery(slides).slick('slickPrev');
    });

    this.nextButton.addEventListener('click', () => {
      jQuery(slides).slick('slickNext');
    });
  }
}
customElements.define('hone-slideshow', HoneSlideshow);
