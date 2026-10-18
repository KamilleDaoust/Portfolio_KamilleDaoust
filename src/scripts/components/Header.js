export default class Header {
  constructor(element) {
    this.element = element;
    this.options = {
      threshold: 0.2,
      alwaysShow: false,
    };
    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;

    this.init();
    this.initNavMobile();
  }

  init() {
    this.setOptions();

    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  setOptions() {
    //Threshold
    if ('threshold' in this.element.dataset) {
      this.options.threshold =
        parseFloat(this.element.dataset.threshold) || this.options.threshold;
      console.log(this.options.threshold);
    } else {
      console.warn('Pas de data-threshold');
    }

    //Always show header
    if ('alwaysShow' in this.element.dataset) {
      this.options.alwaysShow = true;
      console.log(this.options.alwaysShow);
    } else {
      console.warn('Pas de data-always-show');
    }
  }

  onScroll() {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;

    this.setHeaderState();
    this.setDirections();
  }

  setHeaderState() {
    if (
      this.scrollPosition >=
        document.scrollingElement.scrollHeight * this.options.threshold &&
      !this.options.alwaysShow
    ) {
      this.html.classList.add('header-is-hidden');
    } else {
      this.html.classList.remove('header-is-hidden');
    }
  }

  setDirections() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      // Scroll vers le bas;
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      // Scroll vers le haut;
      this.html.classList.add('is-scrolling-up');
      this.html.classList.remove('is-scrolling-down');
    }
  }

  initNavMobile() {
    console.log('hey');
    const toggle = this.element.querySelector('.js-toggle');
    toggle.addEventListener('click', this.onToggleNav.bind(this));
    
      const liens = this.element.querySelectorAll('a[href^="#"]');

    liens.forEach((lien) => {
    lien.addEventListener('click', () => {
    this.html.classList.remove('nav-is-active');
    });
    });

  }

  onToggleNav() {
    console.log('heyy');
    this.html.classList.toggle('nav-is-active');
  }
}
