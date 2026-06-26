const initHeader = () => {
  const navbar = document.querySelector('.navbar');
  const navCollapse = document.querySelector('.navbar-collapse');

  if (!navbar || !navCollapse) {
    return;
  }

  const setHeaderState = () => {
    const isMenuOpen = navCollapse.classList.contains('show');
    const isStaticHeader = document.body.dataset.disableScrollHeader === 'true';

    if (isStaticHeader || window.scrollY > 50 || isMenuOpen) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.remove('navbar-scrolled-out');
    } else {
      navbar.classList.remove('navbar-scrolled');
      navbar.classList.add('navbar-scrolled-out');
    }
  };

  window.addEventListener('scroll', setHeaderState);
  navCollapse.addEventListener('shown.bs.collapse', () => {
    navbar.classList.add('menu-open');
    setHeaderState();
  });
  navCollapse.addEventListener('hidden.bs.collapse', () => {
    navbar.classList.remove('menu-open');
    setHeaderState();
  });

  setHeaderState();
};

const loadNav = async () => {
  const placeholder = document.getElementById('nav-placeholder');

  if (!placeholder) {
    return;
  }

  const response = await fetch('nav.html');
  placeholder.innerHTML = await response.text();
  initHeader();
};

window.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init();
  }

  loadNav();
});
