class BookingDrawer extends HTMLElement {
  constructor() {
    super();

    this.addEventListener(
      'keyup',
      (evt) => evt.code === 'Escape' && this.close(),
    );
    this.querySelector('#BookingDrawer-Overlay').addEventListener(
      'click',
      this.close.bind(this),
    );
    this.setHeaderBookingIconAccessibility();
  }

  setHeaderBookingIconAccessibility() {
    const bookingLink = document.querySelector('#booking-icon-bubble');
    console.log(bookingLink);
    if (!bookingLink) return;

    bookingLink.setAttribute('role', 'button');
    bookingLink.setAttribute('aria-haspopup', 'dialog');
    bookingLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.open(bookingLink);
    });
    bookingLink.addEventListener('keydown', (event) => {
      if (event.code.toUpperCase() === 'SPACE') {
        event.preventDefault();
        this.open(bookingLink);
      }
    });
  }

  open(triggeredBy) {
    if (triggeredBy) this.setActiveElement(triggeredBy);

    setTimeout(() => {
      this.classList.add('animate', 'active');
    });

    this.addEventListener(
      'transitionend',
      () => {
        const containerToTrapFocusOn = this.classList.contains('is-empty')
          ? this.querySelector('.drawer__inner-empty')
          : document.getElementById('BookingDrawer');
        const focusElement =
          this.querySelector('.drawer__inner') ||
          this.querySelector('.drawer__close');
        trapFocus(containerToTrapFocusOn, focusElement);
      },
      { once: true },
    );

    document.body.classList.add('overflow-hidden');
  }

  close() {
    this.classList.remove('active');
    removeTrapFocus(this.activeElement);
    document.body.classList.remove('overflow-hidden');
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('booking-drawer', BookingDrawer);
