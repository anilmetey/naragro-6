/* Created by Anıl Mete */
/**
* Template Name: UpConstruction - v1.3.0
* Template URL: https://bootstrapmade.com/upconstruction-bootstrap-construction-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader / Splash Screen
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const minDisplayTime = 800;
    const startTime = performance.now();
    let splashDismissed = false;

    const hideSplash = () => {
      if (splashDismissed) return;
      splashDismissed = true;
      const elapsed = performance.now() - startTime;
      const delay = Math.max(0, minDisplayTime - elapsed);
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.remove();
        }, 650);
      }, delay);
    };

    if (document.readyState === 'complete') {
      hideSplash();
    } else {
      window.addEventListener('load', hideSplash);
      setTimeout(hideSplash, 2500);
    }
  }

  /**
   * Mobile navigation: one accessible toggle, full-height drawer and focus loop.
   */
  const navbar = document.querySelector('#navbar');
  const menuToggle = document.querySelector('.mobile-nav-toggle');
  const mobileViewport = window.matchMedia('(max-width: 1279px)');
  const navigationLinks = Array.from(document.querySelectorAll('#navbar a[href^="#"]'));

  function setMobileNav(open, restoreFocus = false) {
    const isOpen = open && mobileViewport.matches;
    document.body.classList.toggle('mobile-nav-active', isOpen);
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      if (restoreFocus) menuToggle.focus();
    }
  }

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      setMobileNav(!document.body.classList.contains('mobile-nav-active'));
    });
    navbar.addEventListener('click', event => {
      // The drawer backdrop is the navbar's pseudo-element.
      if (event.target === navbar) setMobileNav(false, true);
    });
    document.addEventListener('keydown', event => {
      if (!document.body.classList.contains('mobile-nav-active')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileNav(false, true);
      } else if (event.key === 'Tab') {
        const lastLink = navigationLinks[navigationLinks.length - 1];
        if (event.shiftKey && document.activeElement === menuToggle && lastLink) {
          event.preventDefault();
          lastLink.focus();
        } else if (!event.shiftKey && document.activeElement === lastLink) {
          event.preventDefault();
          menuToggle.focus();
        }
      }
    });
    mobileViewport.addEventListener('change', () => setMobileNav(false));
  }

  const navigationSections = navigationLinks.map(link => ({
    link,
    section: document.getElementById(link.hash.slice(1))
  })).filter(item => item.section);

  navigationSections.forEach(({ link, section }) => {
    link.addEventListener('click', () => {
      const wasOpen = document.body.classList.contains('mobile-nav-active');
      setMobileNav(false);
      if (wasOpen) {
        section.setAttribute('tabindex', '-1');
        section.focus({ preventScroll: true });
      }
    });
  });

  function updateActiveNavigation() {
    const header = document.getElementById('header');
    const position = window.scrollY + (header ? header.offsetHeight : 0) + 40;
    let current = navigationSections[0];
    navigationSections.forEach(item => {
      if (window.scrollY + item.section.getBoundingClientRect().top <= position) current = item;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      current = navigationSections[navigationSections.length - 1];
    }
    navigationSections.forEach(item => {
      const active = item === current;
      item.link.classList.toggle('active', active);
      if (active) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    });
  }

  let navigationFramePending = false;
  window.addEventListener('scroll', () => {
    if (navigationFramePending) return;
    navigationFramePending = true;
    requestAnimationFrame(() => {
      updateActiveNavigation();
      navigationFramePending = false;
    });
  }, { passive: true });
  window.addEventListener('resize', updateActiveNavigation);
  window.addEventListener('load', updateActiveNavigation);
  updateActiveNavigation();

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = (typeof GLightbox !== 'undefined') ? GLightbox({
    selector: '.glightbox'
  }) : null;

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope && typeof Isotope !== 'undefined') {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.slides-1', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });

    /**
     * Init swiper slider with 2 slides at once in desktop view
     */
    new Swiper('.slides-2', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },

        1200: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }
    });
  }

  /**
   * Initiate pURE cOUNTER
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'slide',
        once: true,
        mirror: false
      });
    }
  }

  // Initialize AOS immediately on DOM ready
  aos_init();

  // Also refresh AOS on window load and shortly after to ensure elements are visible
  window.addEventListener('load', () => {
    aos_init();
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  });

  setTimeout(() => {
    if (typeof AOS !== 'undefined') AOS.refresh();
  }, 350);
  setTimeout(() => {
    if (typeof AOS !== 'undefined') AOS.refresh();
  }, 1000);
  /**
   * What We Do Interactive
   */
  const nodeCards = document.querySelectorAll('.node-card');
  const flowGroups = document.querySelectorAll('.flow-group');
  const bannerText = document.getElementById('bannerText');
  const hubCenter = document.getElementById('hub-naragro');

  const nodeInfoMap = {
    'farmers': {
      title: 'Farmers',
      icon: '🌾',
      desc: 'Sourcing and contracting sustainable raw oilseeds, grains and agricultural commodities directly from grower networks & cooperatives.'
    },
    'crushers': {
      title: 'Crushers',
      icon: '⚙️',
      desc: 'Supplying oilseed feedstock and brokering crude vegetable oils and protein meals with optimal processing economics.'
    },
    'traders': {
      title: 'Traders',
      icon: '🌐',
      desc: 'Providing cross-border market arbitrage, liquidity, freight risk management, and competitive commodity transactions.'
    },
    'refineries': {
      title: 'Refineries',
      icon: '🏭',
      desc: 'Supplying crude vegetable oils and marketing refined, bleached & deodorized (RBD) oils and specialized vegetable fats.'
    },
    'consumers': {
      title: 'Consumers',
      icon: '👥',
      desc: 'Connecting verified, reliable commodity supplies to food manufacturers, oleochemicals, feed producers, and retail markets.'
    },
    'hub': {
      title: 'Naragro',
      icon: '🔴',
      desc: 'Agricultural commodities brokerage and consultancy firm specialized in vegetable oils and fats, bringing trust and risk management across global markets.'
    }
  };

  const defaultBannerHTML = 'Hover or tap on any market participant to explore Naragro\'s integrated agricultural supply network.';

  function activateNode(nodeId) {
    flowGroups.forEach(flow => {
      if (flow.id === `flow-${nodeId}`) {
        flow.classList.add('is-active');
        flow.classList.remove('is-dimmed');
      } else {
        flow.classList.remove('is-active');
        flow.classList.add('is-dimmed');
      }
    });

    const info = nodeInfoMap[nodeId];
    if (info && bannerText) {
      bannerText.innerHTML = `<strong>${info.icon} ${info.title}:</strong> ${info.desc}`;
    }
  }

  function resetNodes() {
    flowGroups.forEach(flow => {
      flow.classList.remove('is-active');
      flow.classList.remove('is-dimmed');
    });
    if (bannerText) {
      bannerText.innerHTML = defaultBannerHTML;
    }
  }

  nodeCards.forEach(card => {
    const nodeKey = card.getAttribute('data-node');
    card.addEventListener('mouseenter', () => activateNode(nodeKey));
    card.addEventListener('mouseleave', resetNodes);
    card.addEventListener('click', () => activateNode(nodeKey));
  });

  if (hubCenter) {
    hubCenter.addEventListener('mouseenter', () => {
      flowGroups.forEach(f => {
        f.classList.add('is-active');
        f.classList.remove('is-dimmed');
      });
      if (bannerText) {
        bannerText.innerHTML = `<strong>${nodeInfoMap.hub.icon} ${nodeInfoMap.hub.title}:</strong> ${nodeInfoMap.hub.desc}`;
      }
    });
    hubCenter.addEventListener('mouseleave', resetNodes);
  }

  // Final AOS safety initialization
  if (typeof aos_init === 'function') {
    aos_init();
  }

});