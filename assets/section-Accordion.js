class Accordion extends HTMLElement {
  connectedCallback() {
    const sections = this.querySelectorAll('.accordion-section');
    sections.forEach((section) => {
      const header = section.querySelector('.accordion-title');
      const content = section.querySelector('.accordion-content');
      let isOpen = header.getAttribute('aria-expanded') === 'true';

      header.addEventListener('click', () => {
        if (isOpen) {
          isOpen = false;
          header.setAttribute('aria-expanded', 'false');
          content.style.overflow = 'hidden';
          gsap.to(content, {
            height: 0,
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: () => {
              content.style.display = 'none';
            },
          });
        } else {
          isOpen = true;
          header.setAttribute('aria-expanded', 'true');
          content.style.display = 'block';
          content.style.overflow = 'hidden';
          gsap.fromTo(
            content,
            {
              height: 0,
            },
            {
              height: 'auto',
              duration: 0.6,
              ease: 'power3.inOut',
              onComplete: () => {
                content.style.overflow = 'visible';
              },
            },
          );
        }
      });
    });
  }
}
customElements.define('hone-accordion', Accordion);
