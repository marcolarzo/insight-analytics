(() => {
  'use strict';
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  const submit = document.getElementById('contact-submit');
  const service = document.getElementById('ia-service');
  const preference = document.getElementById('ia-preference');
  const preferredTime = document.getElementById('ia-preferred-time');
  const meetingButton = document.querySelector('.ia-appointment');
  const originalButton = submit.innerHTML;
  let sending = false;
  const confirmation = document.getElementById('contact-confirmation');
  const dismiss = confirmation.querySelector('.ia-confirm-dismiss');
  const close = confirmation.querySelector('.ia-confirm-x');
  const closeConfirmation = () => confirmation.close();
  dismiss.addEventListener('click', closeConfirmation);
  close.addEventListener('click', closeConfirmation);
  confirmation.addEventListener('close', () => submit.focus({preventScroll:true}));

  function confirmSuccess() {
    if (typeof confirmation.showModal !== 'function') {
      showStatus('Mensaje enviado. Te responderé al correo que indicaste.', 'success');
      return;
    }
    status.hidden = true;
    confirmation.showModal();
    confirmation.scrollIntoView({block:'center', inline:'nearest', behavior:'auto'});
    dismiss.focus({preventScroll:true});
  }


  function syncMeeting() {
    const meeting = service.value === 'Coordinar una reunión';
    preference.hidden = !meeting;
    preferredTime.disabled = !meeting;
    preferredTime.required = meeting;
  }
  function showStatus(message, state) {
    status.hidden = false;
    status.dataset.state = state;
    status.textContent = message;
  }
  service.addEventListener('change', syncMeeting);
  meetingButton.addEventListener('click', () => {
    service.value = 'Coordinar una reunión';
    syncMeeting();
    preference.scrollIntoView({ block: 'center', behavior: 'auto' });
    preferredTime.focus({ preventScroll: true });
  });
  syncMeeting();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    const token = form.querySelector('[name="h-captcha-response"]');
    if (!token || !token.value.trim()) {
      showStatus('Completa la verificación de seguridad antes de enviar. Si no aparece, recarga la página o escribe a maramirez@eada.net.', 'error');
      return;
    }
    const payload = Object.fromEntries(new FormData(form));
    sending = true;
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    submit.textContent = 'Enviando…';
    showStatus('Estamos enviando tu consulta…', 'pending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
        credentials: 'omit'
      });
      let result;
      try { result = await response.json(); }
      catch { throw new Error('uncertain'); }
      if (!response.ok || result.success !== true) {
        showStatus('El servicio no confirmó el envío. Tus datos siguen aquí. Revisa la verificación e inténtalo nuevamente, o escribe a maramirez@eada.net.', 'error');
        return;
      }
      form.reset();
      syncMeeting();
      confirmSuccess();
    } catch {
      showStatus('No pudimos confirmar el envío por un problema de conexión. Conservamos tu mensaje. Antes de reenviarlo, considera que pudo haberse recibido. También puedes escribir a maramirez@eada.net.', 'error');
    } finally {
      clearTimeout(timeout);
      sending = false;
      submit.disabled = false;
      form.removeAttribute('aria-busy');
      submit.innerHTML = originalButton;
      if (window.hcaptcha && typeof window.hcaptcha.reset === 'function') window.hcaptcha.reset();
    }
  });
})();
