document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.getElementById('sidebar');

  function toggleSidebar() {
    const isActive = sidebar.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    sidebar.setAttribute('aria-hidden', !isActive);
  }

  hamburger.addEventListener('click', toggleSidebar);

  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSidebar();
    }
  });
});
