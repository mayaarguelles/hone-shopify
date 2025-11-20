class HorizontalCarousel extends HTMLElement {
  connectedCallback() {
    this.container = this;
    this.scrollContainer = this.querySelector('.overflow-x-auto');
    this.buttonContainer = this.querySelector('[data-carousel-buttons]');

    if (!this.scrollContainer) {
      const scrollContainer = document.createElement('div');
      scrollContainer.setAttribute(
        'class',
        'overflow-x-auto snap-x snap-mandatory no-scrollbar w-[calc(100%+var(--spacing)*4)]',
      );
      this.scrollContainer = scrollContainer;
      this.container.prepend(scrollContainer);
    }

    if (this.buttonContainer === null) {
      const buttonControls = document.createElement('div');
      buttonControls.innerHTML = `<div class="alignwide flex items-center justify-between gap-4 mt-4"><div class="flex gap-2 text-current/70 shrink-0 justify-end flex-1" data-carousel-buttons="">
    <button class="prev aspect-square flex items-center justify-center w-8 h-8 hover:bg-white transition-colors duration-300">
<svg class="inline-block icon icon-arrow-left h-4 w-auto w-[0.8em] h-[0.8em] relative -top-[0.1em]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="19" y1="12" x2="5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
      <polyline points="12,19 5,12 12,5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
    </svg>
    </button>
    <button class="next aspect-square flex items-center justify-center w-8 h-8 hover:bg-white transition-colors duration-300">
      
<svg class="inline-block icon icon-arrow-right h-4 w-auto w-[0.8em] h-[0.8em] relative -top-[0.1em]" width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.65685 12.6569L11.3137 7L5.65685 1.34315" stroke="currentcolor"></path>
      <line x1="11.1567" y1="7" x2="3.15674" y2="7" stroke="currentcolor"></line>
    </svg>
    </button>
  </div></div>`;
      const buttonContainer = buttonControls.querySelector('div');
      this.container.appendChild(buttonContainer);
      this.buttonContainer = buttonContainer;
      buttonControls.remove();
    }

    this.prevButton = this.querySelector('button.prev');
    this.nextButton = this.querySelector('button.next');

    if (!this.scrollContainer || !this.prevButton || !this.nextButton) {
      console.warn('HorizontalCarousel: Required elements not found');
      return;
    }

    this.init();
  }

  init() {
    // Bind event listeners
    this.prevButton.addEventListener('click', () => this.scrollToPrevious());
    this.nextButton.addEventListener('click', () => this.scrollToNext());

    // Listen for scroll events to update button visibility
    this.scrollContainer.addEventListener('scroll', () =>
      this.updateButtonVisibility(),
    );

    // Listen for resize events to recalculate button visibility
    window.addEventListener('resize', () => {
      // Debounce resize events
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.updateButtonVisibility(), 100);
    });

    // Initial setup
    this.updateButtonVisibility();
  }

  getScrollDistance() {
    // Get the width of one item plus gap
    const flexContainer = this.scrollContainer.querySelector('.flex');
    const items = flexContainer.children;

    if (items.length === 0) return 0;

    // Calculate the width of one item including gap
    const containerStyle = getComputedStyle(flexContainer);
    const gap = parseInt(containerStyle.gap) || 16; // Default to 16px if gap not found

    // Get the computed width of the first item
    const firstItem = items[0];
    const itemWidth = firstItem.offsetWidth;

    return itemWidth + gap;
  }

  scrollToPrevious() {
    const scrollDistance = this.getScrollDistance();
    const currentScroll = this.scrollContainer.scrollLeft;
    const newScroll = Math.max(0, currentScroll - scrollDistance);

    this.scrollContainer.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    });
  }

  scrollToNext() {
    const scrollDistance = this.getScrollDistance();
    const currentScroll = this.scrollContainer.scrollLeft;
    const maxScroll =
      this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
    const newScroll = Math.min(maxScroll, currentScroll + scrollDistance);

    this.scrollContainer.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    });
  }

  updateButtonVisibility() {
    if (!this.scrollContainer) return;

    const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer;
    const maxScroll = scrollWidth - clientWidth;

    // Check if there's any overflow (content wider than container)
    const hasOverflow = maxScroll > 0;

    if (!hasOverflow) {
      // Hide button container entirely if no overflow
      this.buttonContainer.style.display = 'none';
      return;
    } else {
      // Show button container if there's overflow
      this.buttonContainer.style.display = 'flex';
    }

    // Update individual button states
    const isAtStart = scrollLeft <= 1; // Small tolerance for rounding
    const isAtEnd = scrollLeft >= maxScroll - 1; // Small tolerance for rounding

    // Update button opacity and pointer events
    this.prevButton.style.opacity = isAtStart ? '0.3' : '1';
    this.prevButton.style.pointerEvents = isAtStart ? 'none' : 'auto';
    this.prevButton.disabled = isAtStart;

    this.nextButton.style.opacity = isAtEnd ? '0.3' : '1';
    this.nextButton.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    this.nextButton.disabled = isAtEnd;
  }

  disconnectedCallback() {
    // Clean up event listeners
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    window.removeEventListener('resize', this.updateButtonVisibility);
  }
}

customElements.define('horizontal-carousel', HorizontalCarousel);
