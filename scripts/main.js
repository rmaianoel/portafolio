// Inicialización y pequeñas animaciones
document.addEventListener('DOMContentLoaded', () => {
  // AOS init (si está cargado)
  if (window.AOS) AOS.init({ once: true, duration: 700 });

  // GSAP hero entrance (si está cargado)
  if (window.gsap) {
    gsap.from('.hero-title', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 });
    gsap.from('.hero-photo', { scale: 0.98, opacity: 0, duration: 0.9, delay: 0.12 });
  }

  // IntersectionObserver para revelar elementos (sin depender sólo de AOS)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Toggle menú móvil
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  navToggle?.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Modal para certificados
  const modal = document.getElementById('modal');
  const modalImg = modal?.querySelector('.modal-img');
  const modalTitle = modal?.querySelector('.modal-title');
  const modalMeta = modal?.querySelector('.modal-meta');
  const modalDesc = modal?.querySelector('.modal-desc');
  const modalClose = modal?.querySelector('.modal-close');

  function openModalFromCard(card){
    if(!modal) return;
    const img = card.querySelector('img');
    const title = card.querySelector('.cert-body h3')?.textContent || '';
    const meta = card.querySelector('.cert-meta')?.textContent || '';
    const desc = card.querySelector('.cert-body p:last-of-type')?.textContent || '';
    if(img && modalImg) {
      modalImg.src = img.src;
      modalImg.alt = img.alt || title;
    }
    if(modalTitle) modalTitle.textContent = title;
    if(modalMeta) modalMeta.textContent = meta;
    if(modalDesc) modalDesc.textContent = desc;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    // trap focus could be added here if desired
  }

  function closeModal(){
    if(!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    // limpiar src para liberar memoria en algunos navegadores
    if(modalImg) modalImg.src = '';
  }

  // abrir modal al click en cada certificado
  document.querySelectorAll('.cert-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // evitar abrir si el usuario clickea un enlace interno
      const target = e.target;
      if(target.tagName === 'A' && target.href) return;
      openModalFromCard(card);
    });
  });

  // cerrar por backdrop, botón, ESC
  modal?.addEventListener('click', (e) => {
    if(e.target === modal || e.target.hasAttribute('data-modal-close')) closeModal();
  });
  modalClose?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModal();
  });
});
