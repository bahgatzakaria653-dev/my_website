/**
 * BAHGAT ZAKARIA — DATA ENGINEERING PORTFOLIO
 * Main Controller (main.js)
 * Coordinates UI navigation, project filtering, interactive case study modals,
 * and high-resolution image lightbox viewer.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. Mobile Navigation Setup
  // ------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    const isOpen = mobileNavDrawer.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
  }

  function closeMobileMenu() {
    if (mobileNavDrawer) {
      mobileNavDrawer.classList.remove('open');
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // ------------------------------------------------------------------------
  // 2. Active Navigation ScrollSpy (All 8 Portfolio Sections)
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileDrawerLinks = document.querySelectorAll('.mobile-nav-drawer .mobile-nav-link');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 130;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        // Desktop nav update
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });

        // Mobile drawer update
        mobileDrawerLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // ------------------------------------------------------------------------
  // 3. Project Filter Tabs
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'grid';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 4. Image Lightbox / Zoom Controller
  // ------------------------------------------------------------------------
  const lightboxModal = document.getElementById('image-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  let activeTriggerElement = null;

  function openLightbox(imgSrc, imgAlt, captionText) {
    if (!lightboxModal || !lightboxImg) return;

    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt || 'Enlarged project visual';
    if (lightboxCaption) {
      lightboxCaption.textContent = captionText || imgAlt || '';
    }

    lightboxModal.style.display = 'flex';
    // Force reflow for smooth CSS transition
    void lightboxModal.offsetWidth;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (lightboxCloseBtn) {
      lightboxCloseBtn.focus();
    }
  }

  function closeLightbox() {
    if (!lightboxModal) return;

    lightboxModal.classList.remove('active');
    setTimeout(() => {
      lightboxModal.style.display = 'none';
      if (lightboxImg) lightboxImg.src = '';
      document.body.style.overflow = '';
      if (activeTriggerElement && typeof activeTriggerElement.focus === 'function') {
        activeTriggerElement.focus();
      }
    }, 250);
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  // Attach lightbox zoom trigger to all project main images & zoom buttons
  function initLightboxTriggers() {
    // Project main preview images
    const projectImages = document.querySelectorAll('.project-main-image-slot img, [data-lightbox]');
    projectImages.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.setAttribute('title', 'Click to enlarge diagram');
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        activeTriggerElement = img;
        const src = img.getAttribute('data-lightbox-src') || img.getAttribute('src');
        const alt = img.getAttribute('alt') || 'Project Diagram';
        const caption = img.getAttribute('data-lightbox-caption') || alt;
        openLightbox(src, alt, caption);
      });
    });
  }

  initLightboxTriggers();

  // ------------------------------------------------------------------------
  // 5. Case Study Modal Engine
  // ------------------------------------------------------------------------
  const modalOverlay = document.getElementById('case-study-modal');
  const modalBody = document.getElementById('modal-case-study-content');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalNextBtn = document.getElementById('modal-next-project-btn');
  const modalGithubBtn = document.getElementById('modal-github-btn');

  let currentProjectIndex = 0;

  function renderCaseStudy(project) {
    if (!project) return;

    modalTitle.textContent = project.title;

    if (project.githubAvailable && project.githubUrl) {
      modalGithubBtn.href = project.githubUrl;
      modalGithubBtn.style.display = 'inline-flex';
    } else {
      modalGithubBtn.style.display = 'none';
    }

    const cs = project.caseStudy;
    
    const workflowHtml = cs.workflow ? `
      <div class="case-study-section">
        <h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          Architecture &amp; Workflow
        </h3>
        <div class="workflow-pipeline">
          ${cs.workflow.map((item, idx) => `
            <div class="workflow-step">
              <span>${item.step}</span>
            </div>
            ${idx < cs.workflow.length - 1 ? '<span class="workflow-arrow">→</span>' : ''}
          `).join('')}
        </div>
        <ul>
          ${cs.workflow.map(item => `<li><strong>${item.step}:</strong> ${item.desc}</li>`).join('')}
        </ul>
      </div>
    ` : '';

    const dqRulesHtml = cs.dataQualityRules ? `
      <div class="case-study-section">
        <h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Data Quality &amp; Validation Rules
        </h3>
        <ul>
          ${cs.dataQualityRules.map(rule => `<li>${rule}</li>`).join('')}
        </ul>
      </div>
    ` : '';

    const challengesHtml = cs.challenges ? `
      <div class="case-study-section">
        <h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          Key Technical Challenges
        </h3>
        <ul>
          ${cs.challenges.map(ch => `<li>${ch}</li>`).join('')}
        </ul>
      </div>
    ` : '';

    const imageSlotsHtml = project.imageSlots ? `
      <div class="case-study-section">
        <h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          Project Screenshots &amp; Architecture Diagrams
        </h3>
        <div class="case-study-images-grid">
          ${project.imageSlots.map(slot => `
            <div class="case-study-image-box">
              <div class="case-study-image-slot" style="cursor: zoom-in;" onclick="window.bzOpenLightbox('${slot.placeholderPath}', '${slot.title}', '${slot.description}')">
                <img src="${slot.placeholderPath}" alt="${slot.title}" onerror="this.style.display='none'">
              </div>
              <div class="case-study-image-label">${slot.title}</div>
              <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.25rem;">${slot.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    const techTagsHtml = project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join(' ');

    modalBody.innerHTML = `
      <div class="case-study-section">
        <h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          Project Overview
        </h3>
        <p>${cs.overview}</p>
        <div class="mt-4">
          <strong>Technologies:</strong>
          <div class="project-tech-stack mt-2">
            ${techTagsHtml}
          </div>
        </div>
      </div>

      <div class="case-study-section">
        <h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Problem Statement
        </h3>
        <p>${cs.problem}</p>
      </div>

      ${challengesHtml}

      <div class="case-study-section">
        <h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 11 12 14 22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
          Engineering Approach &amp; Solution
        </h3>
        <p>${cs.approach}</p>
      </div>

      ${workflowHtml}

      ${dqRulesHtml}

      ${imageSlotsHtml}

      <div class="case-study-section">
        <h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Project Outcome
        </h3>
        <p>${cs.results}</p>
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end;">
          <a href="case-studies/${project.id}.html" class="btn btn-outline btn-sm" target="_blank" rel="noopener">
            View Full Dedicated Case Study Page ↗
          </a>
        </div>
      </div>
    `;

    modalBody.scrollTop = 0;
  }

  function openModal(projectId) {
    const index = PROJECTS_DATA.findIndex(p => p.id === projectId);
    if (index !== -1) {
      currentProjectIndex = index;
      renderCaseStudy(PROJECTS_DATA[currentProjectIndex]);
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function nextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % PROJECTS_DATA.length;
    renderCaseStudy(PROJECTS_DATA[currentProjectIndex]);
  }

  const viewProjectBtns = document.querySelectorAll('.js-view-project');
  viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalNextBtn) modalNextBtn.addEventListener('click', nextProject);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Global Keyboard Accessibility: ESC closes modals and lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        closeLightbox();
        return;
      }
      if (modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
        return;
      }
      closeMobileMenu();
    }
  });

  // Global helper for lightbox
  window.bzOpenLightbox = openLightbox;
  window.bzCloseLightbox = closeLightbox;
});
