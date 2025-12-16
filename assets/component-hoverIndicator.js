gsap.registerPlugin(Flip);

class HoneHoverIndicator extends HTMLElement {
  connectedCallback() {
    const container = this;
    const indicator = this.querySelector('.hover-indicator');
    const hoverAreas = this.querySelectorAll('.hover-area');
    let activeHover = null;
    const thisRef = this;

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
        thisRef.moveIndicatorTo(this);
      });

      el.addEventListener('mouseleave', function () {
        if (this !== activeHover && activeHover !== null) {
          thisRef.moveIndicatorTo(activeHover);
        }
      });
    });
  }

  moveIndicatorTo(element) {
    const indicator = this.querySelector('.hover-indicator');
    const initialParent = indicator.parentElement;
    const yInit = indicator.getBoundingClientRect().top;
    const xInit = indicator.getBoundingClientRect().left;

    const indState = Flip.getState(indicator);

    element.appendChild(indicator);
    const yFinal = indicator.getBoundingClientRect().top;
    const xFinal = indicator.getBoundingClientRect().left;

    // if y values are within 10 pixels, only animate x
    if ( Math.abs(yFinal - yInit) < 10 ) {
      Flip.from(indState, {
        absolute: true,
        ease: 'power3.inOut',
        duration: 0.5,
      });
    }
  }
}
customElements.define('hone-indicator-hover', HoneHoverIndicator);
