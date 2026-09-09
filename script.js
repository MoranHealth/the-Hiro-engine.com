(() => {
  const form = document.getElementById('hiro-profile-form');
  const status = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
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

    const subject = `Hiro profile enquiry — ${organisation}`;
    const body = [
      'Hiro profile enquiry',
      '',
      `Name: ${name}`,
      `Organisation: ${organisation}`,
      `Work email: ${email}`,
      `Website: ${website || 'Not provided'}`,
      '',
      'What we sell / capabilities:',
      capabilities,
      '',
      `Sectors: ${sectors || 'Not provided'}`,
      `Geographic markets: ${geography || 'Not provided'}`,
      `Typical contract size: ${contractValue || 'Not provided'}`,
      `Buyers of interest: ${buyers || 'Not provided'}`,
      '',
      'Exclusions:',
      exclusions || 'None provided',
      '',
      'Please use these details to discuss and configure our Hiro profile.'
    ].join('\n');

    const mailto = `mailto:admin@moranhealth.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.textContent = 'Opening your email application with your Hiro profile details ready to send.';
    window.location.href = mailto;
  });
})();
