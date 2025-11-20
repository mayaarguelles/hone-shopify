gsap.registerPlugin(Flip);

class HoverIndicator extends HTMLElement {
  connectedCallback() {
    const container = this;
    const indicator = this.querySelector('.hover-indicator');
    const hoverAreas = this.querySelectorAll('.hover-area');
    let activeHover = null;

    hoverAreas.forEach((el) => {
      let input = el.parentElement.querySelector('input');

      if (el.querySelector('.hover-indicator') !== null) {
        activeHover = el;
      }

      input.addEventListener('change', function () {
        if (this.matches(':checked')) {
          activeHover = el;
        }
      });

      el.addEventListener('mouseenter', function () {
        const indState = Flip.getState(indicator);

        this.appendChild(indicator);
        Flip.from(indState, {
          absolute: true,
          ease: 'power3.inOut',
          duration: 0.5,
        });
      });

      el.addEventListener('mouseleave', function () {
        if (this !== activeHover && activeHover !== null) {
          const indState = Flip.getState(indicator);

          activeHover.appendChild(indicator);
          Flip.from(indState, {
            absolute: true,
            ease: 'power3.inOut',
            duration: 0.5,
          });
        }
      });
    });
  }
}
customElements.define('hone-indicator-hover', HoverIndicator);
