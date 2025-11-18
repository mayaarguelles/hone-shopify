document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('[data-navigation-area]');
  const announcementBar = nav.querySelector('.announcement-bar');
  const slider = announcementBar.querySelector('.announcement-bar--slider');
  const dismiss = announcementBar.querySelector('.announcement-bar--dismiss');
  let autoplayTL = null;
  let scrollT = ScrollTrigger.create({
    trigger: 'body',
    start: 'top top-=24',
    end: 'bottom top',
    onEnter: () => {
      if (announcementBar) {
        gsap.to(document.body, {
          '--navigation-height-current': `${
            nav.offsetHeight - announcementBar.offsetHeight
          }px`,
          duration: 0.3,
          ease: 'power2.inOut',
        });

        gsap.to(nav, {
          y: '-' + announcementBar.offsetHeight,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(announcementBar, {
              visibility: 'hidden',
            });

            if (autoplayTL) {
              autoplayTL.pause();
            }
          },
        });
      }
    },
    onLeaveBack: () => {
      if (announcementBar) {
        gsap.set(announcementBar, {
          visibility: 'visible',
        });
        if (autoplayTL) {
          autoplayTL.play();
        }

        gsap.to(document.body, {
          '--navigation-height-current': `${nav.offsetHeight}px`,
          duration: 0.3,
          ease: 'power2.inOut',
        });

        gsap.to(nav, {
          y: '0',
          duration: 0.3,
          ease: 'power2.inOut',
        });
      }
    },
  });

  if (slider) {
    let rotateSlides;
    autoplayTL = gsap.timeline({
      repeat: -1,
      paused: false,
      onRepeat: function () {
        if (typeof rotateSlides === 'function') {
          rotateSlides();
        }
      },
    });
    const speed = parseInt(announcementBar.dataset.speed) || 5;
    const progbar = announcementBar.querySelector(
      '.announcent-bar--slider-prog',
    );
    autoplayTL.to(progbar, {
      scaleX: 1,
      transformOrigin: 'left center',
      duration: speed,
      ease: 'linear',
    });
    const slides = slider.querySelectorAll('.announcement-bar--slide');
    let currentIndex = 0;

    slides.forEach((slide, index) => {
      if (index !== 0) {
        gsap.set(slide, { yPercent: 100 });
      }
    });

    rotateSlides = () => {
      const currentSlide = slides[currentIndex];
      const nextIndex = (currentIndex + 1) % slides.length;
      const nextSlide = slides[nextIndex];
      gsap.set(nextSlide, {
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        yPercent: 100,
      });

      gsap.to(currentSlide, {
        yPercent: -100,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: function () {
          gsap.set(currentSlide, { display: 'none' });
        },
      });
      gsap.to(nextSlide, {
        yPercent: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: function () {
          gsap.set(nextSlide, { position: 'static' });
        },
      });

      currentIndex = nextIndex;
    };

    slider.addEventListener('mouseenter', () => {
      autoplayTL.pause();
    });

    slider.addEventListener('mouseleave', () => {
      autoplayTL.play();
    });
  }

  if (dismiss) {
    dismiss.addEventListener('click', () => {
      if (autoplayTL) {
        autoplayTL.pause();
        autoplayTL.kill();
      }

      scrollT.kill();

      const hideTL = gsap.timeline();
      const announcementBarHeight = announcementBar.offsetHeight;

      hideTL.to(announcementBar, {
        y: '-' + announcementBarHeight,
        duration: 0.3,
        ease: 'power3.inOut',
      });

      hideTL.to(
        nav,
        {
          y: '-' + announcementBarHeight,
          duration: 0.3,
          ease: 'power3.inOut',
        },
        '0',
      );

      gsap.to(
        document.body,
        {
          '--navigation-height': `${
            nav.offsetHeight - announcementBarHeight
          }px`,
          '--navigation-height-current': `${
            nav.offsetHeight - announcementBarHeight
          }px`,
          duration: 0.3,
          ease: 'power3.inOut',
        },
        '0',
      );
    });
  }
});
