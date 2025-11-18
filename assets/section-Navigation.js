document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('[data-navigation-area]');
  gsap.set(document.body, {
    '--navigation-height': `${nav.offsetHeight}px`,
  });
  const navBorder = nav.querySelector('.navigation-border');

  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom top',
    onEnter: () => {
      navBorder.classList.remove('opacity-0');
    },
    onLeaveBack: () => {
      navBorder.classList.add('opacity-0');
    },
  });
});
