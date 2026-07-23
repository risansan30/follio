// ヘッダー: スクロール時に影をつける
const header = document.querySelector('.header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// モバイルナビゲーションの開閉（アクセシブルなbutton実装）
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  const closeNav = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };

  const openNav = () => {
    menuToggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeNav() : openNav();
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });
}

// ライトボックスモーダル
const modalTrigger = document.querySelector('.trigger');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');

if (modalTrigger && modal && modalClose) {
  const openModal = () => {
    modal.classList.add('is-open');
    modalClose.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modalTrigger.focus();
  };

  modalTrigger.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

// スクロールで要素をふわっと表示（上品なリビールアニメーション）
const revealTargets = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (revealTargets.length) {
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number(entry.target.dataset.stagger || 0);
            setTimeout(() => entry.target.classList.add('is-visible'), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -5% 0px' }
    );
    revealTargets.forEach((el) => observer.observe(el));
  }
}
