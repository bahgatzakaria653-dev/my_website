/**
 * BAHGAT ZAKARIA — DATA ENGINEERING PORTFOLIO
 * Contact & Inquiry Controller (contact.js)
 * Production-ready form validation, submission verification, and multi-channel delivery.
 */

(function () {
  'use strict';

  const RECIPIENT_EMAIL = "Bahgatzakaria653@gmail.com";
  const FORMSUBMIT_AJAX_ENDPOINT = "https://formsubmit.co/ajax/" + RECIPIENT_EMAIL;

  /**
   * Display toast notification
   */
  function showToast(message, duration = 5000, type = 'success') {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-notification';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    const iconSvg = type === 'error' 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    toast.className = `toast-notification ${type} show`;

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  /**
   * Real client-side email format validation
   * Rejects incomplete or malformed emails: 'g', 'abc', 'abc@', 'abc@gmail', 'test@domain'
   * Accepts properly formed emails: 'abc@gmail.com', 'name@example.com'
   */
  function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const trimmed = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(trimmed);
  }

  /**
   * Display accessible form-level alert box
   */
  function showFormAlert(type, message, mailtoLink = null) {
    const alertBox = document.getElementById('form-status-alert');
    if (!alertBox) return;

    let mailtoBtnHtml = '';
    if (mailtoLink) {
      mailtoBtnHtml = `
        <div style="margin-top: 0.75rem;">
          <a href="${mailtoLink}" class="btn btn-sm btn-outline" style="display: inline-flex; align-items: center; gap: 0.5rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>Open in Email Client</span>
          </a>
        </div>
      `;
    }

    alertBox.className = `form-status-alert form-alert-${type}`;
    alertBox.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 0.65rem;">
        <span style="flex-shrink: 0; margin-top: 2px;">
          ${type === 'success' ? '✓' : type === 'warning' ? '⚠' : '✕'}
        </span>
        <div>
          <div>${message}</div>
          ${mailtoBtnHtml}
        </div>
      </div>
    `;
    alertBox.style.display = 'block';
  }

  function clearFormAlert() {
    const alertBox = document.getElementById('form-status-alert');
    if (alertBox) {
      alertBox.style.display = 'none';
      alertBox.innerHTML = '';
    }
  }

  /**
   * Initialize Multi-Select Dropdown & Conditional Fields
   */
  function initMultiSelectDropdown() {
    const multiselectContainer = document.getElementById('service-multiselect');
    const toggleBtn = document.getElementById('service-select-toggle');
    const summarySpan = document.getElementById('multiselect-summary');
    const checkboxes = document.querySelectorAll('.multiselect-checkbox');
    const otherCheckbox = document.getElementById('service-option-other');
    const notSureCheckbox = document.getElementById('service-option-notsure');
    const customRequestGroup = document.getElementById('custom-request-group');
    const notSureGroup = document.getElementById('not-sure-group');
    const hiddenServicesInput = document.getElementById('form-selected-services');

    if (!multiselectContainer || !toggleBtn || !summarySpan) return;

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = multiselectContainer.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen.toString());
    });

    document.addEventListener('click', (e) => {
      if (!multiselectContainer.contains(e.target)) {
        multiselectContainer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && multiselectContainer.classList.contains('open')) {
        multiselectContainer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    });

    function updateSelections() {
      const selected = Array.from(checkboxes).filter(cb => cb.checked);
      
      if (selected.length === 0) {
        summarySpan.textContent = "Select one or more services...";
        summarySpan.classList.remove('has-selection');
        if (hiddenServicesInput) hiddenServicesInput.value = "None specified";
      } else if (selected.length === 1) {
        summarySpan.textContent = selected[0].value;
        summarySpan.classList.add('has-selection');
        if (hiddenServicesInput) hiddenServicesInput.value = selected[0].value;
      } else {
        summarySpan.textContent = `${selected.length} services selected`;
        summarySpan.classList.add('has-selection');
        if (hiddenServicesInput) hiddenServicesInput.value = selected.map(s => s.value).join(', ');
      }

      if (otherCheckbox && customRequestGroup) {
        if (otherCheckbox.checked) {
          customRequestGroup.style.display = 'block';
        } else {
          customRequestGroup.style.display = 'none';
          const input = customRequestGroup.querySelector('textarea, input');
          if (input) input.value = '';
        }
      }

      if (notSureCheckbox && notSureGroup) {
        if (notSureCheckbox.checked) {
          notSureGroup.style.display = 'block';
        } else {
          notSureGroup.style.display = 'none';
          const input = notSureGroup.querySelector('textarea, input');
          if (input) input.value = '';
        }
      }
    }

    checkboxes.forEach(cb => {
      cb.addEventListener('change', updateSelections);
    });
  }

  /**
   * Contact Form Handler with Genuine Delivery Verification
   */
  function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const replytoInput = document.getElementById('form-replyto');
    const nameErrorMsg = document.getElementById('name-error-msg');
    const emailErrorMsg = document.getElementById('email-error-msg');
    const messageErrorMsg = document.getElementById('message-error-msg');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Send Inquiry';

    if (nameInput && nameErrorMsg) {
      nameInput.addEventListener('input', () => {
        if (nameInput.value.trim()) {
          nameInput.classList.remove('input-error');
          nameErrorMsg.style.display = 'none';
        }
      });
    }

    if (emailInput && emailErrorMsg) {
      emailInput.addEventListener('input', () => {
        const val = emailInput.value.trim();
        if (isValidEmail(val)) {
          emailInput.classList.remove('input-error');
          emailErrorMsg.style.display = 'none';
        }
      });
    }

    if (messageInput && messageErrorMsg) {
      messageInput.addEventListener('input', () => {
        if (messageInput.value.trim()) {
          messageInput.classList.remove('input-error');
          messageErrorMsg.style.display = 'none';
        }
      });
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      clearFormAlert();

      let hasError = false;

      // 1. Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        if (nameInput) {
          nameInput.classList.add('input-error');
          nameInput.focus();
        }
        if (nameErrorMsg) nameErrorMsg.style.display = 'block';
        hasError = true;
      } else {
        if (nameInput) nameInput.classList.remove('input-error');
        if (nameErrorMsg) nameErrorMsg.style.display = 'none';
      }

      // 2. Validate Email (strict regex)
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal || !isValidEmail(emailVal)) {
        if (emailInput) {
          emailInput.classList.add('input-error');
          if (!hasError) emailInput.focus();
        }
        if (emailErrorMsg) emailErrorMsg.style.display = 'block';
        hasError = true;
      } else {
        if (emailInput) emailInput.classList.remove('input-error');
        if (emailErrorMsg) emailErrorMsg.style.display = 'none';
      }

      // 3. Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal) {
        if (messageInput) {
          messageInput.classList.add('input-error');
          if (!hasError) messageInput.focus();
        }
        if (messageErrorMsg) messageErrorMsg.style.display = 'block';
        hasError = true;
      } else {
        if (messageInput) messageInput.classList.remove('input-error');
        if (messageErrorMsg) messageErrorMsg.style.display = 'none';
      }

      if (hasError) return;

      if (replytoInput) replytoInput.value = emailVal;

      const selectedBoxes = Array.from(document.querySelectorAll('.multiselect-checkbox:checked'));
      const selectedServicesText = selectedBoxes.length > 0 
        ? selectedBoxes.map(cb => cb.value).join(', ') 
        : 'None specified';

      const payload = {
        name: nameVal,
        email: emailVal,
        _replyto: emailVal,
        _subject: "New Project Inquiry — Portfolio",
        _template: "table",
        _captcha: "false",
        selected_services: selectedServicesText,
        project_details: messageVal
      };

      const otherCheckbox = document.getElementById('service-option-other');
      if (otherCheckbox && otherCheckbox.checked) {
        const customReqInput = document.getElementById('contact-custom-request');
        if (customReqInput && customReqInput.value.trim()) {
          payload.custom_request = customReqInput.value.trim();
        }
      }

      const notSureCheckbox = document.getElementById('service-option-notsure');
      if (notSureCheckbox && notSureCheckbox.checked) {
        const notSureInput = document.getElementById('contact-not-sure-desc');
        if (notSureInput && notSureInput.value.trim()) {
          payload.situation_and_goals = notSureInput.value.trim();
        }
      }

      const mailtoSubject = encodeURIComponent("New Project Inquiry — Portfolio");
      const mailtoBody = encodeURIComponent(
        `Name/Company: ${nameVal}\nEmail: ${emailVal}\nService Interest: ${selectedServicesText}\n\nProject Details:\n${messageVal}`
      );
      const directMailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          <span>Sending Inquiry...</span>
        `;
      }

      const isNetlify = window.location.hostname.includes('netlify');

      try {
        if (isNetlify) {
          const formData = new FormData(form);
          const encoded = new URLSearchParams(formData).toString();
          const netlifyRes = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encoded
          });

          if (netlifyRes.ok) {
            handleSuccess(nameVal);
          } else {
            throw new Error(`Netlify status ${netlifyRes.status}`);
          }
        } else {
          const response = await fetch(FORMSUBMIT_AJAX_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(payload)
          });

          const resData = await response.json().catch(() => null);

          if (resData && (resData.success === "true" || resData.success === true)) {
            handleSuccess(nameVal);
          } else if (resData && resData.message && resData.message.toLowerCase().includes('activation')) {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnHtml;
            }
            showFormAlert(
              'warning',
              `Form activation required: FormSubmit has sent a one-time activation link to <strong>${RECIPIENT_EMAIL}</strong>. Please check your inbox and click 'Activate Form'. In the meantime, you can send directly:`,
              directMailtoUrl
            );
          } else {
            const errorMsg = (resData && resData.message) ? resData.message : 'Message delivery could not be confirmed.';
            handleFailure(errorMsg, directMailtoUrl);
          }
        }
      } catch (err) {
        handleFailure(err.message || 'Network connection issue', directMailtoUrl);
      }
    });

    function handleSuccess(clientName) {
      if (submitBtn) {
        submitBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Inquiry Sent!</span>
        `;
      }

      showToast(`Thank you, ${clientName}! Your inquiry has been sent successfully.`, 6000, 'success');
      showFormAlert('success', `Thank you, <strong>${clientName}</strong>! Your inquiry has been delivered to ${RECIPIENT_EMAIL}. I will review your requirements and respond promptly.`);

      setTimeout(() => {
        form.reset();
        const checkboxes = document.querySelectorAll('.multiselect-checkbox');
        checkboxes.forEach(cb => { cb.checked = false; });
        const summarySpan = document.getElementById('multiselect-summary');
        if (summarySpan) {
          summarySpan.textContent = "Select one or more services...";
          summarySpan.classList.remove('has-selection');
        }
        const customGroup = document.getElementById('custom-request-group');
        if (customGroup) customGroup.style.display = 'none';
        const notSureGroup = document.getElementById('not-sure-group');
        if (notSureGroup) notSureGroup.style.display = 'none';

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }, 4000);
    }

    function handleFailure(details, mailtoUrl) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
      showToast('Could not send message automatically. Please use direct email.', 6000, 'error');
      showFormAlert(
        'error',
        `Automated submission was not completed (${details}). Please send your inquiry directly via your email client to reach <strong>${RECIPIENT_EMAIL}</strong>:`,
        mailtoUrl
      );
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMultiSelectDropdown();
    initContactForm();
  });

  window.bzContact = {
    showToast: showToast,
    isValidEmail: isValidEmail
  };
})();
