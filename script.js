(() => {
  const form = document.getElementById('hiro-profile-form');
  const status = document.getElementById('form-status');

  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const endpoint = 'https://formsubmit.co/ajax/admin@moranhealth.com';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const honeypot = String(data.get('_honey') || '').trim();

    if (honeypot) {
      form.reset();
      status.textContent = 'Thanks. We’ve received your Hiro profile and will be in touch.';
      return;
    }

    const name = String(data.get('name') || '').trim();
    const organisation = String(data.get('organisation') || '').trim();
    const email = String(data.get('email') || '').trim();
    const website = String(data.get('website') || '').trim();
    const capabilities = String(data.get('capabilities') || '').trim();
    const sectors = String(data.get('sectors') || '').trim();
    const geography = String(data.get('geography') || '').trim();
    const contractValue = String(data.get('contractValue') || '').trim();
    const buyers = String(data.get('buyers') || '').trim();
    const exclusions = String(data.get('exclusions') || '').trim();

    const payload = {
      name,
      organisation,
      email,
      website: website || 'Not provided',
      capabilities,
      sectors: sectors || 'Not provided',
      geography: geography || 'Not provided',
      contractValue: contractValue || 'Not provided',
      buyers: buyers || 'Not provided',
      exclusions: exclusions || 'None provided',
      _replyto: email,
      _subject: `Hiro profile enquiry — ${organisation}`,
      _template: 'table',
      _captcha: 'false',
      _url: window.location.href
    };

    const originalButtonText = submitButton ? submitButton.textContent : '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
    }

    status.textContent = 'Sending your Hiro profile…';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Form delivery failed with status ${response.status}`);
      }

      form.reset();
      status.textContent = 'Thanks. We’ve received your Hiro profile and will be in touch.';
    } catch (error) {
      console.error('Hiro profile submission failed', error);
      status.textContent = 'We couldn’t send your profile. Please try again or contact admin@moranhealth.com.';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText || 'Submit my profile';
      }
    }
  });
})();
