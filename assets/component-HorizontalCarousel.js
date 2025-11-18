class HorizontalCarousel extends HTMLElement {
  connectedCallback() {
    this.container = this;
    this.scrollContainer = this.querySelector('.overflow-x-auto');
    this.prevButton = this.querySelector('button.prev');
    this.nextButton = this.querySelector('button.next');
    this.buttonContainer = this.querySelector('.flex.gap-4.text-current\\/70');

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
