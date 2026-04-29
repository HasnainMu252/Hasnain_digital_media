document.addEventListener('DOMContentLoaded', () => {
  initCaseStudySlider();
});

function initCaseStudySlider() {
  const track = document.getElementById('caseStudyTrack');
  const cards = Array.from(document.querySelectorAll('.case-study-card'));
  const prevBtn = document.getElementById('projectsPrev');
  const nextBtn = document.getElementById('projectsNext');
  const dotsContainer = document.getElementById('sliderDots');
  const slider = document.querySelector('.case-study-slider');
  const modal = document.getElementById('caseModal');
  const modalOverlay = document.getElementById('caseModalOverlay');
  const modalClose = document.getElementById('caseModalClose');

  if (!track || !cards.length || !dotsContainer || !slider) return;

  let currentSlide = 0;
  let autoSlide = null;
  let touchStartX = 0;
  let touchEndX = 0;

  function createDots() {
    dotsContainer.innerHTML = '';
    cards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(index);
        restartAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateSliderHeight() {
    const activeCard = cards[currentSlide];
    if (!activeCard) return;
    const wrapper = track.parentElement;
    wrapper.style.minHeight = `${activeCard.offsetHeight}px`;
  }

  function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dotsContainer.querySelectorAll('.slider-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
    cards.forEach((card, index) => {
      const isActive = index === currentSlide;
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-hidden', String(!isActive));
      card.tabIndex = isActive ? 0 : -1;
    });
    requestAnimationFrame(updateSliderHeight);
  }

  function goToSlide(index) {
    currentSlide = (index + cards.length) % cards.length;
    updateSlider();
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = window.setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    if (autoSlide) {
      window.clearInterval(autoSlide);
      autoSlide = null;
    }
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); restartAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); restartAutoSlide(); });

  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
  slider.addEventListener('touchstart', event => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', event => {
    touchEndX = event.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      diff < 0 ? nextSlide() : prevSlide();
      restartAutoSlide();
    }
  }, { passive: true });

  window.addEventListener('resize', updateSliderHeight, { passive: true });
  window.addEventListener('load', updateSliderHeight, { passive: true });
  cards.forEach(card => { const img = card.querySelector('img'); if (img) { if (img.complete) updateSliderHeight(); else img.addEventListener('load', updateSliderHeight, { passive: true }); }});

  createDots();
  updateSlider();
  startAutoSlide();

  if (!modal || !modalOverlay || !modalClose) return;

  const modalImage = document.getElementById('modalImage');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalOverview = document.getElementById('modalOverview');
  const modalChallenge = document.getElementById('modalChallenge');
  const modalSolution = document.getElementById('modalSolution');
  const modalResults = document.getElementById('modalResults');
  const modalTech = document.getElementById('modalTech');
  const modalLive = document.getElementById('modalLive');
  const modalGithub = document.getElementById('modalGithub');

  function openCaseModal(card) {
    if (!card) return;
    if (modalImage) modalImage.src = card.dataset.image || '';
    if (modalTitle) modalTitle.textContent = card.dataset.title || '';
    if (modalCategory) modalCategory.textContent = card.dataset.category || '';
    if (modalOverview) modalOverview.textContent = card.dataset.overview || '';
    if (modalChallenge) modalChallenge.textContent = card.dataset.challenge || '';
    if (modalSolution) modalSolution.textContent = card.dataset.solution || '';
    if (modalResults) modalResults.textContent = card.dataset.results || '';
    if (modalLive) modalLive.href = card.dataset.live || '#contact';
    if (modalGithub) modalGithub.href = card.dataset.github || '#contact';

    if (modalTech) {
      modalTech.innerHTML = '';
      (card.dataset.tech || '').split(',').forEach(item => {
        const value = item.trim();
        if (!value) return;
        const span = document.createElement('span');
        span.textContent = value;
        modalTech.appendChild(span);
      });
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-case]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      openCaseModal(button.closest('.case-study-card'));
    });
  });

  modalClose.addEventListener('click', closeCaseModal);
  modalOverlay.addEventListener('click', closeCaseModal);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('show')) closeCaseModal();
  });
}
