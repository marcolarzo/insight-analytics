(() => {
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('#primary-navigation');
  if(toggle&&nav){const close=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');};toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';nav.classList.toggle('is-open',!open);toggle.setAttribute('aria-expanded',String(!open));});nav.addEventListener('click',event=>{if(event.target.closest('a'))close();});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){close();toggle.focus();}});}
  document.querySelectorAll('[data-load-video]').forEach(button=>button.addEventListener('click',()=>{const shell=button.closest('.video-shell');if(shell.querySelector('iframe'))return;const frame=document.createElement('iframe');frame.src='https://drive.google.com/file/d/1SeKEK8Aq2y3nXBR09cvFx2NW5mN5idof/preview';frame.title='Vídeo de presentación de Insight Analytics';frame.allow='fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';shell.append(frame);button.hidden=true;}));
})();
