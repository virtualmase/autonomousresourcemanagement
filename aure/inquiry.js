(() => {
  const form = document.querySelector('#aure-review-form');
  if (!form) return;

  const status = document.querySelector('#aure-form-status');
  const endpoint = 'https://swellmarketing.xyz/api/leads';
  const siteKey = '0x4AAAAAAEV9MAzjfRLjvQj5';
  form.elements.formStartedAt.value = String(Date.now());

  const script = document.createElement('script');
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
  script.async = true;
  script.defer = true;
  script.onload = () => window.turnstile?.ready(() => {
    window.turnstile.render('#aure-turnstile', {
      sitekey: siteKey,
      callback: token => { form.elements.turnstileToken.value = token; },
      'expired-callback': () => { form.elements.turnstileToken.value = ''; },
      'error-callback': () => { form.elements.turnstileToken.value = ''; }
    });
  });
  document.head.appendChild(script);

  form.addEventListener('submit', async event => {
    event.preventDefault();
    status.dataset.state = '';
    status.textContent = '';
    form.querySelectorAll('[data-error-for]').forEach(node => { node.textContent = ''; });
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Sending…';

    const payload = Object.fromEntries(new FormData(form));
    Object.assign(payload, {
      responseConsent: form.elements.responseConsent.checked,
      marketingConsent: false,
      firstConstraint: 'evidence',
      sourcePage: location.pathname + location.search,
      referrer: document.referrer,
      utmSource: 'aure',
      utmMedium: 'website',
      utmCampaign: 'aure_claim_architecture_review',
      utmContent: 'canonical_definition',
      latestSourcePage: location.pathname + location.search,
      latestReferrer: document.referrer,
      latestUtmSource: 'aure',
      latestUtmMedium: 'website',
      latestUtmCampaign: 'aure_claim_architecture_review',
      latestUtmContent: 'canonical_definition'
    });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      let result = {};
      try { result = await response.json(); } catch {}
      if (!response.ok) {
        for (const [field, message] of Object.entries(result.fieldErrors || {})) {
          const node = form.querySelector(`[data-error-for="${field}"]`);
          if (node) node.textContent = message;
        }
        const message = result.code === 'validation_failed'
          ? 'Check the highlighted fields.'
          : result.code === 'challenge_failed'
            ? 'Complete the security check and try again.'
            : 'The request could not be saved. Please try again later.';
        throw new Error(message);
      }
      form.reset();
      form.elements.formStartedAt.value = String(Date.now());
      form.elements.turnstileToken.value = '';
      window.turnstile?.reset('#aure-turnstile');
      status.dataset.state = 'success';
      status.textContent = 'Received. The request is in the review queue.';
    } catch (error) {
      status.dataset.state = 'error';
      status.textContent = error.message || 'The request could not be saved. Please try again later.';
    } finally {
      button.disabled = false;
      button.textContent = 'Send bounded request ↗';
      status.focus();
    }
  });
})();
